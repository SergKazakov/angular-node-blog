'use strict'

angular
  .module 'billboard'
  .config ($stateProvider) ->
    $stateProvider.state 'addpost',
      url:          '/addpost'
      templateUrl:  'partials/addPost'
      controller:   'AddPostCtrl as addpost'
