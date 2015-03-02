'use strict';

angular.module('billboard')
  .controller('AddPostCtrl', function($location, $state, user, api) {
  	this.addPost = function(){
      api.addPost({
        title:      this.title,
        text:       this.text,
        userId:     user.current.user_id,
        userName:   user.current.first_name
      }).success(function(){
        $state.go('home');
      });
  	};
  });
