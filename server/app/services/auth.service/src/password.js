const { getAuth, verifyPasswordResetCode, confirmPasswordReset } = require("firebase/auth");
const { initializeApp } = require("firebase/app");
const admin = require("firebase-admin");
const config = require("config");

const app = initializeApp(config.get("firebase"));

async function getPasswordResetLinkFromFirebase(user_email, user_id) 
{
    const base_url = process.env.NODE_ENV === "production" ? "https://suarte.art" : "http://localhost:3000";
    const actionCodeSettings = {
        url: `${base_url}/reset-password?uid=${user_id}`,
    };
    const link = await admin.auth().generatePasswordResetLink(user_email, actionCodeSettings);
    const url = new URL(link);
    const oobCode = url.searchParams.get("oobCode");
    const link_url = `${base_url}/reset-password?oobCode=${oobCode}&uid=${user_id}`;
    return link_url;
}

async function resetPasswordInFirebase(oobCode, newPassword) 
{
    const auth = getAuth(app);
    await verifyPasswordResetCode(auth, oobCode);
    await confirmPasswordReset(auth, oobCode, newPassword);
    return true;
}

module.exports = {
    getPasswordResetLinkFromFirebase,
    resetPasswordInFirebase
};