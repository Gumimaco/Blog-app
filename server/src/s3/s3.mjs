const AWS = require('aws-sdk')
import { v4 as uuidv4 } from 'uuid';

const configS3 = {
    endpoint: "blog-article-images",
    region: "fra1",
    accessKeyId: "DO002XAAHTPRLQTF6BVV",
    secretAccessKey: "e2K3bl16Rg/YAGbHAGBs3ej9W0wY6m/L1TVSdAMtW+k",
}

AWS.config.update(configS3);
const s3 = new AWS.S3()

export const uploadToDO = async ({file,userID}) => {
    const key = `${userID}/${uuidv4()}`
    s3.putObject({
        Bucket: "blog-article-images",
        Key: key,
        Body: file.buffer,
        ContentType: file.mimetype
    },(err,data) => {err ? console.log("ERROR") : console.log("SUCCESS",data)})
}