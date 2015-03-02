var 
  express           = require('express'),
  bodyParser        = require('body-parser'),
  methodOverride    = require('method-override'),
  errorHandler      = require('error-handler'),
  morgan            = require('morgan'),
  routes            = require('./server/routes/routes'),
  http              = require('http'),
  path              = require('path'),
  env               = process.env.NODE_ENV || 'development',
  app               = module.exports = express();


app
  .set('views', path.join(__dirname, '/client/views'))
  .set('view engine', 'jade')
  .use(morgan('dev'))
  .use(bodyParser.json())
  .use(bodyParser.urlencoded({ extended: false }))
  .use(methodOverride())
  .use(express.static(path.join(__dirname, 'client')))
  .get('/', routes.index)
  .get('/partials/:name', routes.partials)
  .get('*', routes.index)
  .listen(process.env.PORT || 3000);