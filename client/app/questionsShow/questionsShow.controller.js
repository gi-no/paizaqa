'use strict';

angular.module('paizaqaApp')
  .controller('QuestionsShowCtrl', function ($scope, $http, $stateParams) {
    $http.get('/api/questions/' + $stateParams.id).success(function(question) {
      $scope.question = question;
    });
    $scope.answer = {};
    $scope.submitAnswer = function() {
      $http.post('/api/questions/' + $stateParams.id + '/answers', $scope.answer).success(function(){
        $http.get('/api/questions/' + $stateParams.id).success(function(question) {
          $scope.question = question;
          $scope.answer = {};
        });
      })
    };

  });
