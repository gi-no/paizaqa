'use strict';

angular.module('paizaqaApp', [
  'paizaqaApp.auth',
  'paizaqaApp.admin',
  'paizaqaApp.constants',
  'ngCookies',
  'ngResource',
  'ngSanitize',
  'btford.socket-io',
  'ui.router',
  'ui.bootstrap',
  'validation.match',
  'ui.pagedown',
  'ngTagsInput',
  'ngMessages',
  'infinite-scroll',
])
  .config(function($urlRouterProvider, $locationProvider) {
    $urlRouterProvider
      .otherwise('/');

    $locationProvider.html5Mode(true);
  });
