'use strict';

angular.module('paizaqaApp')
  .controller('QuestionsIndexCtrl', function ($scope, $http) {
    $scope.message = 'Hello';
    $http.get('/api/questions').success(function(questions) {
      $scope.questions = questions;
    });
  });
