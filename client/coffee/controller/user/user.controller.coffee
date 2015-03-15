'use strict'

angular
  .module 'billboard'
  .controller 'UserCtrl', ($stateParams, api) ->
    @user = {}
    api
      .getUser $stateParams.userId
      .success (data) =>
        @user = data
    return
