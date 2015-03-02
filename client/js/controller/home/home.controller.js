'use strict';

angular.module('billboard')
  .controller('HomeCtrl', function(user, api) {

  	this.posts = [];
    this.arePostsEmpty = false;

    api.getPosts(user.current.user_id).success(function(data){
      if (data.length) {
        this.posts = data;
        this.arePostsEmpty = false;
      }
      else {
        this.arePostsEmpty = true;
      }
  	}.bind(this));

  	this.deletePost = function(postId, index){
  		api.deletePost(postId).success(function(){
        this.posts.splice(index, 1);
        if (!this.posts.length) {
          this.arePostsEmpty = true;
        }
  		}.bind(this));
  	};
  });

