var express = require('express');
var router = express.Router();
const fs = require('fs')
const questions = JSON.parse(fs.readFileSync('./questions.json', 'utf-8'))
var base64 = require('base-64');

router.post('/:q/:answer', function (req, res, next) {
    let answer = base64.decode(req.params.answer);
    if (questions[req.params.q]['answers'].includes(answer)) {
        res.send("/q" + (Number(req.params.q.split("q")[1]) + 1))
    } else {
        res.send("wrong")
    }
})

module.exports = router;
