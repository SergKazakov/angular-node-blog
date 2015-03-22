do ->
  angular
    .module 'billboard'
    .config ($stateProvider) ->
      $stateProvider.state 'editpost',
        url:          '/editpost/:postId'
        templateUrl:  'partials/editPost'
        controller:   'EditPostCtrl as editpost'
