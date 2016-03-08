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
router.put('/:id/answers/:answerId', auth.isAuthenticated(), controller.updateAnswer);
router.delete('/:id/answers/:answerId', auth.isAuthenticated(), controller.destroyAnswer);

router.post('/:id/comments', auth.isAuthenticated(), controller.createComment);
router.put('/:id/comments/:commentId', auth.isAuthenticated(), controller.updateComment);
router.delete('/:id/comments/:commentId', auth.isAuthenticated(), controller.destroyComment);

router.post('/:id/answers/:answerId/comments', auth.isAuthenticated(), controller.createAnswerComment);
router.put('/:id/answers/:answerId/comments/:commentId', auth.isAuthenticated(), controller.updateAnswerComment);
router.delete('/:id/answers/:answerId/comments/:commentId', auth.isAuthenticated(), controller.destroyAnswerComment);


router.put('/:id/star', auth.isAuthenticated(), controller.star);
router.delete('/:id/star', auth.isAuthenticated(), controller.unstar);
router.put('/:id/answers/:answerId/star', auth.isAuthenticated(), controller.starAnswer);
router.delete('/:id/answers/:answerId/star', auth.isAuthenticated(), controller.unstarAnswer);
router.put('/:id/comments/:commentId/star', auth.isAuthenticated(), controller.starComment);
router.delete('/:id/comments/:commentId/star', auth.isAuthenticated(), controller.unstarComment);
router.put('/:id/answers/:answerId/comments/:commentId/star', auth.isAuthenticated(), controller.starAnswerComment);
router.delete('/:id/answers/:answerId/comments/:commentId/star', auth.isAuthenticated(), controller.unstarAnswerComment);

module.exports = router;
