'use strict';

angular.module('billboard', [
  'ui.router',
  'angular-loading-bar',
  'auth0',
  'angular-storage',
  'angular-jwt'
])

.config(function ($urlRouterProvider, $locationProvider, $httpProvider, jwtInterceptorProvider, authProvider) {
  $urlRouterProvider.otherwise('/');
  $locationProvider.html5Mode(true);

  authProvider.init({
    domain:   'sergeykazakoff-test.auth0.com',
    clientID: 'XPQYEuy68HSlowXjeRJuA4xK9V8HaZdX',
    loginUrl: '/login'
  });

  jwtInterceptorProvider.tokenGetter = function(store) {
    return store.get('token');
  };

  $httpProvider.interceptors.push('jwtInterceptor');

})

.run(function($rootScope, auth, store, jwtHelper, $state) {
  $rootScope.$on('$locationChangeStart', function() {
    if (!auth.isAuthenticated) {
      var token = store.get('token');
      if (token) {
        if (!jwtHelper.isTokenExpired(token)) {
          auth.authenticate(store.get('profile'), token);
        } else {
          $state.go('login');
        }
      }
    }

  });
});
