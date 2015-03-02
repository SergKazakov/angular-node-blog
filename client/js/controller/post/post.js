'use strict';

angular.module('billboard')
  .config(function($stateProvider) {
    $stateProvider
      .state('post', {
        url: '/post/:postId',
        templateUrl:  'partials/post',
        controller:   'PostCtrl as post'
      });
  });
