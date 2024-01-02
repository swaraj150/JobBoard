const express = require('express')
const router = express.Router();
const nodemailer = require('nodemailer');
const fetchUser = require('../middleware/fetchUser');
const Employer = require('../models/Employer');
const JobSeeker = require('../models/JobSeeker');
router.post("/send-mail", async (req, res) => {
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
        res.send({ success: true, msg: "email sent" })

    } catch (error) {
        console.error(error);
        res.status(500).send('Internal Server Error');
    }
})

router.get("/getrole", fetchUser, async (req, res) => {
    try {
        if (!req.user || !req.user.id) {
            return res.status(401).send({ message: "User not authenticated", success: false });
        }
        if(req.user.role=="jobseeker"){
            const existingUser = await JobSeeker.findById(req.user.id);
            if (!existingUser) {
                return res.status(404).send({ message: "User not found", success: false });
            }
        }
        else if(req.user.role=="employer"){
            const existingUser = await Employer.findById(req.user.id);
            if (!existingUser) {
                return res.status(404).send({ message: "User not found", success: false });
            }

        }
        res.status(200).send({ role: req.user.role, success: true });
    }
    catch (error) {
        console.error(error);
        res.status(500).send('Internal Server Error');
    }
})
module.exports = router;