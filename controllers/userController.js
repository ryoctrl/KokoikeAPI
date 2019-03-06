const models = require('../models');
const ac = require('./authController');
const crypto = require('../lib/crypto');

module.exports = {
    twitterAuth: async function(token, tokenSecret, profile, done) {
        const q = {
            where: {
                twitter_id: profile.id
            }
        };

        let user = await models.users.findOne(q);

        if(user) {
            return done(null, user);
        }

        const newUser = {
            twitter_id: profile.id,
            display_name: profile.displayName,
            screen_name: profile.username,
            icon_url: profile.photos[0].value || null,
            provider: profile.provider
        };

        if(newUser.icon_url) {
            newUser.icon_url = newUser.icon_url.replace('normal', 'bigger');

        }

        user = await models.users.create(newUser).catch((err) => {
            console.log(err);
            return null;
        });

        if(!user) {
            return done(null);
        }

        const newSecret = {
            user_id: user.id,
            twitter_access_token: crypto.encryption(token),
            twitter_access_secret: crypto.encryption(tokenSecret)
        };

        models.user_privates.create(newSecret);


        //メールアドレスが必要であればこれを使う 
        //let email = profile.emails && profile.emails.length > 0 ? profile.emails[0].value : 'NoMail';
        return done(null, user);
    },
    userSerialize: async function(user, done) {
        //let uid = user.id;
        //done(null, uid);
        done(null, user);
    },
    userDeserialize: async function(id, done) {
        console.log('user deserializing');
        console.log(id);
        /*
        let query = {
            where: {
                id: id
            }
        };
        let user = await models.users.findOne(query);
        */
        done(null, user);
    },
    findOneById: async function(uid) {
        let query = {
            where: {
                name: uid
            }
        };
        return await models.users.findOne(query);
    },
    findOneByEmail: async function(email) {
        let query = {
            where: {
                email: email
            }
        };
        return await models.users.findOne(query);

    },
};

