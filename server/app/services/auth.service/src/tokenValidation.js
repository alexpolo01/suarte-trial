const ExceptionService = require("@services/exception.service");
const { GenericKaindaExceptions } = require("kainda");
const admin = require("firebase-admin");

async function tokenHas(req, res, next, conditions) 
{
    try 
    {
        if(!req.token_decoded) 
        {
            req.token_decoded = req.headers["authorization"];
            req.token_decoded = await __getAndVerifyToken(req);
        }
        const decoded = req.token_decoded;
        for (const condition of conditions) 
        {
            if(!decoded[condition.key] || (condition.value && decoded[condition.key] !== condition.value)) 
            {
                throw GenericKaindaExceptions.Kainda401Exception.fromTemplate();
            }
        }
        next();
    }
    catch (error) 
    {
        ExceptionService.handle(error, res);
    }  
}

async function tokenValid(req, res, next) 
{
    try 
    {
        const decoded = await __getAndVerifyToken(req);
        req.token_decoded = decoded;
        next();
    }
    catch (error) 
    {
        return ExceptionService.handle(error, res);
    }
}

async function tokenOptional(req, res, next) 
{
    try 
    {
        if (!req.headers.authorization) 
        {
            return next();
        }
        // Check if it is a token or an object
        if (req.headers.authorization[0] === "{") 
        {
            req.token_decoded = req.headers["authorization"];
            req.token_decoded = JSON.parse(req.token_decoded);
        }
        else 
        {
            req.token_decoded = await __getAndVerifyToken(req);
        }
        next();
    }
    catch (error) 
    {
        ExceptionService.handle(error, res);
    }
}

async function __getAndVerifyToken(req) 
{

    if (req.token_verified) 
    {
        return req.token_decoded;
    }
    let token = req.headers.authorization;
    if (!token) 
    {
        throw GenericKaindaExceptions.Kainda401Exception.fromTemplate();
    }

    if(token.startsWith("Bearer ")) 
    {
        token = token.slice(7, token.length);
    }
    
    const decoded = await verifyFirebaseAccessToken(token);
    if (!decoded) 
    {
        throw GenericKaindaExceptions.Kainda401Exception.fromTemplate();
    }
    req.token_verified = true;
    req.token_decoded = decoded;
    return decoded;
}

async function verifyFirebaseAccessToken(token) 
{
    try 
    {
        return await admin.auth().verifyIdToken(token);
    }
    catch (error) 
    {
        console.log(error);
        return null;
    }
}

async function isAdmin(req, res, next) 
{
    await tokenHas(req, res, next, [{key: "user_type", value: "admin"}]);
}

async function isGallery(req, res, next) 
{
    await tokenHas(req, res, next, [{key: "user_type", value: "gallery"}]);
}

async function isArtist(req, res, next) 
{
    await tokenHas(req, res, next, [{key: "user_type", value: "artist"}]);
}

async function isCollector(req, res, next) 
{
    await tokenHas(req, res, next, [{key: "user_type", value: "collector"}]);
}

module.exports = {
    tokenHas,
    tokenValid,
    tokenOptional,
    verifyFirebaseAccessToken,
    isAdmin,
    isGallery,
    isArtist,
    isCollector,
};