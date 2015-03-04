'use strict';

angular.module('billboard')
  .config(function($stateProvider) {
    $stateProvider
      .state('login', {
        url: '/login',
        controller: 'LoginCtrl as login'
      });
  });
