'use strict';

var mongoose = require('bluebird').promisifyAll(require('mongoose'));
var Schema = mongoose.Schema;

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

module.exports = mongoose.model('Question', QuestionSchema);
