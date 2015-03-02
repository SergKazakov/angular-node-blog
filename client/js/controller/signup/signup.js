'use strict';

angular.module('billboard')
  .config(function($stateProvider) {
    $stateProvider
      .state('signup', {
        url: '/signup',
        templateUrl: 'app/controller/signup/signup.html',
        data: {
          public: true
        }
      });
  });
