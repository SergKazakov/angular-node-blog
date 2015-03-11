'use strict';

var
  express  = require('express'),
  router   = express.Router(),
  mongoose = require('mongoose'),
  Post     = require('../models/post'),
  Friend   = require('../models/friend'),
  UserApp  = require('userapp'),
  async    = require('async');


UserApp
  .initialize({
    appId: '54e0a91dd2235'
  })
  .setToken('g4EkA_oqSrCw38SZXObpuw');

router.route('/user/:userId')
  .get(function(req, res){

    async.parallel([
      function(cb){
        Post.find({
          UserId: req.params.userId
        }, function(err, posts){
          if (err) {
            throw err;
          }
          cb(null, posts);
        });
      },
      function(cb){
        Friend.findOne({
          UserId: req.params.userId
        }, function(err, user){
          if (err) {
            throw err;
          }
          cb(null, user);
        });
      },
      function(cb){
        UserApp.User.get({
          'user_id': req.params.userId
        }, function(err, user){
            if (err) {
              throw err;
            }
            cb(null, user[0]);
        });
      }],
      function(err, results){
        if (err) {
          throw err;
        }

        var
          postsCount   = results[0] ? results[0].length : 0,
          friendsCount = results[1] ? results[1].Friends.length : 0,
          profile      = results[2];

        res.status(200).send({
          PostsCount   : postsCount,
          FriendsCount : friendsCount,
          UserName     : profile.first_name,
          UserEmail    : profile.email
        });
      });

  });

router.route('/friend/:friendId')
  .post(function(req, res){
    Friend.findOneAndUpdate({
      UserId: req.body.userId
    },
    {
      $addToSet: {
        Friends: req.params.friendId
      }
    },
    {
      upsert: true
    }, function(err, friend){
      if (err) {
        throw err;
      }
      res.status(200).send(friend);
    });
  })
  .put(function(req, res){
    Friend.findOneAndUpdate({
      UserId: req.body.userId
    },
    {
      $pull: {
        Friends: req.params.friendId
      }
    }, function(err, friend){
      if (err) {
        throw err;
      }
      res.status(200).send(friend);
    });
  });

router.route('/users')
  .post(function(req, res){

      async.waterfall([
        function(cb){
          UserApp.User.search({
            fields: 'user_id'
          }, function(err, users){
            if (err) {
              throw err;
            }
            var ids = [];
            users.items.forEach(function(elem){
              ids.push(elem.user_id);
            });
            cb(null, ids);
          });
        },
        function(ids, cb){
          UserApp.User.get({
            'user_id': ids
          }, function(err, users){
            cb(null, users);
          });
      },
      function(users, cb){
          Friend.findOne({
            UserId: req.body.userId
          }, function(err, friend){
            if (err) {
              throw err;
            }
            if (friend && friend.Friends.length) {
              users.forEach(function(user){
                friend.Friends.forEach(function(id){
                  if (user.user_id === id) {
                    user.properties.isFriend.value = true;
                  }
                });
              });
            }
          cb(null, users);
        });
      }], function(err, result){
        if (err) {
          throw err;
        }
        res.status(200).send(result);
      });

  });

router.route('/post')
  .post(function(req, res){
    var post = new Post(req.body);
    post.save(function(err, post){
      if (err) {
        throw err;
      }
      res.status(200).send(post);
    });
  });

router.route('/post/:postId')
  .get(function(req, res){
    Post.findById(mongoose.Types.ObjectId(req.params.postId), function(err, post){
      if (err) {
        throw err;
      }
      res.status(200).send(post);
    });
  })
  .put(function(req, res){
    Post.findOneAndUpdate({
      _id : mongoose.Types.ObjectId(req.params.postId)
    },
    {
      $set: {
        Title: req.body.Title,
        Text:  req.body.Text
      }
    }, function(err, post){
      if (err) {
        throw err;
      }
      res.status(200).send(post);
    });
  })
  .delete(function(req, res){
    Post.remove({
      _id : mongoose.Types.ObjectId(req.params.postId)
    }, function(err){
      if (err) {
        throw err;
      }
      res.sendStatus(200);
    });
  });

router.route('/posts')
  .post(function(req, res){
    var ids = [];
    Friend.findOne({
      UserId: req.body.userId
    }, function(err, user){
      if (err) {
        throw err;
      }
      if (user && user.Friends.length) {
        ids = user.Friends;
      }
      ids.push(req.body.userId);
      Post
        .find({
          UserId: {
            $in : ids
          }
        })
        .sort({
          DateCreation: -1
        })
        .skip(req.body.skipPages * (req.body.pageNumber - 1))
        .limit(req.body.pageSize)
        .exec(function(err, posts){
          if (err) {
            throw err;
          }
          if (req.body.pageNumber === 1) {
            Post.count({
              UserId: {
                $in : ids
              }
            }, function(err, postsCount){
              if (err) {
                throw err;
              }
              res.status(200).send({
                posts:      posts,
                postsCount: postsCount
              });
            });
          }
          else {
            res.status(200).send({
              posts: posts
            });
          }
        });
    });
  });


module.exports = function(app) {
  app.use('/api', router);
};
