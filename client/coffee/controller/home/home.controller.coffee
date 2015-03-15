'use strict'

angular
  .module 'billboard'
  .controller 'HomeCtrl', (user, api) ->
    @posts                  = []
    @totalPosts             = 1
    @pageNumber             = 1
    @pageSize               = @skipPages = 5
    @loadPostsExecuted      = no
    @arePostsEmpty          = no
    @disabledInfiniteScroll = no

    @loadMorePosts = ->
      return if @loadPostsExecuted
      @loadPostsExecuted = on
      api
        .getPosts
          userId:     user.current.user_id
          skipPages:  @skipPages
          pageSize:   @pageSize
          pageNumber: @pageNumber
        .success (response) =>
          if response.posts and response.posts.length
            @totalPosts = response.postsCount if response.postsCount
            if not @posts.length
              @posts = response.posts
            else
              for el in response.posts then @posts.push el
            @skipPages = @pageSize if @skipPages is 0
            ++@pageNumber
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
          --@skipPages
          @arePostsEmpty = on if not @posts.length
    return
