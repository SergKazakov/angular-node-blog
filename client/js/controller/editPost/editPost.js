'use strict';

angular.module('billboard')
  .config(function($stateProvider) {
    $stateProvider
      .state('editpost', {
        url: '/editpost/:postId',
        templateUrl:  'partials/editPost',
        controller:   'EditPostCtrl as editpost'
      });
  });
