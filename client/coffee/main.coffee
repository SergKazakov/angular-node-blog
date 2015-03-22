do ->
  angular
    .module 'billboard', [
      'ui.router'
      'UserApp'
      'infinite-scroll'
    ]
    .config ($urlRouterProvider, $locationProvider) ->
      $urlRouterProvider.otherwise '/'
      $locationProvider.html5Mode on
    .run (user) ->
      user.init appId: '54e0a91dd2235'
