'use strict';

var mongoose = require('bluebird').promisifyAll(require('mongoose'));

var QuestionSchema = new mongoose.Schema({
  title: String,
  content: String,
  answers: [{
    content: String,
    user: {
      type: mongoose.Schema.ObjectId,
      ref: 'User'
    },
    createdAt: {
      type: Date,
      default: Date.now,
    },
    comments: [{
      content: String,
      stars: [{
        type: mongoose.Schema.ObjectId,
        ref: 'User'
      }],
      user: {
        type: mongoose.Schema.ObjectId,
        ref: 'User'
      },
      createdAt: {
        type: Date,
        default: Date.now,
      }
    }],
    stars: [{
      type: mongoose.Schema.ObjectId,
      ref: 'User'
    }],
  }],
  tags: [{
    text: String,
  }],
  user: {
    type: mongoose.Schema.ObjectId,
    ref: 'User'
  },
  createdAt: {
    type: Date,
    default: Date.now
  },
  comments: [{
    content: String,
    stars: [{
      type: mongoose.Schema.ObjectId,
      ref: 'User'
    }],
    user: {
      type: mongoose.Schema.ObjectId,
      ref: 'User'
    },
    createdAt: {
      type: Date,
      default: Date.now,
    }
  }],
  stars: [{
    type: mongoose.Schema.ObjectId,
    ref: 'User'
  }],
  searchText: String,
});
QuestionSchema.pre('find', function(next){
  this.populate('user', 'name');
  this.populate('comments.user', 'name');
  this.populate('answers.user', 'name');
  this.populate('answers.comments.user', 'name');
  next();
});
QuestionSchema.pre('findOne', function(next){
  this.populate('user', 'name');
  this.populate('comments.user', 'name');
  this.populate('answers.user', 'name');
  this.populate('answers.comments.user', 'name');
  next();
});

QuestionSchema.index({
  'title': 'text',
  'content': 'text',
  'tags.text': 'text',
  'answers.content': 'text',
  'comments.content': 'text',
  'answers.comments.content': 'text',
  'searchText': 'text',
}, {name: 'question_schema_index'});

var TinySegmenter = require('tiny-segmenter');

var getSearchText = function(question){
  var tinySegmenter = new TinySegmenter();
  var searchText = "";
  searchText += tinySegmenter.segment(question.title).join(' ') + " ";
  searchText += tinySegmenter.segment(question.content).join(' ') + " ";
  question.answers.forEach(function(answer){
    searchText += tinySegmenter.segment(answer.content).join(' ') + " ";
    answer.comments.forEach(function(comment){
      searchText += tinySegmenter.segment(comment.content).join(' ') + " ";
    });
  });
  question.comments.forEach(function(comment){
    searchText += tinySegmenter.segment(comment.content).join(' ') + " ";
  });
  console.log("searchText", searchText);
  return searchText;
};
QuestionSchema.statics.updateSearchText = function(id, cb){
  this.findOne({_id: id}).exec(function(err, question){
    if(err){ if(cb){cb(err);} return; }
    var searchText = getSearchText(question);
    this.update({_id: id}, {searchText: searchText}, function(err, num){
      if(cb){cb(err);}
    });
  }.bind(this));
};

QuestionSchema.pre('save', function(next){
  this.searchText = getSearchText(this);
  next();
});

export default mongoose.model('Question', QuestionSchema);
