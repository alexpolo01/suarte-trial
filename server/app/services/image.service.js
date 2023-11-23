const axios = require("axios");
const config = require("config");
const FormData = require("form-data");

class ImageService 
{

    static async uploadImageUrl(newId = null) 
    {
        const bodyFormData = new FormData();
        bodyFormData.append("requireSignedURLs", "false");
        //bodyFormData.append("expiry", new Date(Date.now() + 36000).toISOString());
        if (newId) 
        {
            if(process.env.NODE_ENV !== "production") 
            {
                newId = process.env.NODE_ENV + "_" + newId;
            }
            bodyFormData.append("id", newId);
        }
        const options = {
            method: "POST",
            url: `https://api.cloudflare.com/client/v4/accounts/${config.get("cloudflare.images.account_id")}/images/v2/direct_upload`,
            headers: {
                "Content-Type": `multipart/form-data; boundary=${bodyFormData._boundary}`,
                "x-auth-key": `${config.get("cloudflare.images.api_key")}`,
                "x-auth-email": `${config.get("cloudflare.images.api_email")}`,
            },
            data: bodyFormData
        };

        try 
        {
            const response = await axios.request(options);
            return response.data;
        }
        catch (error) 
        {
            console.error(error);
        }
    }

    static async deleteImageCloudflare(image_id) 
    {
        const options = {
            method: "DELETE",
            url: `https://api.cloudflare.com/client/v4/accounts/${config.get("cloudflare.images.account_id")}/images/v1/${image_id}`,
            headers: {
                "x-auth-key": `${config.get("cloudflare.images.api_key")}`,
                "x-auth-email": `${config.get("cloudflare.images.api_email")}`,
            }
        };
        const response = await axios.request(options);
        return response.data.success;
    }

}

module.exports = ImageService;