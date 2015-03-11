'use strict';

angular.module('billboard')
  .factory('api', function ($http) {
    return {
      addPost: function (obj) {
        return $http.post('/api/post', {
          Title:        obj.title,
          Text:         obj.text,
          UserId:       obj.userId,
          UserName:     obj.userName,
          DateCreation: Date.now()
        });
      },
      getPost: function (postId) {
        return $http.get('/api/post/' + postId);
      },
      editPost: function (obj) {
        return $http.put('/api/post/' + obj._id, {
          Title: obj.Title,
          Text:  obj.Text
        });
      },
      deletePost: function (postId) {
        return $http.delete('/api/post/' + postId);
      },
      getPosts: function (obj) {
        return $http.post('/api/posts', {
          userId:     obj.userId,
          skipPages:  obj.skipPages,
          pageSize:   obj.pageSize,
          pageNumber: obj.pageNumber
        });
      },
      getAllUsers: function (userId) {
        return $http.post('/api/users', {
          userId: userId
        });
      },
      addFriend: function (obj) {
        return $http.post('/api/friend/' + obj.friendId, {
          userId: obj.userId
        });
      },
      deleteFriend: function (obj) {
        return $http.put('/api/friend/' + obj.friendId, {
          userId: obj.userId
        });
      },
      getUser: function (userId) {
        return $http.get('/api/user/' + userId);
      }
    };
  });
