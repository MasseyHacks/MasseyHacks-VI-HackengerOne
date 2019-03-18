const express = require('express')
const router = express.Router()
const fs = require('fs')
const CryptoJS = require('crypto-js')
const questions = JSON.parse(fs.readFileSync('./questions.json', 'utf-8'))
const base64 = require('base-64')
require('dotenv').load()

router.post('/:q/:answer', function (req, res, next) {
    let answer = base64.decode(req.params.answer)
    if (req.params.q !== 'q1') {
        console.log(req.params.q)
        var q = CryptoJS.AES.decrypt(base64.decode(req.params.q), process.env.SECRET).toString(CryptoJS.enc.Utf8).split('/')[1]
        console.log(q)
    } else {
        var q = req.params.q
    }
    if (questions[q]['answers'].includes(answer.toLowerCase())) {
        res.send(base64.encode(CryptoJS.AES.encrypt("/q" + (Number(q.split("q")[1]) + 1), process.env.SECRET)))
    } else {
        res.send("wrong")
    }
})

router.post('/winAuth', function (req, res, next) {
    let code = base64.decode(req.body['code'])
    let key = req.body['key']
    res.send(CryptoJS.AES.decrypt(code, key).toString(CryptoJS.enc.Utf8))
})

module.exports = router
