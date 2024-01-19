const express = require('express')
const router = express.Router();
const Employer = require("../models/Employer")
const { body, validationResult } = require("express-validator");
const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');
const fetchUser=require("../middleware/fetchUser");
const Job = require('../models/Job');
const JWT_SECRET = process.env.JWT_SECRET;
const expiresIn = "3h";
router.post("/register", [body("email", "Enter a valid email").isEmail()], async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array });
    }
    try {
        const existingUser = await Employer.findOne({ email: req.body.email });
        if (existingUser) {
            return res.status(400).json({ success: false, error: "Sorry, a user already exists with this email address" });
        }
        const salt = await bcrypt.genSalt(10);
        const secPass = await bcrypt.hash(req.body.password, salt);

        const user = await Employer.create({
            name: req.body.name,
            username: req.body.username,
            email: req.body.email,
            password: secPass,
            companyName: req.body.companyName,
            industry: req.body.industry
        })
        const payload = {
            user: {
                id: user.id,
                role:"employer"
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
            const user = await Employer.findOne({ email });
            if (!user) {
                return res.status(400).json({ success: false, error: "Please try to login with correct credentials" });
            }
            const passwordCompare = await bcrypt.compare(password, user.password);
            if (!passwordCompare) {
                return res.status(400).json({ success: false, error: "Please try to login with correct credentials" });
            }
            const data = {
                user: {
                    id: user.id,
                    role:"employer"
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
        if(req.user.role=="jobseeker"){
            return res.status(401).send({ message: "This is not a Jobseeker route" });
        }
        const userid = req.user.id;
        const user = await Employer.findById(userid).select("-password");
        res.send(user);
        // console.log(user)
        // console.log("in get employer")
    } catch (error) {
        console.error(error.message);
        res.status(500).send("Internal Server error")
    }
});
router.get("/getuser/:id", fetchUser, async (req, res) => {
    try {
        const id = req.params.id;

        if (!id) {
            return res.status(400).json({ success: false, error: "parameter missing" });
        }
        if(req.user.role=="jobseeker"){
            return res.status(401).send({ message: "This is not a Jobseeker route" });
        }
        // console.log(id)
        console.log("entered in fetchEmployer")
        const user = await Employer.findById(id);
        if (!user) {
            return res.status(404).json({ success: false, error: "No employer found" });
        }
        console.log(user._id)
        res.json({ success: true, user});
    } catch (error) {
        console.error(error.message);
        res.status(500).json({ success: false, error: "Internal server error" });
    }
});
// router.get("/getmyposts", fetchUser, async (req, res) => {
//     try {
//         if (!req.user || !req.user.id) {
//             return res.status(401).send({ message: "User not authenticated" });
//         }
//         if(req.user.role=="jobseeker"){
//             return res.status(401).send({ message: "This is not a Jobseeker route" });
//         }
//         const userid = req.user.id;

//         const posts = await Job.find();
//         res.send(user);
//     } catch (error) {
//         console.error(error.message);
//         res.status(500).send("Internal Server error")
//     }
// });






module.exports = router;