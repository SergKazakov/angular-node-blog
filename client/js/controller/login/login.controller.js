'use strict';

angular.module('billboard')
  .controller('LoginCtrl', function($state, auth, store) {
    auth.signin({
    }, function(profile, token) {
      store.set('profile', profile);
      store.set('token', token);
      $state.go('auth.home');
    }, function(error) {
      console.log('There was an error logging in', error);
    });
  });

