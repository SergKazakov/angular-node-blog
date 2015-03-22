do ->
  PostCtrl = ($stateParams, user, api) ->
    @post = {}
    api
      .getPost $stateParams.postId
      .success (data) =>
        @post = data
    return

  angular
    .module 'billboard'
    .controller 'PostCtrl', PostCtrl
