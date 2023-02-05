const passport = require('passport')
const { Strategy } = require('passport-local')

const User = require('../database/models/User')
const {comparePassword} = require('../utils/Hash_utils')

passport.serializeUser((user,done) => {
    done(null,user.id)
})

passport.deserializeUser(async (id,done) => {
    console.log("Deserializing",id)
    try {
        const user = await User.findById(id);
        if (!user) throw new Error("User not found")
        console.log(user);
        done(null,user);
    } catch (err) {
        console.log(err)
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
            const isValid = comparePassword(password,userDB.password)
            console.log(isValid)
            if (isValid) {
                done(null,userDB)
            } else {
                console.log("In Local")
                done(null,null)
            }
        } catch (err) {
            done(err,null)
        }
    })
)
