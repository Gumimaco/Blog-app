const {Router} = require("express")
const passport = require('passport')
const User = require('../database/models/User')
const {hashPassword} = require('../utils/Hash_utils')

const router = Router()

router.post('/login',passport.authenticate('local'),(req,res) => {
    console.log("Login user",req.user);
    if (!req.user) {
        console.log("Unathorized")
    }
    res.send(200);
})

router.post('/register',async (req,res) => {
    const { email } = req.body;
    console.log("EMAIL,PASS: ",email,req.body.password)
    const userDB = await User.findOne({email});
    if (userDB) {
        console.log("Exists")
        res.status(400).send("Already exists");
    } else {
        const password = hashPassword(req.body.password);
        // creates the new user
        const newUser = await User.create({email,password});
        res.sendStatus(201)
    }
})


router.get('/google', passport.authenticate('google', { scope: ['email','profile'] }));

router.get('/google/callback', 
  passport.authenticate('google', { failureRedirect: '/login' }),
  function(req, res) {
    // Successful authentication, redirect home.
    console.log("Success redirecting to home_PAGE")
    res.redirect('http://localhost:3000');
});

router.get("/getUser",(req,res) => {
    // here check some logic if he exists or not and retrieve relevant info we need
    res.send(req.user);
})

router.delete("/logout",(req,res) => {
    console.log("Logging out")
    if (req.user) {
        req.logout((err) => {
            return err;
        });
        // res.sendStatus(200);
    }
})

module.exports = router