/* eslint-disable max-len */

const MAIL_TEMPLATE_LAYOUT = `
    <!DOCTYPE html>
    <html>
        <head>
            <meta charset="UTF-8" />
        </head>

        <body style="margin:0; padding:0; background-color:#f7f7f7;">
            <table width="100%" cellpadding="0" cellspacing="0">
                <tr>
                    <td align="center" style="padding:40px 0;">

                        <!-- Container -->
                        <table
                            width="600"
                            cellpadding="0"
                            cellspacing="0"
                            style="
                                background:#ffffff;
                                border:1px solid #158901;
                                font-family:Arial,
                                Helvetica, sans-serif;
                                color:#333333;
                            "
                        >

                            <!-- Header -->
                            <tr>
                                <td
                                    style="
                                        color:#ffffff;
                                        background:#158901;
                                        padding:15px 20px;
                                        font-size:25px;
                                        font-weight:bold;
                                    "
                                >
                                    HBE
                                </td>
                            </tr>
                            {body}
                            <!-- Footer -->
                            <tr>
                                <td align="center" style="padding:20px; font-size:13px; color:#999999; background:#f7f7f7;">
                                    © SaaD. All rights reserved.
                                </td>
                            </tr>

                        </table>
                    </td>
                </tr>
            </table>
        </body>
    </html>
`;

const FORGET_PASSWORD_MAIL_TEMPLATE = `
<tr>
    <td align="center" style="padding:30px 40px;">

        <h2 style="margin:0 0 15px; font-size:22px; font-weight:600;">
            Hi, {firstName} {lastName}
        </h2>

        <p style="margin:0 0 20px; font-size:15px; color:#555555;">
            Please use the following code to reset your password
        </p>

        <!-- Button -->
        <table cellpadding="0" cellspacing="0">
            <tr>
                <td align="center">
                    <a
                        style="
                            display:inline-block;
                            padding:10px 28px;
                            background-color:#158901;
                            color:#ffffff;
                            text-decoration:none;
                            font-size:15px;
                            font-weight:600;
                            border-radius:4px;
                        "
                    >
                        {code}
                    </a>
                </td>
            </tr>
        </table>
    </td>
</tr>
`;

module.exports = { MAIL_TEMPLATE_LAYOUT, FORGET_PASSWORD_MAIL_TEMPLATE };
