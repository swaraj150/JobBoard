const express = require('express')
const router = express.Router();
const JobSeeker = require("../models/JobSeeker")
const Job = require("../models/Job")
const { body, validationResult } = require("express-validator");
const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');
const fetchUser = require("../middleware/fetchUser");
const Employer = require('../models/Employer');


const JWT_SECRET = process.env.JWT_SECRET;
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
            education: req.body.education,
            applications: []


        })
        const payload = {
            user: {
                id: user.id,
                role: "jobseeker"
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
                    id: user.id,
                    role: "jobseeker"
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
        if (req.user.role == "employer") {
            return res.status(401).send({ message: "This is not an employer route", success: false });
        }
        const userid = req.user.id;
        const user = await JobSeeker.findById(userid).select("-password");
        res.send(user);
    } catch (error) {
        console.error(error.message);
        res.status(500).send("Internal Server error")
    }
});

router.put("/add-application", fetchUser, async (req, res) => {
    try {
        if (!req.user || !req.user.id) {
            return res.status(401).send({ message: "User not authenticated", success: false });
        }
        if (req.user.role == "employer") {
            return res.status(401).send({ message: "This is not an employer route", success: false });
        }
        const { jobId } = req.body;
        if (!jobId) {
            return res.status(401).send({ message: "no application data found", success: false });
        }
        const existingUser = await JobSeeker.findById(req.user.id);
        const post = await Job.findById(jobId);

        if (!existingUser) {
            return res.status(404).send({ message: "User not found", success: false });
        }
        if (!post) {
            return res.status(404).send({ message: "post not found", success: false });
        }

        const applications = new Set(existingUser.applications);
        applications.add(jobId);
        const applicants = new Set(post.applicants);
        applicants.add({applicant:req.user.id,status:"pending"});
        await JobSeeker.findByIdAndUpdate(req.user.id, { $set: { applications: Array.from(applications) } }, { new: true });
        await Job.findByIdAndUpdate(jobId, { $set: { applicants: Array.from(applicants) } }, { new: true });
        res.send({ message: "applications updated", success: true })

    } catch (error) {
        console.error(error.message);
        res.status(500).send("Internal Server error")
    }
})


router.get("/getapplication", fetchUser, async (req, res) => {
    try {
        if (!req.user || !req.user.id) {
            return res.status(401).send({ message: "User not authenticated" });
        }
        if (req.user.role == "employer") {
            return res.status(401).send({ message: "This is not an employer route", success: false });
        }
        const existingUser = await JobSeeker.findById(req.user.id);

        if (!existingUser) {
            return res.status(404).send({ message: "User not found" });
        }
        console.log("entered in getApplication")
        const { jobId } = req.query;

        if (!jobId) {
            return res.status(400).json({ success: false, error: "Job ID not provided" });
        }

        const applications = existingUser.applications;
        if (applications.length === 0 || !applications.includes(jobId)) {
            return res.status(404).json({ success: false, error: "No application found" });
        }
        console.log(applications);
        const job = await Job.findById(jobId);

        res.json({ success: true, application: job });


    } catch (error) {
        console.error(error.message);
        res.status(500).send("Internal Server error");
    }
});

router.get("/applications", fetchUser, async (req, res) => {
    try{
        if (!req.user || !req.user.id) {
        return res.status(401).send({ message: "User not authenticated", success: false });
        }
        if (req.user.role == "employer") {
            return res.status(401).send({ message: "This is not an employer route", success: false });
        }
        const existingUser = await JobSeeker.findById(req.user.id);
        if (!existingUser) {
            return res.status(404).send({ message: "User not found", success: false });
        }
        const applications = existingUser.applications;
        const detailedApplications = await Promise.all(applications.map(async (applicationId) => {
            const application = await Job.findById(applicationId);
            const employer=await Employer.findById(application.employer);
            return {application,employer};
        }));
        res.json({ success: true, applications: detailedApplications });
    }
    catch (error) {
        console.error(error.message);
        res.status(500).send("Internal Server error");
    }

});

router.get("/getsaved",fetchUser,async(req,res)=>{
    try{
        if (!req.user || !req.user.id) {
            return res.status(401).send({ message: "User not authenticated", success: false });
        }
        if (req.user.role == "employer") {
            return res.status(401).send({ message: "This is not an employer route", success: false });
        }
        const existingUser = await JobSeeker.findById(req.user.id);
        if (!existingUser) {
            return res.status(404).send({ message: "User not found", success: false });
        }
        const posts = existingUser.savedPosts;
        const detailedPosts=await Promise.all(posts.map(async(postId)=>{
            const post=await Job.findById(postId);
            const employer=await Employer.findById(post.employer);
            return {post,employer};
        }));
        res.json({success:true,saved:detailedPosts});
    }
    catch(error){
        console.error(error.message);
        res.status(500).send("Internal Server error");
    }
});


router.put("/saveposts",fetchUser,async(req,res)=>{
    try {
        if (!req.user || !req.user.id) {
            return res.status(401).send({ message: "User not authenticated", success: false });
        }
        if (req.user.role == "employer") {
            return res.status(401).send({ message: "This is not an employer route", success: false });
        }
        const { jobId } = req.body;
        if (!jobId) {
            return res.status(401).send({ message: "post id not found", success: false });
        }
        const existingUser = await JobSeeker.findById(req.user.id);
        const post = await Job.findById(jobId);

        if (!existingUser) {
            return res.status(404).send({ message: "User not found", success: false });
        }
        if (!post) {
            return res.status(404).send({ message: "post not found", success: false });
        }

        const saved = new Set(existingUser.savedPosts);
        saved.add(jobId);
        await JobSeeker.findByIdAndUpdate(req.user.id, { $set: { savedPosts: Array.from(saved) } }, { new: true });
        res.send({ message: "Post saved successfully", success: true })

    } catch (error) {
        console.error(error.message);
        res.status(500).send("Internal Server error");
    }
});
module.exports = router;