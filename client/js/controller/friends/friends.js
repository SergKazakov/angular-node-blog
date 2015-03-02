'use strict';

angular.module('billboard')
  .config(function($stateProvider) {
    $stateProvider
      .state('friends', {
        url: '/friends',
        templateUrl: 'partials/friends',
        controller: 'FriendsCtrl as friends',
        resolve: {}
      });
  });
