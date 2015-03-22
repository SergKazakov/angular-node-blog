(function() {
  return angular.module('billboard', ['ui.router', 'UserApp', 'infinite-scroll']).config(function($urlRouterProvider, $locationProvider) {
    $urlRouterProvider.otherwise('/');
    return $locationProvider.html5Mode(true);
  }).run(function(user) {
    return user.init({
      appId: '54e0a91dd2235'
    });
  });
})();

(function() {
  var api;
  api = function($http) {
    return {
      addPost: function(obj) {
        return $http.post('/api/post', {
          Title: obj.title,
          Text: obj.text,
          UserId: obj.userId,
          UserName: obj.userName,
          DateCreation: Date.now()
        });
      },
      getPost: function(postId) {
        return $http.get('/api/post/' + postId);
      },
      editPost: function(obj) {
        return $http.put('/api/post/' + obj._id, {
          Title: obj.Title,
          Text: obj.Text
        });
      },
      deletePost: function(postId) {
        return $http["delete"]('/api/post/' + postId);
      },
      getPosts: function(obj) {
        return $http.post('/api/posts', {
          userId: obj.userId,
          skipPages: obj.skipPages,
          pageSize: obj.pageSize
        });
      },
      getAllUsers: function(userId) {
        return $http.post('/api/users', {
          userId: userId
        });
      },
      addFriend: function(obj) {
        return $http.post('/api/friend/' + obj.friendId, {
          userId: obj.userId
        });
      },
      deleteFriend: function(obj) {
        return $http.put('/api/friend/' + obj.friendId, {
          userId: obj.userId
        });
      },
      getUser: function(userId) {
        return $http.get('/api/user/' + userId);
      }
    };
  };
  return angular.module('billboard').factory('api', api);
})();

(function() {
  return angular.module('billboard').config(function($stateProvider) {
    return $stateProvider.state('addpost', {
      url: '/addpost',
      templateUrl: 'partials/addPost',
      controller: 'AddPostCtrl as addpost'
    });
  });
})();

(function() {
  var AddPostCtrl;
  AddPostCtrl = function($state, user, api) {
    this.addPost = function() {
      return api.addPost({
        title: this.title,
        text: this.text,
        userId: user.current.user_id,
        userName: user.current.first_name
      }).success((function(_this) {
        return function() {
          return $state.go('home');
        };
      })(this));
    };
  };
  return angular.module('billboard').controller('AddPostCtrl', AddPostCtrl);
})();

(function() {
  return angular.module('billboard').config(function($stateProvider) {
    return $stateProvider.state('editpost', {
      url: '/editpost/:postId',
      templateUrl: 'partials/editPost',
      controller: 'EditPostCtrl as editpost'
    });
  });
})();

(function() {
  var EditPostCtrl;
  EditPostCtrl = function($stateParams, $state, api) {
    this.post = {};
    api.getPost($stateParams.postId).success((function(_this) {
      return function(data) {
        return _this.post = data;
      };
    })(this));
    this.editPost = function(postId) {
      return api.editPost(this.post).success(function(data) {
        return $state.go('home');
      });
    };
  };
  return angular.module('billboard').controller('EditPostCtrl', EditPostCtrl);
})();

(function() {
  return angular.module('billboard').config(function($stateProvider) {
    return $stateProvider.state('home', {
      url: '/',
      templateUrl: 'partials/home',
      controller: 'HomeCtrl as home',
      resolve: {}
    });
  });
})();

(function() {
  var HomeCtrl;
  HomeCtrl = function(user, api) {
    this.posts = [];
    this.totalPosts = 0;
    this.pageSize = 5;
    this.loadPostsExecuted = false;
    this.arePostsEmpty = false;
    this.disabledInfiniteScroll = false;
    this.loadMorePosts = function() {
      if (this.loadPostsExecuted) {
        return;
      }
      this.loadPostsExecuted = true;
      return api.getPosts({
        userId: user.current.user_id,
        skipPages: this.posts.length,
        pageSize: this.pageSize
      }).success((function(_this) {
        return function(response) {
          var el, i, len, ref;
          if (response.posts && response.posts.length) {
            if (response.postsCount) {
              _this.totalPosts = response.postsCount;
            }
            if (!_this.posts.length) {
              _this.posts = response.posts;
            } else {
              ref = response.posts;
              for (i = 0, len = ref.length; i < len; i++) {
                el = ref[i];
                _this.posts.push(el);
              }
            }
            return _this.arePostsEmpty = false;
          } else if (!_this.posts.length) {
            return _this.arePostsEmpty = true;
          }
        };
      })(this))["finally"]((function(_this) {
        return function() {
          _this.loadPostsExecuted = false;
          return _this.disabledInfiniteScroll = _this.posts.length === _this.totalPosts;
        };
      })(this));
    };
    this.deletePost = function(postId, index) {
      return api.deletePost(postId).success((function(_this) {
        return function() {
          _this.posts.splice(index, 1);
          --_this.totalPosts;
          if (!_this.totalPosts) {
            return _this.arePostsEmpty = true;
          }
        };
      })(this));
    };
  };
  return angular.module('billboard').controller('HomeCtrl', HomeCtrl);
})();

(function() {
  return angular.module('billboard').config(function($stateProvider) {
    return $stateProvider.state('login', {
      url: '/login',
      templateUrl: 'partials/login',
      data: {
        login: true
      }
    });
  });
})();

(function() {
  return angular.module('billboard').config(function($stateProvider) {
    return $stateProvider.state('post', {
      url: '/post/:postId',
      templateUrl: 'partials/post',
      controller: 'PostCtrl as post'
    });
  });
})();

(function() {
  var PostCtrl;
  PostCtrl = function($stateParams, user, api) {
    this.post = {};
    api.getPost($stateParams.postId).success((function(_this) {
      return function(data) {
        return _this.post = data;
      };
    })(this));
  };
  return angular.module('billboard').controller('PostCtrl', PostCtrl);
})();

(function() {
  return angular.module('billboard').config(function($stateProvider) {
    return $stateProvider.state('signup', {
      url: '/signup',
      templateUrl: 'partials/signup',
      data: {
        "public": true
      }
    });
  });
})();

(function() {
  return angular.module('billboard').config(function($stateProvider) {
    return $stateProvider.state('user', {
      url: '/user/:userId',
      templateUrl: 'partials/user',
      controller: 'UserCtrl as user'
    });
  });
})();

(function() {
  var UserCtrl;
  UserCtrl = function($stateParams, api) {
    this.user = {};
    api.getUser($stateParams.userId).success((function(_this) {
      return function(data) {
        return _this.user = data;
      };
    })(this));
  };
  return angular.module('billboard').controller('UserCtrl', UserCtrl);
})();

(function() {
  return angular.module('billboard').config(function($stateProvider) {
    return $stateProvider.state('friends', {
      url: '/friends',
      templateUrl: 'partials/friends',
      controller: 'FriendsCtrl as friends',
      resolve: {}
    });
  });
})();

(function() {
  var FriendsCtrl;
  FriendsCtrl = function($state, user, api) {
    this.users = [];
    this.areFriendsEmpty = false;
    api.getAllUsers(user.current.user_id).success((function(_this) {
      return function(data) {
        if (data.length) {
          _this.users = data;
          return _this.areFriendsEmpty = false;
        } else {
          return _this.areFriendsEmpty = true;
        }
      };
    })(this));
    this.addFriend = function(friendId, index) {
      return api.addFriend({
        friendId: friendId,
        userId: user.current.user_id
      }).success((function(_this) {
        return function() {
          return _this.users[index].properties.isFriend.value = true;
        };
      })(this));
    };
    this.deleteFriend = function(friendId, index) {
      return api.deleteFriend({
        friendId: friendId,
        userId: user.current.user_id
      }).success((function(_this) {
        return function() {
          return _this.users[index].properties.isFriend.value = false;
        };
      })(this));
    };
  };
  return angular.module('billboard').controller('FriendsCtrl', FriendsCtrl);
})();
