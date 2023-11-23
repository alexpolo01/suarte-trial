const FORGOT_PASSWORD = {
    template: "account/forgot_password.html",
    subject: "Suarte - Password Reset Requested",
    required: [
        "user_name",
        "link"
    ]
};

const PASSWORD_CHANGED = {
    template: "account/password_changed.html",
    subject: "Suarte - Your Password Has Been Successfully Changed",
    required: [
        "user_name",
    ]
};

module.exports = {
    FORGOT_PASSWORD,
    PASSWORD_CHANGED
};