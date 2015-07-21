'use strict';

var mongoose = require('mongoose'),
    Schema = mongoose.Schema;
var TinySegmenter = require('tiny-segmenter');

var QuestionSchema = new Schema({
  title: String,
  content: String,
  answers: [{
    content: String,
    comments: [{
      content: String,
      stars: [{
        type: Schema.ObjectId,
        ref: 'User'
      }],
      user: {
        type: Schema.ObjectId,
        ref: 'User'
      },
      createdAt: {
        type: Date,
        default: Date.now,
      }
    }],
    stars: [{
      type: Schema.ObjectId,
      ref: 'User'
    }],
    user: {
      type: Schema.ObjectId,
      ref: 'User'
    },
    createdAt: {
      type: Date,
      default: Date.now,
    },
  }],
  tags: [{
    text: String,
    createdAt: {
      type: Date,
      default: Date.now,
    }
  }],
  comments: [{
    content: String,
    stars: [{
      type: Schema.ObjectId,
      ref: 'User'
    }],
    user: {
      type: Schema.ObjectId,
      ref: 'User'
    },
    createdAt: {
      type: Date,
      default: Date.now,
    }
  }],
  stars: [{
    type: Schema.ObjectId,
    ref: 'User'
  }],
  user: {
    type: Schema.ObjectId,
    ref: 'User'
  },
  createdAt: {
    type: Date,
    default: Date.now
  },
  searchText: String,
});

/*
We need to specify name explicitly for long schema.
http://docs.mongodb.org/manual/reference/limits/#Index-Name-Length
====================================================================
- MongoDB Limits and Thresholds
  - Index Name Length
Fully qualified index names, which includes the namespace and the
dot separators (i.e. <database name>.<collection name>.$<index name>), 
cannot be longer than 128 characters.

By default, <index name> is the concatenation of the field names and 
index type. You can explicitly specify the <index name> to the createIndex() 
method to ensure that the fully qualified index name does not exceed the limit.
====================================================================
*/
QuestionSchema.index({
  'title': 'text',
  'content': 'text',
  'tags.text': 'text',
  'answers.content': 'text',
  'comments.content': 'text',
  'answers.comments.content': 'text',
  'searchText': 'text',
}, {name: 'question_schema_index'});

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
    if(err){ cb && cb(err); return; }
    var searchText = getSearchText(question);
    this.update({_id: id}, {searchText: searchText}, function(err, num){
      cb && cb(err);
    });
  }.bind(this));
};

QuestionSchema.pre('save', function(next){
  this.searchText = getSearchText(this);
  next();
});

module.exports = mongoose.model('Question', QuestionSchema);