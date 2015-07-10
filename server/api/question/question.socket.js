/**
 * Broadcast updates to client when the model changes
 */

'use strict';

var Question = require('./question.model');

exports.register = function(socket) {
  Question.schema.post('save', function (doc) {
    onSave(socket, doc);
  });
  Question.schema.post('remove', function (doc) {
    onRemove(socket, doc);
  });
}

function onSave(socket, doc, cb) {
  socket.emit('question:save', doc);
}

function onRemove(socket, doc, cb) {
  socket.emit('question:remove', doc);
}