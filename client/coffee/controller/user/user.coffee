'use strict'

angular
  .module 'billboard'
  .config ($stateProvider) ->
    $stateProvider.state 'user',
      url:          '/user/:userId'
      templateUrl:  'partials/user'
      controller:   'UserCtrl as user'
