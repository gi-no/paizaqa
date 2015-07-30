'use strict';

angular.module('paizaqaApp')
  .controller('QuestionsCreateCtrl', function ($scope, $http, $location, Auth) {
    if(! Auth.isLoggedIn()){
      $location.path('/login');
      return;
    }
    $scope.submit = function() {
      $http.post('/api/questions', $scope.question).success(function(){
        $location.path('/');
      });
      $scope.question = {};
    };
  });
