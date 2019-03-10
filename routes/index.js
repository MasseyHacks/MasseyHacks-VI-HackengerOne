var express = require('express');
var router = express.Router();
const CryptoJS = require('crypto-js')
var base64 = require('base-64');

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render("q1")
});

router.get('/:q', function(req, res, next) {
  console.log(CryptoJS.AES.decrypt(base64.decode(req.params.q), process.env.SECRET).toString(CryptoJS.enc.Utf8))
  res.render(CryptoJS.AES.decrypt(base64.decode(req.params.q), process.env.SECRET).toString(CryptoJS.enc.Utf8).split("/")[1])
})

module.exports = router;
