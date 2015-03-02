'use strict';

angular.module('billboard')
  .config(function($stateProvider) {
    $stateProvider
      .state('addpost', {
        url: '/addpost',
        templateUrl: 'app/controller/addPost/addPost.html',
        controller: 'AddPostCtrl as addpost'
      });
  });
