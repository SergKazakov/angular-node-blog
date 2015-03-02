'use strict';

angular.module('billboard')
  .config(function($stateProvider) {
    $stateProvider
      .state('post', {
        url: '/post/:postId',
        templateUrl:  'app/controller/post/post.html',
        controller:   'PostCtrl as post'
      });
  });
