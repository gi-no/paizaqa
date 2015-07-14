'use strict';

var express = require('express');
var controller = require('./question.controller');

var router = express.Router();

router.get('/', controller.index);
router.get('/:id', controller.show);
router.post('/', controller.create);
router.put('/:id', controller.update);
router.patch('/:id', controller.update);
router.delete('/:id', controller.destroy);
router.post('/:id/answers', controller.createAnswer);
router.post('/:id/comments', controller.createComment);
router.post('/:id/answers/:answerId/comments', controller.createAnswerComment);

module.exports = router;