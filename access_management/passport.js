const passport = require("passport");
const GoogleStrategy = require("passport-google-oauth20").Strategy;
const mongoose = require("mongoose");
const { clientID, clientSecret } = require("../config");

const User = mongoose.model("users");

passport.serializeUser((user, done) => {
  done(null, user.id);
});

passport.deserializeUser((id, done) => {
  User.findById(id).then((user) => {
    done(null, user);
  });
});

passport.use(
  new GoogleStrategy(
    {
      clientID: clientID,
      clientSecret: clientSecret,
      callbackURL: "/google/callback",
    },
    async (accessToken, refreshToken, profile, done) => {
      const existingUser = await User.findOne({
        ID: profile.id,
      });
      if (existingUser) {
        return done(null, existingUser);
      }
      const user = await new User({
        ID: profile.id,
        email: profile.emails[0].value,
        picture: profile.photos[0].value,
        firstName: profile.name.givenName,
        lastName: profile.name.familyName,
      }).save();
      done(null, user);
    }
  )
);
