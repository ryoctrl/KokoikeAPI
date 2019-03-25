var express = require('express');
var router = express.Router();
const gnavi = require('../controllers/gnaviController');

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

    res.json(await gnavi.shopSearch(word));
});

module.exports = router;
