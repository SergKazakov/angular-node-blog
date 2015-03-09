'use strict';

angular.module('billboard')
  .controller('HomeCtrl', function(user, api) {

  	this.posts                  = [];
    this.pageNumber             = 1;
    this.totalPosts             = 1;
    this.pageSize               = 5;
    this.loadPostsExecuted      = false;
    this.arePostsEmpty          = false;
    this.disabledInfiniteScroll = false;

    this.loadMorePosts = function(){
      if (this.loadPostsExecuted) {
        return;
      }
      this.loadPostsExecuted = true;
      api.getPosts({
        userId:     user.current.user_id,
        pageSize:   this.pageSize,
        pageNumber: this.pageNumber
      }).success(function(response){
        if (response.posts && response.posts.length) {
          if (response.postsCount) {
            this.totalPosts = response.postsCount;
          }
          if (!this.posts.length) {
            this.posts = response.posts;
          }
          else {
            response.posts.forEach(function(el){
              this.posts.push(el);
            }.bind(this));
          }
          ++this.pageNumber;
          this.arePostsEmpty = false;
        }
        else if (!this.posts.length){
          this.arePostsEmpty = true;
        }
      }.bind(this))
      .finally(function(){
        this.loadPostsExecuted = false;
        this.disabledInfiniteScroll = this.posts.length === this.totalPosts;
      }.bind(this));
    };

  	this.deletePost = function(postId, index){
  		api.deletePost(postId).success(function(){
        this.posts.splice(index, 1);
        if (!this.posts.length) {
          this.arePostsEmpty = true;
        }
  		}.bind(this));
  	};
  });

