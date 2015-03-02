'use strict';

angular.module('billboard')
  .controller('FriendsCtrl', function ($state, $http, user, api) {

    this.users = [];
    this.areFriendsEmpty = false;

    api.getAllUsers(user.current.user_id).success(function (data) {
      if (data.length) {
        this.users = data;
        this.areFriendsEmpty = false;
      } else {
        this.areFriendsEmpty = true;
      }
    }.bind(this));

    this.addFriend = function (friendId, index) {
      api.addFriend({
        friendId: friendId,
        userId: user.current.user_id
      }).success(function () {
        this.users[index].properties.isFriend.value = true;
      }.bind(this));
    };

    this.deleteFriend = function (friendId, index) {
      api.deleteFriend({
        friendId: friendId,
        userId: user.current.user_id
      }).success(function () {
        this.users[index].properties.isFriend.value = false;
      }.bind(this));
    };
  });
