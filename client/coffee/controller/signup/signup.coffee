do ->
  angular
    .module 'billboard'
    .config ($stateProvider) ->
      $stateProvider.state 'signup',
        url:          '/signup'
        templateUrl:  'partials/signup'
        data:
          public: on
