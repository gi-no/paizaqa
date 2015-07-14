'use strict';

var _ = require('lodash');
var Question = require('./question.model');

// Get list of questions
exports.index = function(req, res) {
  Question.find().sort({createdAt: -1}).limit(20).exec(function (err, questions) {
    if(err) { return handleError(res, err); }
    return res.json(200, questions);
  });
};

// Get a single question
exports.show = function(req, res) {
  Question.findById(req.params.id, function (err, question) {
    if(err) { return handleError(res, err); }
    if(!question) { return res.send(404); }
    return res.json(question);
  });
};

// Creates a new question in the DB.
exports.create = function(req, res) {
  Question.create(req.body, function(err, question) {
    if(err) { return handleError(res, err); }
    return res.json(201, question);
  });
};

// Updates an existing question in the DB.
exports.update = function(req, res) {
  if(req.body._id) { delete req.body._id; }
  Question.findById(req.params.id, function (err, question) {
    if (err) { return handleError(res, err); }
    if(!question) { return res.send(404); }
    var updated = _.merge(question, req.body);
    updated.save(function (err) {
      if (err) { return handleError(res, err); }
      return res.json(200, question);
    });
  });
};

// Deletes a question from the DB.
exports.destroy = function(req, res) {
  Question.findById(req.params.id, function (err, question) {
    if(err) { return handleError(res, err); }
    if(!question) { return res.send(404); }
    question.remove(function(err) {
      if(err) { return handleError(res, err); }
      return res.send(204);
    });
  });
};

exports.createAnswer = function(req, res) {
  Question.update({_id: req.params.id}, {$push: {answers: {content: req.body.content}}}, function(err, question) {
    if(err) { return handleError(res, err); }
    exports.show(req, res);
  });
};

exports.createComment = function(req, res) {
  console.log("req.body", req.body);
  Question.update({_id: req.params.id}, {$push: {comments: {content: req.body.content}}}, function(err, question){
    if(err) {return handleError(res, err); }
    exports.show(req, res);
  })
}

exports.createAnswerComment = function(req, res) {
  console.log("req.body=", req.body);
  console.log("req.params=", req.params);
  Question.update({_id: req.params.id, 'answers._id': req.params.answerId}, {$push: {'answers.$.comments': {content: req.body.content}}}, function(err, question){
    if(err) {return handleError(res, err); }
    exports.show(req, res);
  })
}

function handleError(res, err) {
  return res.send(500, err);
}