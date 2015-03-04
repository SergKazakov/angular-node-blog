'use strict';

angular.module('billboard')
  .config(function($stateProvider) {
    $stateProvider
      .state('auth.home', {
        url: '/',
        templateUrl: 'partials/home',
        controller: 'HomeCtrl as home'
      });
  });
