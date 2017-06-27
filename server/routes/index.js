var express = require('express'),
  router = express.Router(),
  bodyParser = require('body-parser'),
  cookieParser = require('cookie-parser'),
  logger = require(global.paths.core_tools+'/logger'),
  path = require('path');

router.use(cookieParser());
router.use(bodyParser.json());
router.use(bodyParser.text());
router.use(bodyParser.urlencoded({ extended: true }));

router.use('/public/node_modules',express.static('node_modules'));
router.use('/public/js',express.static('client/public/js'));
router.use('/dialogs',express.static('client/views/dialogs'));
router.use('/client',express.static('client'));

router.get('/api/top5',require('../controllers').ranking.getTop5);

router.get('/',function(req,res,next){
  res.sendFile(path.join(__dirname, '../../client/ranking-app/', 'index.html'));
});

function errorUIHandler(err, req, res, next) {

  logger.error(err) || logger.error(JSON.stringify(err))
  res.render('error', { error: err });

}

function errorAPIHandler(err, req, res, next) {

  logger.error(err) || logger.error(JSON.stringify(err))
  if(err.code){
    res.status(err.code).send({ error: err });
  }else{
    res.send({ error: err });
  }

}

router.use('/api',errorAPIHandler);
router.use('/',errorUIHandler);

module.exports = router;