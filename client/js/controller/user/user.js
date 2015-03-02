'use strict';

angular.module('billboard')
  .config(function ($stateProvider) {
    $stateProvider
      .state('user', {
        url: '/user/:userId',
        templateUrl: 'app/controller/user/user.html',
        controller: 'UserCtrl as user'
      });
  });
