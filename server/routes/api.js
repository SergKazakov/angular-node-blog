'use strict';

var
  express  = require('express'),
  router   = express.Router(),
  mongoose = require('mongoose'),
  Post     = require('../models/post');

router.route('/user/:userId')
  .get(function(req, res){

  });

router.route('/friend/:friendId')
  .post(function(req, res){

  })
  .post(function(req, res){

  });

router.route('/users')
  .post(function(req, res){

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
