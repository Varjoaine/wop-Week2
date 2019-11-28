'use strict';
const passport = require('passport');
const Strategy = require('passport-local').Strategy;
const userModel = require('../models/userModel');


// local strategy for username password login
passport.use(new Strategy(
    async (username, password, done) => {
      const params = [username, password];
      try {
        const [user] = await userModel.getUserLogin(params);
        console.log('Local strategy', user); // result is binary row
        if (user === undefined) {
          return done(null, false, {message: 'Incorrect email or password.'});
        }
        return done(null, {...user}, {message: 'Logged In Successfully'}); // use spread syntax to create shallow copy to get rid of binary row type
      } catch (err) {
        return done(err);
      }
    }));


// TODO: JWT strategy for handling bearer token
const passportJWT = require("passport-jwt");
const JWTStrategy   = passportJWT.Strategy;
const ExtractJWT = passportJWT.ExtractJwt;

passport.use(new JWTStrategy({
    jwtFromRequest: ExtractJWT.fromAuthHeaderAsBearerToken(), //hakee jsonwebtokenin bearertokenille
    secretOrKey   : 'wskp2019'
},
    (jwtPayload, done) => {

    //find the user in db if needed. This functionality may be omitted if you store everything you'll need in JWT payload.
    return UserModel.getUSer(jwtPayload.id)
        .then(user => {
            return done(null, {...user[0]}); //... sisälle haetaan kaikki user objektin arvot
        })
        .catch(err => {
            return done(err);
        });
}
));


module.exports = passport;