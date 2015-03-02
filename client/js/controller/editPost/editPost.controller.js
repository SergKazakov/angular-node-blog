'use strict';

angular.module('billboard')
  .controller('EditPostCtrl', function($location, $stateParams, $state, api) {

    this.post = {};

    api.getPost($stateParams.postId).success(function(data){
        this.post = data;
    }.bind(this));

    this.editPost = function(postId){
      api.editPost({
        postId: postId,
        post:   this.post
      }).success(function(data){
        $state.go('home');
      });
    };

  });
