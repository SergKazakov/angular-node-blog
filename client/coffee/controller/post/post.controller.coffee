'use strict'

angular
  .module 'billboard'
  .controller 'PostCtrl', ($stateParams, user, api) ->
    @post = {}
    api
      .getPost $stateParams.postId
      .success (data) =>
        @post = data
    return
