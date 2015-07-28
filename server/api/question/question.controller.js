'use strict';

var _ = require('lodash');
var Question = require('./question.model');

// Get list of questions
exports.index = function(req, res) {
  var query = req.query.query && JSON.parse(req.query.query);
  Question.find(query).sort({createdAt: -1}).limit(20).populate('user', 'name').populate('comments.user', 'name').exec(function (err, questions) {
    if(err) { return handleError(res, err); }
    return res.json(200, questions);
  });
};

// Get a single question
exports.show = function(req, res) {
  Question.findById(req.params.id).populate('user', 'name').populate('comments.user', 'name').populate('answers.user', 'name').populate('answers.comments.user', 'name').exec(function (err, question) {
    console.log('question', question);
    if(err) { return handleError(res, err); }
    if(!question) { return res.send(404); }
    return res.json(question);
  });
};

// Creates a new question in the DB.
exports.create = function(req, res) {
  req.body.user = req.user;
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
    if(question.user.toString() !== req.user._id.toString()){ return res.send(403); }
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
    if(question.user.toString() !== req.user._id.toString()){ return res.send(403); }
    question.remove(function(err) {
      if(err) { return handleError(res, err); }
      return res.send(204);
    });
  });
};
exports.star = function(req, res) {
  Question.update({_id: req.params.id}, {$push: {stars: req.user.id}}, function(err, num){
    if(err) { return handleError(res, err); }
    if(num === 0) { return res.send(404); }
    exports.show(req, res);
  });
}
exports.unstar = function(req, res) {
  Question.update({_id: req.params.id}, {$pull: {stars: req.user.id}}, function(err, num){
    if(err) { return handleError(res, err); }
    if(num === 0) { return res.send(404); }
    exports.show(req, res);
  });
}

exports.createAnswer = function(req, res) {
  req.body.user = req.user.id;
  console.log("createAnswer:req.body=", req.body);
  Question.update({_id: req.params.id}, {$push: {answers: req.body}}, function(err, num) {
    if(err) { return handleError(res, err); }
    if(num === 0) { return res.send(404); }
    exports.show(req, res);
    Question.updateSearchText(req.params.id);
  });
};
exports.updateAnswer = function(req, res) {
  Question.update({_id: req.params.id, 'answers._id': req.params.answerId}, {'answers.$.content': req.body.content, 'answers.$.user': req.user.id}, function(err, num){
    if(err) { return handleError(res, err); }
    if(num === 0) { return res.send(404); }
    exports.show(req, res);
  });
};
exports.destroyAnswer = function(req, res) {
  Question.update({_id: req.params.id}, {$pull: {answers: {_id: req.params.answerId , 'user': req.user._id}}}, function(err, num) {
    if(err) { return handleError(res, err); }
    if(num === 0) { return res.send(404); }
    exports.show(req, res);
    Question.updateSearchText(req.params.id);
  });
};
exports.starAnswer = function(req, res) {
  Question.update({_id: req.params.id, 'answers._id': req.params.answerId}, {$push: {'answers.$.stars': req.user.id}}, function(err, num){
    if(err) { return handleError(res, err); }
    if(num === 0) { return res.send(404); }
    exports.show(req, res);
  });
};
exports.unstarAnswer = function(req, res) {
  Question.update({_id: req.params.id, 'answers._id': req.params.answerId}, {$pull: {'answers.$.stars': req.user.id}}, function(err, num){
    if(err) { return handleError(res, err); }
    if(num === 0) { return res.send(404); }
    exports.show(req, res);
  });
};

/*
  Comments
*/
exports.createComment = function(req, res) {
  req.body.user = req.user.id;
  Question.update({_id: req.params.id}, {$push: {comments: req.body}}, function(err, num){
    if(err) {return handleError(res, err); }
    if(num === 0) { return res.send(404); }
    exports.show(req, res);
    Question.updateSearchText(req.params.id);
  })
};
exports.destroyComment = function(req, res) {
  Question.update({_id: req.params.id}, {$pull: {comments: {_id: req.params.commentId , 'user': req.user._id}}}, function(err, num) {
    if(err) { return handleError(res, err); }
    if(num === 0) { return res.send(404); }
    exports.show(req, res);
    Question.updateSearchText(req.params.id);
  });
};
exports.updateComment = function(req, res) {
  Question.update({_id: req.params.id, 'comments._id': req.params.commentId}, {'comments.$.content': req.body.content, 'comments.$.user': req.user.id}, function(err, num){
    if(err) { return handleError(res, err); }
    if(num === 0) { return res.send(404); }
    exports.show(req, res);
  });
};
exports.starComment = function(req, res) {
  Question.update({_id: req.params.id, 'comments._id': req.params.commentId}, {$push: {'comments.$.stars': req.user.id}}, function(err, num){
    if(err) { return handleError(res, err); }
    if(num === 0) { return res.send(404); }
    exports.show(req, res);
  });
};
exports.unstarComment = function(req, res) {
  Question.update({_id: req.params.id, 'comments._id': req.params.commentId}, {$pull: {'comments.$.stars': req.user.id}}, function(err, num){
    if(err) { return handleError(res, err); }
    if(num === 0) { return res.send(404); }
    exports.show(req, res);
  });
};

/*
  AnswerComments
*/
exports.createAnswerComment = function(req, res) {
  req.body.user = req.user.id;
  Question.update({_id: req.params.id, 'answers._id': req.params.answerId}, {$push: {'answers.$.comments': req.body}}, function(err, num){
    if(err) {return handleError(res, err); }
    if(num === 0) { return res.send(404); }
    exports.show(req, res);
    Question.updateSearchText(req.params.id);
  })
}
exports.destroyAnswerComment = function(req, res) {
  Question.update({_id: req.params.id, 'answers._id': req.params.answerId}, {$pull: {'answers.$.comments': {_id: req.params.commentId , 'user': req.user._id}}}, function(err, num) {
    if(err) { return handleError(res, err); }
    if(num === 0) { return res.send(404); }
    exports.show(req, res);
    Question.updateSearchText(req.params.id);
  });
};

exports.updateAnswerComment = function(req, res) {
  console.log("req.params", req.params);
  console.log("req.body", req.body);
  Question.find({_id: req.params.id}).exec(function(err, questions){
    if(err) { return handleError(res, err); }
    if(questions.length === 0) { return res.send(404); }
    var question = questions[0];
    var found = false;
    console.log("req.params", req.params);
    console.log("question", question);
    for(var i=0; i<question.answers.length; i++){
      if(question.answers[i]._id.toString() === req.params.answerId){
        found = true;
        var conditions = {};
        conditions._id = req.params.id;
        conditions['answers.' + i + '.comments._id'] = req.params.commentId;
        conditions['answers.' + i + '.comments.user'] = req.user._id;
        var doc = {};
        doc['answers.' + i + '.comments.$.content'] = req.body.content;
        console.log("UPDATING....");
        console.log("conditions:", conditions);
        console.log("doc:", doc);
       // doc[op] = {};
       // doc[op]['answers.' + i + '.comments.$.stars'] = req.user.id;
        // Question.update({_id: req.params.id, 'answers.' + i + '.comments._id': req.params.commentId}, {op: {('answers.' + i + '.comments.$.stars'): req.user.id}}, function(err, num){
        /*jshint -W083 */
        Question.update(conditions, doc, function(err, num){
          if(err) { return handleError(res, err); }
          console.log("UPDATED:num=", num);
          if(num === 0) { return res.send(404); }
          exports.show(req, res);
          return;
        });
      }
    }
    if(!found){
      return res.send(404);
    }
  });
};

var pushOrPullStarAnswerComment = function(op, req, res) {
  Question.find({_id: req.params.id}).exec(function(err, questions){
    if(err) { return handleError(res, err); }
    if(questions.length === 0) { return res.send(404); }
    var question = questions[0];
    var found = false;
    console.log("req.params", req.params);
    console.log("question", question);
    for(var i=0; i<question.answers.length; i++){
      if(question.answers[i]._id.toString() === req.params.answerId){
        found = true;
        var conditions = {};
        conditions._id = req.params.id;
        conditions['answers.' + i + '.comments._id'] = req.params.commentId;
        var doc = {};
        doc[op] = {};
        doc[op]['answers.' + i + '.comments.$.stars'] = req.user.id;
        // Question.update({_id: req.params.id, 'answers.' + i + '.comments._id': req.params.commentId}, {op: {('answers.' + i + '.comments.$.stars'): req.user.id}}, function(err, num){
        /*jshint -W083 */
        Question.update(conditions, doc, function(err, num){
          if(err) { return handleError(res, err); }
          if(num === 0) { return res.send(404); }
          exports.show(req, res);
          return;
        });
      }
    }
    if(!found){
      return res.send(404);
    }
  });
};
exports.starAnswerComment = function(req, res) {
  pushOrPullStarAnswerComment('$push', req, res);
}
exports.unstarAnswerComment = function(req, res) {
  pushOrPullStarAnswerComment('$pull', req, res);
}


function handleError(res, err) {
  console.log("handleError:", err);
  return res.send(500, err);
}