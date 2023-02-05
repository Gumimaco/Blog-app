const passport = require('passport')
const GoogleStrategy = require('passport-google-oauth20').Strategy;
const G_User = require('../database/models/G_User')
require('dotenv').config()

passport.serializeUser((user,done) => {
    console.log("In serialize",user)
    done(null,user.id)
})

passport.deserializeUser(async (id,done) => {
    console.log("Deserializing in GOOGLE",id)
    try {
        const user = await G_User.findById(id);
        if (!user) throw new Error("User not found")
        console.log(user);
        done(null,user);
    } catch (err) {
        console.log(err)
        done(err,null);
    }
})

passport.use(new GoogleStrategy({
    clientID: process.env.GOOGLE_CLIENT,
    clientSecret: process.env.GOOGLE_CLIENT_SECRET,
    callbackURL: "http://localhost:3001/api/auth/google/callback"
    },
    // ON SUCCESFULL AUTH THIS GETS CALLED
    async function(accessToken, refreshToken, profile, cb) {
        // INSERT INTO DB FOR NOW JUST RETURN USER
        console.log("Google AUTH success",profile._json.email)
        let email = profile._json.email
        let user;
        await G_User.findOne({email})
        .then(res => user = res)
        .catch(err => console.log("ERROR",err))
        if (!user) {
            user = await G_User.create({email})
        }
        console.log(user)
        // WE ARE SERIALIZING ID LATER UP THERE
        cb(null,user);
    }
));