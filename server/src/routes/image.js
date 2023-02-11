const multer = require('multer')
const {Router} = require("express")
const AWS = require('aws-sdk')
const { v4: uuidv4 } = require('uuid');

const configS3 = {
    endpoint: "fra1.digitaloceanspaces.com",
    region: "fra1",
    accessKeyId: "DO002XAAHTPRLQTF6BVV",
    secretAccessKey: "e2K3bl16Rg/YAGbHAGBs3ej9W0wY6m/L1TVSdAMtW+k",
}

AWS.config.update(configS3);
const s3 = new AWS.S3()

const uploadToDO = async ({file,userId}) => {
    // we can also use instead of article-images userId but
    // not preffered for this style of app
    const key = `article-images/${uuidv4()}`
    await s3.putObject({
        Bucket: "blog-article-images",
        Key: key,
        Body: file.buffer,
        ACL: 'public-read',
        ContentType: file.mimetype
    },(err,data) => {err ? console.log("ERROR",err) : console.log("UPLOADED")})
    const url = await s3.getSignedUrl("getObject",{
        Bucket: "blog-article-images",
        Key: key
    })
    return url
}
const is_authenticated = (req,res,next) => {
    if (req.user) next()
    else res.sendStatus(401)
}

const storage = multer.memoryStorage()
const upload = multer({storage})

const router = Router()

router.post('/upload',is_authenticated,upload.single("image"), async (req,res) => {
    const {file, user} = req;
    let userId = user.id
    if (!file || !userId) res.sendStatus(400);
    const url = await uploadToDO({file,userId})
    res.send(url)
})

module.exports = router