const express = require('express');
const router = express.Router();
const tc = require('../controllers/tweetController');
const uc = require('../controllers/userController');
const ac = require('../controllers/authController');

router.get('/:id', ac.tokenAuth, async function(req, res, next) {
    const user = req.authedUser;
    const id = req.params.id;
    if(!id) {
        res.status(500);
        res.json({
            err: true,
            message: 'Tweet id not passed.'
        });
        return;
    }

    const tweet = await tc.getLocationByTweet(id, {
        twitter_access_token: user.twitter_access_token,
        twitter_access_secret: user.twitter_access_secret
    });
    if(!tweet) {
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
