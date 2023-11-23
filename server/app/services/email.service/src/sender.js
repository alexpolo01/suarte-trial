const LogService = require("@services/log.service");
const EmailTypes = require("./../types");
const nodemailer = require("nodemailer");
const config = require("config");
const path = require("path");
const fs = require("fs");

function delay(ms) 
{
    return new Promise(resolve => setTimeout(resolve, ms));
}

class EmailSender 
{

    static transporter = nodemailer.createTransport({
        pool: config.get("email.pool"),
        maxConnections: config.get("email.maxConnections"),
        host: config.get("email.host"),
        port: config.get("email.port"),
        secure: config.get("email.secure"),
        requireTLS: config.get("email.requireTLS"),
        auth: config.get("email.auth"),
        tls: config.get("email.tls")
    });

    static EmailTypes = EmailTypes;

    static async _waitForIdleTransport() 
    {
        while (!EmailSender.transporter.isIdle()) 
        {
            await delay(50);
        }
    }

    static async sendRaw({ from, to, subject, html }) 
    {
        if (!config.get("email.send")) 
        {
            return false;
        }
        const mailOptions = {
            from: from,
            to: config.get("email.override_to") || to,
            subject: subject,
            html: html
        };

        const retryInterval = config.get("email.retry.interval");
        const retryTimes = config.get("email.retry.times");

        await EmailSender._waitForIdleTransport();

        for (let retry = 0; retry < retryTimes; retry++) 
        {
            try 
            {
                await EmailSender.transporter.sendMail(mailOptions);
                return true;
            }
            catch (err) 
            {
                LogService.ErrorLogger.error(err);
                await delay(retryInterval);
            }
        }

        return false;
    }

    static async send(type, emailOptions, data) 
    {

        const emailType = EmailSender.EmailTypes.get(type);
        if (!emailType) 
        {
            throw new Error(`Email type ${type} not found`);
        }

        let { from, to } = emailOptions;
        let { template, required, subject } = emailType;

        if (!from || !to || !subject) 
        {
            throw new Error(`Missing basic required email options, from: ${from}, to: ${to}, subject: ${subject}`);
        }

        if (!template) 
        {
            throw new Error(`Missing template for email type ${type}`);
        }

        for (const key of required) 
        {
            if (!data[key]) 
            {
                throw new Error(`Missing required data ${key} for email type ${type}`);
            }
        }

        const html = await EmailSender.render(template, data);
        subject = subject.replace(/{{\$([^}]+)}}/g, (match, p1) => data[p1]);
        return await EmailSender.sendRaw({ 
            from, 
            to, 
            subject: data?.subject ?? subject,
            html 
        });

    }

    static async render(template, data) 
    {
        const templatePath = path.join(__dirname, "..", "templates", template);
        let templateContent = fs.readFileSync(templatePath, "utf8");
        for (const key in data) 
        {
            templateContent = templateContent.replaceAll(`{{$${key}}}`, data[key]);
        }
        return templateContent;
    }

}

module.exports = EmailSender;