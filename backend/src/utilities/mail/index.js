const nodemailer = require('nodemailer');
require('dotenv').config();

const transporter = nodemailer.createTransport({
    service: 'gmail',
    auth: {
        user: process.env.MAIL,
        pass: process.env.APP_PASSWORD,
    },
});

const sendMail = async (toMail, subject, body) => {
    await transporter.sendMail({
        from: process.env.MAIL,
        to: toMail,
        subject,
        html: body,
    });
};

module.exports = {
    sendMail,
};
