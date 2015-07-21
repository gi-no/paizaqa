'use strict';

angular.module('paizaqaApp', [
  'ngCookies',
  'ngResource',
  'ngSanitize',
  'btford.socket-io',
  'ui.router',
  'ui.bootstrap',
  'ui.pagedown',
  'ngTagsInput',
  'ngMessages',
  'infinite-scroll',
])
  .config(function ($stateProvider, $urlRouterProvider, $locationProvider, $httpProvider) {
    $urlRouterProvider
      .otherwise('/');

    $locationProvider.html5Mode(true);
    $httpProvider.interceptors.push('authInterceptor');
  })

  .factory('authInterceptor', function ($rootScope, $q, $cookieStore, $location) {
    return {
      // Add authorization token to headers
      request: function (config) {
        config.headers = config.headers || {};
        if ($cookieStore.get('token')) {
          config.headers.Authorization = 'Bearer ' + $cookieStore.get('token');
        }
        return config;
      },

      // Intercept 401s and redirect you to login
      responseError: function(response) {
        if(response.status === 401) {
          $location.path('/login');
          // remove any stale tokens
          $cookieStore.remove('token');
          return $q.reject(response);
        }
        else {
          return $q.reject(response);
        }
      }
    };
  })

  .run(function ($rootScope, $location, Auth) {
    // Redirect to login if route requires auth and you're not logged in
    $rootScope.$on('$stateChangeStart', function (event, next) {
      Auth.isLoggedInAsync(function(loggedIn) {
        if (next.authenticate && !loggedIn) {
          $location.path('/login');
        }
      });
    });

    /*
      Issue: I'm getting a blank screen, and there are NO errors!
      https://github.com/angular-ui/ui-router/wiki/Frequently-Asked-Questions#issue-im-getting-a-blank-screen-and-there-are-no-errors
      Issue: JavaScript errors don't throw within resolve functions
      https://github.com/angular-ui/ui-router/wiki/Frequently-Asked-Questions#issue-javascript-errors-dont-throw-within-resolve-functions
      More verbose logging to the console
      https://github.com/angular-ui/ui-router/issues/1871
    */
    $rootScope.$on('$stateChangeError',function(event, toState, toParams, fromState, fromParams){
      console.error('$stateChangeError - fired when an error occurs during transition.');
      console.error(arguments);
    });

  });
