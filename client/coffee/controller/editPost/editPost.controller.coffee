do ->
  EditPostCtrl = ($stateParams, $state, api) ->
    @post = {}
    api
      .getPost $stateParams.postId
      .success (data) => @post = data

    @editPost = (postId) ->
      api
        .editPost @post
        .success (data) -> $state.go 'home'
    return

  angular
    .module 'billboard'
    .controller 'EditPostCtrl', EditPostCtrl
