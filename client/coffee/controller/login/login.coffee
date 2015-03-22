do ->
  angular
    .module 'billboard'
    .config ($stateProvider) ->
      $stateProvider.state 'login',
        url:          '/login'
        templateUrl:  'partials/login'
        data:
          login: on
