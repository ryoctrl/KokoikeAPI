'use strict';

const fs = require('fs');
const path = require('path');
const basename = path.basename(__filename);
const strategies = {};


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
    extractLocationFromTweet: function(tweet) {
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

        return strategies[tweetedUser].extractLocationFromTweet(tweet);
    }
}
