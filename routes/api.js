var express = require('express');
var router = express.Router();
const fs = require('fs')
const CryptoJS = require('crypto-js')
const questions = JSON.parse(fs.readFileSync('./questions.json', 'utf-8'))
var base64 = require('base-64');
require('dotenv').load()

router.post('/:q/:answer', function (req, res, next) {
    let answer = base64.decode(req.params.answer);
    if (questions[req.params.q]['answers'].includes(answer)) {
        res.send(base64.encode(CryptoJS.AES.encrypt("/q" + (Number(req.params.q.split("q")[1]) + 1), process.env.SECRET)))
    } else {
        res.send("wrong")
    }
})

module.exports = router;
