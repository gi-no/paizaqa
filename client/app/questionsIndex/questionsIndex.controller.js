'use strict';

angular.module('paizaqaApp')
  .controller('QuestionsIndexCtrl', function ($scope, $http, Auth, query) {
    $http.get('/api/questions', {params: {query: query}}).success(function(questions) {
      $scope.questions = questions;
    });
    $scope.isStar = function(obj){
      return Auth.isLoggedIn() && obj && obj.stars && obj.stars.indexOf(Auth.getCurrentUser()._id)!==-1;
    };
  });
