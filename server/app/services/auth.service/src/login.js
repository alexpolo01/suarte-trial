const admin = require("firebase-admin");
const clientApp = require("firebase/app");
const {
    getAuth,
    signInWithCustomToken
} = require("firebase/auth");
const config = require("config");
const axios = require("axios");
const { GenericKaindaExceptions } = require("kainda");

const API_KEY = config.get("firebase.apiKey");

async function createCustomToken(uid, data) 
{
    return await admin.auth().createCustomToken(uid, data);
}

async function logInWithEmailAndPassword(user_email, user_password) 
{
    let response = null;
    try 
    {
        response = await axios.post(
            "https://identitytoolkit.googleapis.com/v1/accounts:signInWithPassword?key=" + API_KEY,
            {
                email: user_email,
                password: user_password,
                returnSecureToken: true,
            }
        );
    }
    catch (error) 
    {
        console.log(error.response.data);
        if (error.response?.data?.error?.message === "INVALID_PASSWORD" || error.response?.data?.error?.message === "EMAIL_NOT_FOUND") 
        {
            throw new GenericKaindaExceptions.Kainda400Exception({
                error_type: "INVALID_CREDENTIALS",
                error_message: "The password is invalid.",
                error_data: {
                    error_code: "INVALID_CREDENTIALS",
                    user_email: user_email,
                    element: "user_password",
                }
            }, 400);
        }
        else if (error.response?.data?.error?.message === "USER_DISABLED") 
        {
            throw new GenericKaindaExceptions.Kainda400Exception({
                error_type: "USER_DISABLED",
                error_message: "The user has been disabled.",
                error_data: {
                    error_code: "USER_DISABLED",
                    user_email: user_email,
                    element: "user_password",
                }
            }, 400);
        }
        else if (error.response?.data?.error?.message?.includes("TOO_MANY_ATTEMPTS_TRY_LATER")) 
        {
            throw new GenericKaindaExceptions.Kainda400Exception({
                error_type: "TOO_MANY_ATTEMPTS_TRY_LATER",
                error_message: "Too many attempts, try again later.",
                error_data: {
                    error_code: "TOO_MANY_ATTEMPTS_TRY_LATER",
                    user_email: user_email,
                    element: "user_password",
                }
            }, 400);
        }
        else 
        {
            throw new GenericKaindaExceptions.Kainda400Exception({
                error_type: "BACKEND_ERROR",
                error_message: "An unknown error has occurred.",
                error_data: {
                    error_code: "BACKEND_ERROR",
                    user_email: user_email,
                    element: "user_password",
                }
            }, 400);
        }
    }

    return response.data;

}

async function generateEmailLogInLink(user_email, actionCodeSettings = {}) 
{
    return await admin.auth().generateSignInWithEmailLink(
        user_email,
        actionCodeSettings
        ?? config.get("firebase.actionCodeSettings")
        ?? {}
    );
}

async function createIdToken(uid, data) 
{
    const fbApp = clientApp.initializeApp(config.get("firebase"));
    const auth = getAuth(fbApp);
    const customToken = await admin.auth().createCustomToken(uid, data);
    return await signInWithCustomToken(auth, customToken);
}

module.exports = {
    createCustomToken,
    logInWithEmailAndPassword,
    generateEmailLogInLink,
    createIdToken,
};