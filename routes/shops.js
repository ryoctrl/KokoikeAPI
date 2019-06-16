var express = require('express');
var router = express.Router();
const gnavi = require('../controllers/gnaviController');
const uc = require('../controllers/userController');
const ac = require('../controllers/authController');

router.get('/', ac.tokenAuth, async function(req, res, next) {
    const word = req.query.word;
    const logMessage = `Shop searching word: ${word}`;
    console.log(logMessage);

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
