const nodemailer = require('nodemailer');



const transporter = nodemailer.createTransport({
    host: process.env.EMAIL_HOST,
    port: process.env.EMAIL_PORT,
    secure: JSON.parse(process.env.SECURE),
    auth: {
        user: process.env.EMAIL_USER,
        pass: process.env.EMAIL_PASSWORD,
    },
});


const sendMail = async (to, subject, text, html) => {

    if (!to || !subject || (!text && !html)) {
        return { statusCode: 400, message: 'Please provide recipient email, subject, and either text or HTML content.', data: {} };
    }

    const mailOptions = {
        from: process.env.EMAIL_USER,
        to: to,
        subject: subject,
        text: text,
        html: html,
    };

    try {
        const info = await transporter.sendMail(mailOptions);
        console.log('Email sent:', info.messageId);
        return { statusCode: 200, message: 'Email sent successfully.', data: info.messageId }
    } catch (error) {
        console.error('Error sending email:', error);
        return { statusCode: 500, message: 'Error sending email.' + error.message, data: {} };
    }
}

module.exports = sendMail;