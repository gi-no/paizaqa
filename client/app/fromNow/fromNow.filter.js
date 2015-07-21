'use strict';

angular.module('paizaqaApp')
  .filter('fromNow', function () {
    return function (input) {
      return 'fromNow filter: ' + input;
    };
  });
