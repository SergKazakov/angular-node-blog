'use strict'

angular
  .module 'billboard'
  .controller 'HomeCtrl', (user, api) ->
    @posts                  = []
    @totalPosts             = 0
    @pageSize               = 5
    @loadPostsExecuted      = no
    @arePostsEmpty          = no
    @disabledInfiniteScroll = no

    @loadMorePosts = ->
      return if @loadPostsExecuted
      @loadPostsExecuted = on
      api
        .getPosts
          userId:     user.current.user_id
          skipPages:  @posts.length
          pageSize:   @pageSize
        .success (response) =>
          if response.posts and response.posts.length
            @totalPosts = response.postsCount if response.postsCount
            if not @posts.length
              @posts = response.posts
            else
              for el in response.posts then @posts.push el
            @arePostsEmpty = no
          else if not @posts.length
            @arePostsEmpty = on
        .finally =>
          @loadPostsExecuted = no
          @disabledInfiniteScroll = @posts.length is @totalPosts

    @deletePost = (postId, index) ->
      api
        .deletePost postId
        .success =>
          @posts.splice index, 1
          --@totalPosts
          @arePostsEmpty = on if not @totalPosts
    return
