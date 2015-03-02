'use strict';

angular.module('billboard')
  .config(function($stateProvider) {
    $stateProvider
      .state('signup', {
        url: '/signup',
        templateUrl: 'partials/signup',
        data: {
          public: true
        }
      });
  });
