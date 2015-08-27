'use strict';

angular.module('paizaqaApp')
  .config(function ($stateProvider) {
    $stateProvider
      .state('questionsCreate', {
        url: '/question/create',
        templateUrl: 'app/questionsCreate/questionsCreate.html',
        controller: 'QuestionsCreateCtrl'
      });
  });
