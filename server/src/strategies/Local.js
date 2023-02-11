const passport = require('passport')
const { Strategy } = require('passport-local')
const User = require('../database/models/User')
const {comparePassword} = require('../utils/Hash_utils')


passport.serializeUser((user,done) => {
    console.log("Serializing LOCAL",user)
    if (user.isGoogle) done(null,null)
    done(null,user.id)
})

passport.deserializeUser(async (id,done) => {
    console.log("Deserializing in LOCAL",id)
    try {
        const user = await User.findById(id);
        if (!user) throw new Error("User not found")
        if (user.isGoogle) done('pass')
        done(null,user);
    } catch (err) {
        // console.log(err)
        // done('pass');
        done(err,null);
    }
})

passport.use(
    new Strategy({
        usernameField: 'email'
    },
    async (email,password,done) => {
        try {
            if (!email || !password) throw new Error('Missing credentials');
            const userDB = await User.findOne({email});
            if (!userDB) throw new Error('User not found');
            if (userDB.isGoogle) throw new Error('Sign in with google');
            const isValid = comparePassword(password,userDB.password)
            if (isValid) {
                done(null,userDB)
            } else {
                done(null,null)
            }
        } catch (err) {
            console.log("Missing credentials || Sign in with google")
            done(null,null)
        }
    })
)
