'use strict';

angular.module('billboard')
  .config(function($stateProvider) {
    $stateProvider
      .state('friends', {
        url: '/friends',
        templateUrl: 'app/controller/friends/friends.html',
        controller: 'FriendsCtrl as friends',
        resolve: {}
      });
  });
