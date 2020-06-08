var express = require('express');
var router = express.Router();

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', { title: 'Expres' });
});

router.get('/chat', async function(req, res, next) {
  res.render('chat', { title: 'Chat' });
});

module.exports = router;
