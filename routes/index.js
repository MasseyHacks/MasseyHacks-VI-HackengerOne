var express = require('express');
var router = express.Router();

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', { title: 'Express' });
});

router.get('/:q', function(req, res, next) {
  res.render(req.params.q)
})

module.exports = router;
