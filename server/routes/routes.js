'use strict';

var 
  express = require('express'),
  router  = express.Router();

router
  .get('/', function(req, res){
    res.render('partials/index');
  })
  .get('/partials/:name', function (req, res) {
    res.render('partials/' + req.params.name);
  })
  .get('*', function(req, res){
    res.render('partials/index');
  });

module.exports = function(app) {
  app.use('/', router);
};
