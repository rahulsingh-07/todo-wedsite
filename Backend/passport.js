const passport = require('passport');
const LocalStrategy = require('passport-local').Strategy;
const GoogleStrategy = require('passport-google-oauth20').Strategy;
const User = require('./models/user');

passport.use(new LocalStrategy({
    usernameField: 'email',
    passReqToCallback: true // Pass the request to the callback
}, async (req, email, password, done) => {
    try {
        const userExist = await User.findOne({ email });
        console.log(userExist);

        if (!userExist) {
            return done(null, false, { message: "Invalid User" });
        }

        const isMatch = await userExist.comparePassword(password);

        if (isMatch) {
            const token = await userExist.generateToken();
            return done(null, userExist, { message: "Login Successful", token: token });
        } else {
            return done(null, false, { message: "Invalid email or password" });
        }

    } catch (err) {
        return done(err);
    }
}));

passport.use(new GoogleStrategy({
    clientID: process.env.CLIENT_ID,
    clientSecret: process.env.CLIENT_SECRET,
    callbackURL: `${process.env.CLIENT_URL}/google/callback`
}, async (token, tokenSecret, profile, done) => {
    try {
        const existingUser = await User.findOne({ email: profile.emails[0].value });
        if (existingUser) {
            return done(null, existingUser);
        } else {
            const newUser = new User({
                name: profile.displayName,
                email: profile.emails[0].value,
                password: token  // Note: storing OAuth token as password is not a good practice
            });
            await newUser.save();
            return done(null, newUser);
        }
    } catch (err) {
        return done(err);
    }
}));

passport.serializeUser((user, done) => {
    done(null, user.id);
});

passport.deserializeUser(async (id, done) => {
    try {
        const user = await User.findById(id);
        done(null, user);
    } catch (err) {
        done(err);
    }
});

module.exports = passport;
