const Notification = require("@entities/notification/model");

Notification.Controller = require("@entities/notification/controllers");
Notification.Routes = require("@entities/notification/routes");

Notification.create_required_keys = [
    "notification_receiver",
    "notification_sender",
    "notification_data",
];

module.exports = Notification;