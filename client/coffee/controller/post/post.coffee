do ->
  angular
    .module 'billboard'
    .config ($stateProvider) ->
      $stateProvider.state 'post',
        url:          '/post/:postId'
        templateUrl:  'partials/post'
        controller:   'PostCtrl as post'
