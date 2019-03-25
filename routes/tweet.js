const express = require('express');
const router = express.Router();
const tc = require('../controllers/tweetController');

router.get('/:id', async function(req, res, next) {
    const id = req.params.id;
    if(!id) {
        res.status(500);
        res.json({
            err: true,
            message: 'Tweet id not passed.'
        });
        return;
    }

    const tweet = await tc.getTweet(id);
    if(tweet.length != 1) {
        res.status(500);
        res.json({
            err: true,
            message: 'Tweet not found. tweet maybe not exists, or private tweet'
        });
        return;
    }

    res.status(200);
    res.json(tweet);
});

module.exports = router;
