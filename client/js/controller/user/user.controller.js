'use strict';

angular.module('billboard')
  .controller('UserCtrl', function($stateParams, api) {

    this.user = {};

    api.getUser($stateParams.userId).success(function(data){
      this.user = data;
    }.bind(this));

  });
