/* eslint-disable max-len */

MAIL_TEMPLATE_LAYOUT = `
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
                                    © 2016 Mailgen. All rights reserved.
                                </td>
                            </tr>

                        </table>
                    </td>
                </tr>
            </table>
        </body>
    </html>
`;

module.exports = { MAIL_TEMPLATE_LAYOUT };
