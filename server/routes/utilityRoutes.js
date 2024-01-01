const express = require('express')
const router = express.Router();
const nodemailer = require('nodemailer');
router.post("/send-mail",async (req, res) => {
    try {
        const { to, subject, body } = req.body;
        const transporter = nodemailer.createTransport({
            service: 'gmail',
            auth: {
                user: 'andhaleswaraj6@gmail.com',  // Replace with your Gmail email
                pass: 'gxpa hhgm geze wbxs'         // Replace with your Gmail password
            }
        });
        const mailOptions = {
            from: "andhaleswaraj6@gmail.com",   // Replace with your Gmail email
            to: to,          // Replace with the recipient's email
            subject: subject,
            text: body
        };
        transporter.sendMail(mailOptions, (error, info) => {
            if (error) {
                console.error('Error sending email:', error);
            } else {
                console.log('Email sent:', info.response);
            }
        });
        res.send({success:true,msg:"email sent"})

    } catch (error) {
        console.error(error);
        res.status(500).send('Internal Server Error');
    }
})
module.exports = router;