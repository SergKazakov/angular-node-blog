do ->
  UserCtrl = ($stateParams, api) ->
    @user = {}
    api
      .getUser $stateParams.userId
      .success (data) =>
        @user = data
    return

  angular
    .module 'billboard'
    .controller 'UserCtrl',  UserCtrl

