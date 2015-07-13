'use strict';

angular.module('paizaqaApp')
  .config(function ($stateProvider) {
    $stateProvider
      .state('questionsIndex', {
        url: '/',
        templateUrl: 'app/questionsIndex/questionsIndex.html',
        controller: 'QuestionsIndexCtrl'
      });
  });