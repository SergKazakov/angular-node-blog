do ->
  AddPostCtrl = ($state, user, api) ->
    @addPost = ->
      api
        .addPost
          title:    @title
          text:     @text
          userId:   user.current.user_id
          userName: user.current.first_name
        .success =>
          $state.go 'home'
    return

  angular
    .module 'billboard'
    .controller 'AddPostCtrl', AddPostCtrl
