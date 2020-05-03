const express = require('express')
const router = express.Router()
const fs = require('fs')
const CryptoJS = require('crypto-js')
const questions = JSON.parse(fs.readFileSync('./questions.json', 'utf-8'))
const base64 = require('base-64')
const axios = require('axios')
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
        let reportData = {
            "timestamp": Date.now() / 1000,
            "namespace": "hackenger1",
            "question": q,
            "state": "correct"
        }

        axios.post(process.env.STATSENGINE + "/reportInternal", {
            info: base64.encode(CryptoJS.AES.encrypt(reportData.toString(), process.env.SECRET)),
            key: process.env.STATSKEY
        }, {
            headers: {
                'content-type': 'application/json'
            }
        })
        res.send(base64.encode(CryptoJS.AES.encrypt("/q" + (Number(q.split("q")[1]) + 1), process.env.SECRET)))
    } else {
        let reportData = {
            "timestamp": Date.now() / 1000,
            "namespace": "hackenger1",
            "question": q,
            "state": "incorrect"
        }

        axios.post(process.env.STATSENGINE + "/reportInternal", {
            info: base64.encode(CryptoJS.AES.encrypt(reportData.toString(), process.env.SECRET)),
            key: process.env.STATSKEY
        }, {
            headers: {
                'content-type': 'application/json'
            }
        })
        res.send("wrong")
    }
})

router.post('/winAuth', function (req, res, next) {
    let code = base64.decode(req.body['code'])
    let key = req.body['key']
    res.send(CryptoJS.AES.decrypt(code, key).toString(CryptoJS.enc.Utf8))
})

module.exports = router
