'use strict';

var mongoose = require('mongoose'),
    Schema = mongoose.Schema;

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
  }
});

module.exports = mongoose.model('Question', QuestionSchema);