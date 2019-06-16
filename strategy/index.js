'use strict';

const fs = require('fs');
const path = require('path');
const basename = path.basename(__filename);
const strategies = {};
const gc = require('../controllers/gnaviController');


fs.readdirSync(__dirname)
    .filter(file => {
        return (file.indexOf('.') !== 0) && (file !== basename) && (file.slice(-3) === '.js');
    })
    .forEach(file => {
        const strategy = require(path.join(__dirname, file));
        strategies[strategy.target] = strategy;
    });

//module.exports = strategies;
module.exports = {
    validateTweetObject: function(tweet) {
        if(!tweet) {
            return {
                err: true,
                message: 'tweet is not passed'
            }
        }

        if(typeof(tweet) !== 'object') {
            return {
                err: true,
                message: 'tweet is not object'
            }
        }

        if(Array.isArray(tweet)) {
            return {
                err: true,
                message: 'tweet is array'
            }
        };

        if(!tweet.user.screen_name) {
            return {
                err: true,
                message: 'tweeted user is not defined'
            }
        }

        return;
    },
    extractLocationFromTweet: async function(tweet) {
        const validate = this.validateTweetObject(tweet);
        if(validate) {
            return validate;
        }

        const tweetedUser = tweet.user.screen_name;

        if(!strategies.hasOwnProperty(tweetedUser)) {
            const message = `Tweet analyze strategy is not define. checking target user: @' + tweetedUser`;
            return {
                err: true,
                message: message
            };
        }

        const shopData = strategies[tweetedUser].extractLocationFromTweet(tweet);

        const areaKey = await gc.getLeargeAreaKey(shopData.area);
        const shops = await gc.shopSearch(shopData.name, areaKey.areacode_l);
        return shops;
    }
}
