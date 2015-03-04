'use strict';

angular.module('billboard')
  .config(function($stateProvider) {
    $stateProvider
      .state('auth', {
        abstract: true,
        controller: 'AuthCtrl as auth',
        templateUrl: 'partials/index',
        data: {
          requiresLogin: true
        }
      });
  });