const { sendMail } = require('./index');

const {
    MAIL_TEMPLATE_LAYOUT,
    FORGET_PASSWORD_MAIL_TEMPLATE,
} = require('../../constants/templates/email');

const sendForgetPasswordMail = async (email, firstName, lastName, code) => {
    const body = FORGET_PASSWORD_MAIL_TEMPLATE.replaceAll('{code}', code)
        .replaceAll('{firstName}', firstName)
        .replaceAll('{lastName}', lastName);
    const mailHTML = MAIL_TEMPLATE_LAYOUT.replaceAll('{body}', body);

    await sendMail(email, 'Reset password code', mailHTML);
};

module.exports = {
    sendForgetPasswordMail,
};
