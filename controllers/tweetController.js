const Twitter = require('twitter');
const twitterCredential = {
    consumer_key: process.env.ADMIN_TWITTER_CONSUMER_KEY,
    consumer_secret: process.env.ADMIN_TWITTER_CONSUMER_SECRET,
    access_token_key: process.env.ADMIN_ACCESS_TOKEN,
    access_token_secret: process.env.ADMIN_ACCESS_TOKEN_SECRET
}
//const client = new Twitter(twitterCredential);

const strategy = require('../strategy');

module.exports = {
    getTweet: async function(id, userCredential) {
        if(!id) {
            return;
        }

        const params = {
            id: id
        };
        twitterCredential.access_token_key = userCredential.twitter_access_token;
        twitterCredential.access_token_secret = userCredential.twitter_access_secret;
        const client = new Twitter(twitterCredential);
        return await client.get('statuses/lookup', params).catch((err) => {
            console.error(err);
            return err;
        });
    },
    getLocationByTweet: async function(id, userCredential) {
        let tweet = await this.getTweet(id, userCredential);
        if(tweet == null || tweet.length != 1) {
            return;
        }

        tweet = tweet[0];

        const results = await strategy.extractLocationFromTweet(tweet);
        return results;
    },
};
