'use strict';

angular.module('billboard', [
  'ui.router',
  'UserApp',
  'blockUI'
])

.config(function ($urlRouterProvider, $locationProvider, blockUIConfig) {
  $urlRouterProvider.otherwise('/');
  $locationProvider.html5Mode(true);
  blockUIConfig.delay = 0;
  blockUIConfig.templateUrl = '../views/block-ui/block-ui.html';
})

.run(function (user) {
  user.init({
    appId: '54e0a91dd2235'
  });
});
