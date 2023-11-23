const admin = require("firebase-admin");

async function createUserInFirebase(data) 
{

    return await admin.auth().createUser({
        email: data.user_email,
        password: data.user_password,
        ...data
    });
}

async function getAllUsersInFirebase() 
{
    const __listAllUsers = async (nextPageToken) => 
    {
        return await admin.auth().listUsers(1000, nextPageToken);
    };
    let users = [];
    let page = await __listAllUsers();
    users = users.concat(page.users);
    while (page.pageToken) 
    {
        page = await __listAllUsers(page.pageToken);
        users = users.concat(page.users);
    }
    return users;
}

async function getUserByIdInFirebase(uid) 
{
    return await admin.auth().getUser(uid);
}

async function getUserByEmailInFirebase(email) 
{
    return await admin.auth().getUserByEmail(email);
}

async function getUserByPhoneNumberInFirebase(phoneNumber) 
{
    return await admin.auth().getUserByPhoneNumber(phoneNumber);
}

async function updateUserInFirebase(uid, data) 
{
    return await admin.auth().updateUser(uid, data);
}

async function dontSeedIfRecordsExistsUsersInFirebase() 
{
    const users = await getAllUsersInFirebase();
    for (const user of users) 
    {
        await deleteUserInFirebase(user.uid);
    }
    return true;
}

async function deleteUserInFirebase(uid) 
{
    return await admin.auth().deleteUser(uid);
}

module.exports = {
    createUserInFirebase,

    getAllUsersInFirebase,

    getUserInFirebase: getUserByIdInFirebase,
    getUserByIdInFirebase,
    getUserByEmailInFirebase,
    getUserByPhoneNumberInFirebase,

    updateUserInFirebase,

    dontSeedIfRecordsExistsUsersInFirebase,
    deleteUserInFirebase,
};