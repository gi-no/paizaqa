'use strict';

var express = require('express');
var controller = require('./question.controller');

var router = express.Router();
var auth = require('../../auth/auth.service');

router.get('/', controller.index);
router.get('/:id', controller.show);
router.post('/', auth.isAuthenticated(), controller.create);
router.put('/:id', auth.isAuthenticated(), controller.update);
router.patch('/:id', auth.isAuthenticated(), controller.update);
router.delete('/:id', auth.isAuthenticated(), controller.destroy);
router.post('/:id/answers', auth.isAuthenticated(), controller.createAnswer);
router.delete('/:id/answers/:answerId', auth.isAuthenticated(), controller.destroyAnswer);
router.post('/:id/comments', auth.isAuthenticated(), controller.createComment);
router.delete('/:id/comments/:commentId', auth.isAuthenticated(), controller.destroyComment);
router.post('/:id/answers/:answerId/comments', auth.isAuthenticated(), controller.createAnswerComment);
router.delete('/:id/answers/:answerId/comments/:commentId', auth.isAuthenticated(), controller.destroyAnswerComment);

module.exports = router;