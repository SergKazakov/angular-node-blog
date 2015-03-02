'use strict';

angular.module('billboard')
  .config(function($stateProvider) {
    $stateProvider
      .state('editpost', {
        url: '/editpost/:postId',
        templateUrl:  'app/controller/editPost/editPost.html',
        controller:   'EditPostCtrl as editpost'
      });
  });
