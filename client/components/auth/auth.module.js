'use strict';

angular.module('paizaqaApp.auth', [
  'paizaqaApp.constants',
  'paizaqaApp.util',
  'ngCookies',
  'ui.router'
])
  .config(function($httpProvider) {
    $httpProvider.interceptors.push('authInterceptor');
  });
