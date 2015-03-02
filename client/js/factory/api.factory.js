'use strict';

angular.module('billboard')
  .factory('api', function ($http) {
    return {
      addPost: function (obj) {
        return $http.post('/post', {
          title:        obj.title,
          text:         obj.text,
          userId:       obj.userId,
          userName:     obj.userName,
          dateCreation: Date.now()
        });
      },
      getPost: function (postId) {
        return $http.get('/post/' + postId);
      },
      editPost: function (obj) {
        return $http.put('/post/' + obj.postId, {
          post: obj.post
        });
      },
      deletePost: function (postId) {
        return $http.delete('/post/' + postId);
      },
      getPosts: function (userId) {
        return $http.post('/posts', {
          userId: userId
        });
      },
      getAllUsers: function (userId) {
        return $http.post('/users', {
          userId: userId
        });
      },
      addFriend: function (obj) {
        return $http.post('/friend/' + obj.friendId, {
          userId: obj.userId
        });
      },
      deleteFriend: function (obj) {
        return $http.put('/friend/' + obj.friendId, {
          userId: obj.userId
        });
      },
      getUser: function (userId) {
        return $http.get('/user/' + userId);
      }
    };
  });
