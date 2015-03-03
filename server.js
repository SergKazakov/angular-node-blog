'use strict';

var
  express           = require('express'),
  bodyParser        = require('body-parser'),
  methodOverride    = require('method-override'),
  morgan            = require('morgan'),
  path              = require('path'),
  mongoose          = require('mongoose'),
  chalk             = require('chalk'),
  app               = module.exports = express();

app
  .set('views', path.join(__dirname, '/client/views'))
  .set('view engine', 'jade')
  .use(morgan('dev'))
  .use(bodyParser.json())
  .use(bodyParser.urlencoded({ extended: false }))
  .use(methodOverride())
  .use(express.static(path.join(__dirname, 'client')));

mongoose.connect('mongodb://root:root@ds033601.mongolab.com:33601/blog', function(err) {
  if (err) {
    console.error(chalk.red('Could not connect to MongoDB!'));
    console.log(chalk.red(err));
  }
});

mongoose.connection.on('error', function(err) {
  console.error(chalk.red('MongoDB connection error: ' + err));
  process.exit(-1);
  }
);

require('./server/routes/api')(app);
require('./server/routes/routes')(app);

app.listen(process.env.PORT || 3000);
