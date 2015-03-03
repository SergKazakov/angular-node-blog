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
          if (err) throw err;
          cb(null, posts);
        });
      },
      function(cb){
        Friend.findOne({
          UserId: req.params.userId
        }, function(err, user){
          if (err) throw err;
          cb(null, user);
        });
      },
      function(cb){
        UserApp.User.get({}, function(err, user){
            if (err) throw err;
            cb(null, user);
        });  
      }],
      function(err, results){
        if (err) throw err;

        var
          postsCount   = results[0] ? results[0].length : 0,
          friendsCount = results[1] ? results[1].Friends.length : 0,
          profile      = results[2][0];

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

  })
  .put(function(req, res){

  });

router.route('/users')
  .post(function(req, res){
    async.waterfall([
      function(cb){
        UserApp.User.search({}, function(err, users){
          if (err) throw err;
          cb(null, users.items);
        });
      },
      function(users, cb){
        var result = [];
        users.forEach(function(elem, index){
          UserApp.User.get({
              'user_id': elem.user_id
          }, function(err, user){
              if (err) throw err;
              result.push(user[0]);
          });
        });
        cb(null, result);
      }],
      function(err, result){
        if (err) throw err;
        console.log(result);
        res.status(200).send(result);
      });
  });

router.route('/post')
  .post(function(req, res){
    var post = new Post(req.body);
    post.save(function(err, post){
      if (err) throw err;
      res.status(200).send(post);
    });
  });

router.route('/post/:postId')
  .get(function(req, res){
    Post.findById(mongoose.Types.ObjectId(req.params.postId), function(err, post){
      if (err) throw err;
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
      if (err) throw err;
      res.status(200).send(post);
    });
  })
  .delete(function(req, res){
    Post.remove({
      _id : mongoose.Types.ObjectId(req.params.postId)
    }, function(err){
      if (err) throw err;
      res.sendStatus(200);
    });
  });

router.route('/posts')
  .post(function(req, res){
      Post.find({
        UserId: req.body.userId
      }, function(err, posts) {
        if (err) throw err;
        res.send(posts);
      });
  });


module.exports = function(app) {
  app.use('/api', router);
}
