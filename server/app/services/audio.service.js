const config = require("config");
const {
    S3Client,
    ListObjectsV2Command,
    DeleteObjectCommand,
    PutObjectCommand
} = require("@aws-sdk/client-s3");
const { getSignedUrl } = require("@aws-sdk/s3-request-presigner");

let s3;
const name = config.get("cloudflare.bucket.name");

async function initS3() 
{

    if (!s3) 
    {
        s3 = new S3Client({
            region: "auto",
            endpoint: config.get("cloudflare.bucket.s3_api_url"),
            credentials: {
                accessKeyId: config.get("cloudflare.bucket.access_key"),
                secretAccessKey: config.get("cloudflare.bucket.secret_key"),
            },
            signatureVersion: "v4",
        });
    }

    return s3;

}

async function listAudio() 
{
    try 
    {
        const s3Client = await initS3();
        const result = await s3Client.send(new ListObjectsV2Command({ Bucket: name }));
        console.log(result);
        return result;
    }
    catch (error) 
    {
        console.error(error);
        throw error;
    }
}

async function uploadAudioUrl(id, expiration = 3600) 
{
    try 
    {
        const s3Client = await initS3();
        const url = await getSignedUrl(s3Client, new PutObjectCommand({ Bucket: name, Key: id}), { expiresIn: expiration });
        return { url, id, expiration };
    }
    catch (error) 
    {
        console.error(error);
        throw error;
    }
}

async function deleteAudioById(id) 
{
    try 
    {
        const s3Client = await initS3();
        return await getSignedUrl(s3Client, new DeleteObjectCommand({ Bucket: name, Key: id}));
    }
    catch (error) 
    {
        console.error(error);
        throw error;
    }
}

module.exports = {
    listAudio,
    uploadAudioUrl,
    deleteAudioById
};