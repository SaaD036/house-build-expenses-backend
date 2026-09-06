const { sendMail } = require('./index');
const { replaceVariablesByDynamicValue } = require('../stringUtilities');

const {
    MAIL_TEMPLATE_LAYOUT,
    FORGET_PASSWORD_MAIL_TEMPLATE,
} = require('../../constants/templates/email');

const sendForgetPasswordMail = async (email, firstName, lastName, code) => {
    const body = replaceVariablesByDynamicValue(FORGET_PASSWORD_MAIL_TEMPLATE, {
        firstName,
        lastName,
        code,
    });
    const mailHTML = replaceVariablesByDynamicValue(MAIL_TEMPLATE_LAYOUT, { body });

    await sendMail(email, 'Reset password code', mailHTML);
};

module.exports = {
    sendForgetPasswordMail,
};
