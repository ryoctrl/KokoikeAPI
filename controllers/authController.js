const passport = require('passport');
const TwitterStrategy = require('passport-twitter').Strategy;
const uc = require('./userController');
const bcrypt = require('bcrypt');

module.exports = { 
    initialize: function(app) {
        this.app = app;
        this.authSettings = JSON.parse(process.env.AUTH);

        app.use(passport.initialize());
        app.use(passport.session());
        passport.serializeUser(uc.userSerialize);
        passport.deserializeUser(uc.userDeserialize);

        this.twitterActivate();
    },
    twitterActivate: function() {
        if(!this.authSettings.twitter.active) {
            console.log('Twitter Auth is not activated');
            return;
        }
        let consumerKey = this.authSettings.twitter.CONSUMER_KEY;
        let consumerSecret = this.authSettings.twitter.CONSUMER_SECRET;
        let callbackURL = process.env.USE_SSL ? 'https' : 'http';
        callbackURL += '://';
        callbackURL += process.env.HOST_NAME;
        callbackURL += callbackURL.endsWith('/') ? '' : '/';
        callbackURL += 'auth/twitter/callback';
        passport.use(new TwitterStrategy({
            consumerKey: consumerKey,
            consumerSecret: consumerSecret,
            callbackURL: callbackURL
        }, uc.twitterAuth));

        this.app.get('/auth/twitter', passport.authenticate('twitter'));
        this.app.get('/auth/twitter/callback', passport.authenticate('twitter'), async function(req, res) {
            const user = req.session.passport.user;
            const privateData = await user.getPrivate();
            console.log('privateData is below!');
            console.log(privateData);
            const userDatas = user.dataValues;
            console.log(privateData['token']);
            userDatas['token'] = privateData['token'];
            console.log(userDatas);

            res.json(userDatas);
        });
        console.log('Twitter Auth is activated');
    },
    tokenAuth: [
        /*
        async function(req, res, next) {
            const token = req.headers.authorization;
            console.log(token);
            let user = await uc.findOneByToken(token, true);
            if(!user) {
                res.status(403);
                res.json({
                    err: true,
                    message: 'User not authed'
                });
                return;
            }
            req.authedUser = user;
            next();
        },
        function(req, res, next) {
            const user = req.authedUser;
            const message = `${user.screen_name} accessed to ${req.originalUrl}`;
            console.log(message);
            next();
        }
        */
    ],
    checkPassword: bcrypt.compare,
}
