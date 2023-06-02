const passport = require("passport");
const GoogleStrategy = require("passport-google-oauth20").Strategy;
const { v4: uuidv4 } = require("uuid");
const User = require("../database/models/User");
const AWS = require("aws-sdk");
const fetch = require("node-fetch");
// const fs = require("fs");
require("dotenv").config();

const configS3 = {
  endpoint: process.env.DO_ENDPOINT,
  region: process.env.DO_REGION,
  accessKeyId: process.env.DO_ACCESS_KEY,
  secretAccessKey: process.env.DO_SECRET_ACCESS,
};

AWS.config.update(configS3);
const s3 = new AWS.S3();

const uploadToDO = async (blob) => {
  // we can also use instead of article-images userId but
  // not preffered for this style of app
  const randomness = uuidv4();
  const key = `article-images/${randomness}`;
  await s3.putObject(
    {
      Bucket: "blog-article-images",
      Key: key,
      Body: blob,
      ACL: "public-read",
    },
    (err, data) => {
      err ? console.log("ERROR", err) : console.log("UPLOADED");
    }
  );
  return randomness;
};

passport.serializeUser((user, done) => {
  console.log("Google In serialize", user);
  done(null, user.id);
});

passport.deserializeUser(async (id, done) => {
  console.log("Deserializing in GOOGLE", id);
  try {
    const user = await User.findById(id);
    if (!user) throw new Error("User not found");
    done(null, user);
  } catch (err) {
    done(err, null);
  }
});

passport.use(
  new GoogleStrategy(
    {
      clientID: process.env.GOOGLE_CLIENT,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET,
      callbackURL: "http://localhost:3001/api/auth/google/callback",
    },
    // ON SUCCESFULL AUTH THIS GETS CALLED
    async function (accessToken, refreshToken, profile, cb) {
      // INSERT INTO DB FOR NOW JUST RETURN USER
      console.log("Google AUTH success", profile._json.email);
      let email = profile._json.email;
      let user;
      await User.findOne({ email })
        .then((res) => (user = res))
        .catch((err) => console.log("ERROR", err));
      if (!user) {
        user = await User.create({
          email,
          isGoogle: true,
          profile_picture: profile._json.picture,
        });
        const userID = user._id;
        const res = await fetch(profile._json.picture);
        const blob = await res.buffer();
        const link = await uploadToDO(blob);
        await User.updateOne(
          { id: userID },
          { $set: { profile_picture: link } }
        );
      }
      cb(null, user);
    }
  )
);
