'use strict';

angular.module('billboard')
  .controller('AuthCtrl', function($state, auth) {

    this.user = auth.profile;

    this.logout = function() {
      auth.signout();
      $state.go('login');
    };

  });
