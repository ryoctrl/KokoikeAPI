const Twitter = require('twitter');
const client = new Twitter({
    consumer_key: process.env.ADMIN_TWITTER_CONSUMER_KEY,
    consumer_secret: process.env.ADMIN_TWITTER_CONSUMER_SECRET,
    access_token_key: process.env.ADMIN_ACCESS_TOKEN,
    access_token_secret: process.env.ADMIN_ACCESS_TOKEN_SECRET
});

module.exports = {
    getTweet: async function(id) {
        if(!id) {
            return;
        }

        const params = {
            id: id
        };
        return await client.get('statuses/lookup', params).catch((err) => {
            console.error(err);
            return err;
        });
    },
    getLocationFromTweet: async function(id) {
        const tweet = this.getTweeet(id);
        if(tweet == null || tweet.length != 1) {
            return;
        }



    },
};
