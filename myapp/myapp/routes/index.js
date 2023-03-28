var express = require('express');
var router = express.Router();

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', { title: 'Maintenance Management, use localhost:3000 for Frontend' });
});

module.exports = router;
