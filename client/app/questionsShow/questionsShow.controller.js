'use strict';

angular.module('paizaqaApp')
  .controller('QuestionsShowCtrl', function ($scope, $http, $stateParams) {
    var loadQuestions = function(){
      $http.get('/api/questions/' + $stateParams.id).success(function(question) {
        $scope.question = question;
      });
    };
    loadQuestions();

    $scope.newAnswer = {};
    $scope.submitAnswer = function() {
      $http.post('/api/questions/' + $stateParams.id + '/answers', $scope.newAnswer).success(function(){
        loadQuestions();
        $scope.newAnswer = {};
      });
    };

    $scope.deleteQuestion = function() {
      $http.delete('/api/questions/' + $stateParams.id).success(function(){
        $location.path('/');
      });
    };
    $scope.deleteAnswer = function(answer) {
      $http.delete('/api/questions/' + $stateParams.id + '/answers/' + answer._id).success(function(){
        loadQuestions();
      });
    };
    $scope.updateQuestion = function() {
      $http.put('/api/questions/' + $stateParams.id, $scope.question).success(function(){
        loadQuestions();
      });
    };
    $scope.updateAnswer = function(answer) {
      $http.put('/api/questions/' + $stateParams.id + '/answers/' + answer._id, answer).success(function(){
        loadQuestions();
      });
    };
    $scope.isOwner = function(obj){
      return Auth.isLoggedIn() && obj && obj.user && obj.user._id === Auth.getCurrentUser()._id;
    };

  });
