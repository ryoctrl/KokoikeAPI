var express = require('express');
var router = express.Router();
const axios = require('axios');
const GNAVI_API_KEY = process.env.GNAVI_API_KEY;

router.get('/', async function(req, res, next) {
    const word = req.query.word;
    console.log(word);

    if(!word) {
        res.status(500);
        res.json({
            err: true,
            message: 'Word key not passed',
        });
        return;
    }

    const response = await axios.get('https://api.gnavi.co.jp/RestSearchAPI/v3/', {
        params: {
            keyid: GNAVI_API_KEY,
            name: word
        }
    });

    console.log(response.data);

    res.json(response.data);
});

module.exports = router;
