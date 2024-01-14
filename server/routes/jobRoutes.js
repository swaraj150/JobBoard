const express = require('express')
const router = express.Router();
const Employer = require("../models/Employer")
const Job = require("../models/Job")
const JobSeeker = require("../models/JobSeeker")
const { body, validationResult } = require("express-validator");
const bcrypt = require('bcryptjs');
const fetchUser = require("../middleware/fetchUser")

router.post("/create", fetchUser, async (req, res) => {
    try {
        if (!req.user || !req.user.id) {
            return res.status(401).send({ success: false, message: "User not authenticated" });
        }
        if (req.user.role == "jobseeker") {
            return res.status(401).send({ message: "This is not an jobseeker route", success: false });
        }
        const userid = req.user.id;
        const user = await Employer.findById(userid).select("-password");
        if (!user) {
            return res.status(401).send({ success: false, message: "User does not exist" });
        }
        const jobPost = await Job.create({
            employer: req.user.id,
            title: req.body.title,
            description: req.body.description,
            requirements: req.body.requirements,
            skills_required: req.body.skills_required,
            openings: req.body.openings,
            income: req.body.income,
            location: req.body.location
        })
        res.status(200).json({ success: true, msg: "post created!" })


    } catch (error) {
        return res.status(500).json({ success: false, error: "internal server error" });
    }
});


router.get("/getpost/:id", fetchUser, async (req, res) => {
    try {
        const id = req.params.id;

        if (!id) {
            return res.status(400).json({ success: false, error: "parameter missing" });
        }
        if (!req.user || !req.user.id) {
            return res.status(401).send({ message: "User not authenticated" });
        }

        const existingUser1 = await JobSeeker.findById(req.user.id);
        const existingUser2 = await Employer.findById(req.user.id);
        if (!existingUser1 && !existingUser2) {
            return res.status(404).send({ message: "User not found", success: false });
        }

        console.log(id)
        const job = await Job.findById(id);
        if (!job) {
            return res.status(404).json({ success: false, error: "No post found" });
        }
        const employerObj = await Employer.findById(job.employer);
        // console.log(employerObj)
        const post = { ...job.toObject(), employerObj: employerObj };
        res.json({ success: true, post });
    } catch (error) {
        console.error(error.message);
        res.status(500).json({ success: false, error: "Internal server error" });
    }
});
router.get("/getallpost", async (req, res) => {
    try {
        const post = await Job.find();
        if (!post) {
            return res.status(400).json({ success: false, error: "post not found" });
        }
        res.json(post)
    } catch (error) {
        console.error(error.message);
        res.status(500).json({ success: false, error: "Internal server error" });
    }
});
router.get("/getuserpost", fetchUser, async (req, res) => {
    try {
        const post = await Job.find({ employer: req.user.id });
        if (req.user.role == "jobseeker") {
            return res.status(401).send({ message: "This is not an jobseeker route", success: false });
        }
        if (!post) {
            return res.status(400).json({ success: false, error: "post not found" });
        }
        const post1=[];

        for(const p of post){
            const candidates=[];
            const applicants = p.applicants;
            for(const applicant of applicants){
                const user=await JobSeeker.findById(applicant.applicant);
                // console.log("applicant ",user)
                const user1 = { ...user.toObject(), status:applicant.status };
                candidates.push(user1);
            }
    
            // console.log(employerObj)
            const p1 = { ...p.toObject(), candidates: candidates };
            post1.push(p1);
            
        }
        
        res.json(post1)
    } catch (error) {
        console.error(error.message);
        res.status(500).json({ success: false, error: "Internal server error" });
    }
});
// router.put("/update-status", fetchUser, async (req, res) => {
//     try {
//         const {status,j_id,p_id}=req.body;
//         const post = await Job.findById(p_id);
//         console.log("entered in update status")
//         if (req.user.role == "jobseeker") {
//             return res.status(401).send({ message: "This is not an jobseeker route", success: false });
//         }
//         if (!post) {
//             return res.status(400).json({ success: false, error: "post not found" });
//         }

//         const applicants = post.applicants.map(applicant => {
//             if (applicant.applicant.toString() === j_id) {
//                 return { ...applicant.toObject(), status }; // Update the status
//             }
//             return applicant;
//         });

//         post.applicants = applicants;

//         await post.save();
//         res.send({success:true,msg:"updated succesfully"});
//     } catch (error) {
//         console.error(error.message);
//         res.status(500).json({ success: false, error: "Internal server error" });
//     }
// });
router.put("/update-status", fetchUser, async (req, res) => {
    try {
        const { status, j_id, p_id } = req.body;
        console.log("entered in update status");

        if (req.user.role == "jobseeker") {
            return res.status(401).send({ message: "This is not a jobseeker route", success: false });
        }

        const updatedPost = await Job.findByIdAndUpdate(
            p_id,
            { $set: { "applicants.$[elem].status": status } },
            { arrayFilters: [{ "elem.applicant": j_id }] }
        );

        if (!updatedPost) {
            return res.status(400).json({ success: false, error: "Post not found" });
        }

        res.send({ success: true, msg: "Updated successfully" });
    } catch (error) {
        console.error(error.message);
        res.status(500).json({ success: false, error: "Internal server error" });
    }
});
router.get(`/search`, async (req, res) => {
    try {


        const { skills_required, companyName, industry, location, title } = req.query;

        let query = {};

        if (skills_required) {
            query.skills_required = { $in: skills_required.split(",").map(skill => new RegExp(skill, 'i')) };
        }

        if (companyName) {
            const employersWithCompany = await Employer.find({ companyName: { $regex: new RegExp(companyName, 'i') } });
            const employerIds = employersWithCompany.map(employer => employer._id);
            query.employer = { $in: employerIds };
        }

        if (industry) {
            const employersWithIndustry = await Employer.find({ industry: { $regex: new RegExp(industry, 'i') } });
            const employerIds = employersWithIndustry.map(employer => employer._id);
            query.employer = { $in: employerIds };
        }

        if (location) {
            query.location = { $regex: new RegExp(location, 'i') };
        }

        if (title) {
            query.title = { $regex: new RegExp(title, 'i') };
        }

        const jobs = await Job.find(query);

        if (!jobs || jobs.length === 0) {
            return res.status(404).json({ success: false, error: "No posts found" });
        }

        res.json({ success: true, jobs });
    } catch (error) {
        console.error(error.message);
        res.status(500).json({ success: false, error: "Internal server error" });
    }
});



module.exports = router;