do ->
  api = ($http) ->
    addPost: (obj) ->
      $http.post '/api/post',
        Title:        obj.title
        Text:         obj.text
        UserId:       obj.userId
        UserName:     obj.userName
        DateCreation: Date.now()
    getPost: (postId) ->
      $http.get '/api/post/' + postId
    editPost: (obj) ->
      $http.put '/api/post/' + obj._id,
        Title:  obj.Title
        Text:   obj.Text
    deletePost: (postId) ->
      $http.delete '/api/post/' + postId
    getPosts: (obj) ->
      $http.post '/api/posts',
        userId:     obj.userId
        skipPages:  obj.skipPages
        pageSize:   obj.pageSize
    getAllUsers: (userId) ->
      $http.post '/api/users', userId: userId
    addFriend: (obj) ->
      $http.post '/api/friend/' + obj.friendId, userId: obj.userId
    deleteFriend: (obj) ->
      $http.put '/api/friend/' + obj.friendId, userId: obj.userId
    getUser: (userId) ->
      $http.get '/api/user/' + userId

  angular
    .module 'billboard'
    .factory 'api', api
