do ->
  angular
    .module 'billboard'
    .config ($stateProvider) ->
      $stateProvider.state 'friends',
        url:          '/friends'
        templateUrl:  'partials/friends'
        controller:   'FriendsCtrl as friends'
        resolve:      {}
