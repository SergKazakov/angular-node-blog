'use strict'
angular
  .module 'billboard'
  .controller 'FriendsCtrl', ($state, user, api) ->
    @users            = []
    @areFriendsEmpty  = no
    api
      .getAllUsers user.current.user_id
      .success (data) =>
        if data.length
          @users = data
          @areFriendsEmpty = no
        else
          @areFriendsEmpty = on

    @addFriend = (friendId, index) ->
      api
        .addFriend
          friendId: friendId
          userId:   user.current.user_id
        .success =>
          @users[index].properties.isFriend.value = on

    @deleteFriend = (friendId, index) ->
      api
      .deleteFriend
        friendId: friendId
        userId:   user.current.user_id
      .success =>
        @users[index].properties.isFriend.value = no
    return
