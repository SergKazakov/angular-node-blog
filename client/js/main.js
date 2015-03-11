'use strict';

angular.module('billboard', [
  'ui.router',
  'UserApp',
  'infinite-scroll'
])

.config(function ($urlRouterProvider, $locationProvider) {
  $urlRouterProvider.otherwise('/');
  $locationProvider.html5Mode(true);
})

.run(function (user) {
  user.init({
    appId: '54e0a91dd2235'
  });
});
