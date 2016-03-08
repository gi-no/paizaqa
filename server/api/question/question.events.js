/**
 * Question model events
 */

'use strict';

import {EventEmitter} from 'events';
var Question = require('./question.model');
var QuestionEvents = new EventEmitter();

// Set max event listeners (0 == unlimited)
QuestionEvents.setMaxListeners(0);

// Model events
var events = {
  'save': 'save',
  'remove': 'remove'
};

// Register the event emitter to the model events
for (var e in events) {
  var event = events[e];
  Question.schema.post(e, emitEvent(event));
}

function emitEvent(event) {
  return function(doc) {
    QuestionEvents.emit(event + ':' + doc._id, doc);
    QuestionEvents.emit(event, doc);
  }
}

export default QuestionEvents;
