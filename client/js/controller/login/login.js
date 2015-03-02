'use strict';

angular.module('billboard')
  .config(function($stateProvider) {
    $stateProvider
      .state('login', {
        url: '/login',
        templateUrl: 'partials/login',
        data: {
          login: true
        }
      });
  });
