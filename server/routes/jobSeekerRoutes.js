const express = require('express')
const router = express.Router();
const JobSeeker = require("../models/JobSeeker")
const { body, validationResult } = require("express-validator");
const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');
const fetchUser=require("../middleware/fetchUser")

const JWT_SECRET = "sWARAJ$aNDHALE@20";
const expiresIn = "3h";
router.post("/register", [body("email", "Enter a valid email").isEmail()], async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array });
    }
    try {
        const existingUser = await JobSeeker.findOne({ email: req.body.email });
        if (existingUser) {
            return res.status(400).json({ success: false, error: "Sorry, a user already exists with this email address" });
        }
        const salt = await bcrypt.genSalt(10);
        const secPass = await bcrypt.hash(req.body.password, salt);

        const user = await JobSeeker.create({
            name: req.body.name,
            username: req.body.username,
            email: req.body.email,
            password: secPass,
            skills: req.body.skills,
            education: req.body.education


        })
        const payload = {
            user: {
                id: user.id
            }
        }
        const authtoken = jwt.sign(payload, JWT_SECRET, { expiresIn });
        res.json({ success: true, authtoken });
    } catch (error) {
        return res.status(500).json({ errors: error, msg: "Internal server error" });
    }
});

router.post("/login",
    [body("email", "Enter a Valid email").exists().isEmail(),
    body("password", "Password cannot be blank").exists()],
    async (req, res) => {
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            return res.status(400).json({ success: false, errors: errors.array() });
        }
        const { email, password } = req.body;
        try {
            const user = await JobSeeker.findOne({ email });
            if (!user) {
                return res.status(400).json({ success: false, error: "Please try to login with correct credentials" });
            }
            const passwordCompare = await bcrypt.compare(password, user.password);
            if (!passwordCompare) {
                return res.status(400).json({ success: false, error: "Please try to login with correct credentials" });
            }
            const data = {
                user: {
                    id: user.id
                }
            }
            const authtoken = jwt.sign(data, JWT_SECRET, { expiresIn });

            res.json({ success: true, authtoken });
        } catch (error) {
            console.error(error.message);
            res.status(500).json({ success: false, error: "Internal server error" });
        }
    });
router.get("/getuser", fetchUser, async (req, res) => {
    try {
        if (!req.user || !req.user.id) {
            return res.status(401).send({ message: "User not authenticated" });
        }
        const userid = req.user.id;
        const user = await JobSeeker.findById(userid).select("-password");
        res.send(user);
    } catch (error) {
        console.error(error.message);
        res.status(500).send("Internal Server error")
    }
});





module.exports = router;