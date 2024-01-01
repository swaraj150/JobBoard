const express = require('express')
const router = express.Router();
const Employer = require("../models/Employer")
const Job = require("../models/Job")
const { body, validationResult } = require("express-validator");
const bcrypt = require('bcryptjs');
const fetchUser=require("../middleware/fetchUser")

router.post("/create",fetchUser,async(req,res)=>{
    try{
        if (!req.user || !req.user.id) {
            return res.status(401).send({success:false, message: "User not authenticated" });
        }
        const userid = req.user.id;
        const user = await Employer.findById(userid).select("-password");
        if(!user){
            return res.status(401).send({success:false, message: "User does not exist" });
        }
        const jobPost = await Job.create({
            employer: req.user.id,
            title: req.body.title,
            description: req.body.description,
            requirements:req.body.requirements,
            skills_required: req.body.skills_required,
            openings: req.body.openings,
            income:req.body.income,
            location:req.body.location
        })
        res.status(200).json({success:true,msg:"post created!"})
        

    }catch(error){
        return res.status(500).json({success:false,error:"internal server error"});
    }
});

router.get(`/getpost`, fetchUser, async (req, res) => {
    try {
        const skillsRequired = req.body.skills_required;

        if (!skillsRequired) {
            return res.status(400).json({ success: false, error: "Skills required parameter missing" });
        }
        const posts = await Job.find({
            skills_required: { $in: skillsRequired }
        });
        if (!posts || posts.length === 0) {
            return res.status(404).json({ success: false, error: "No posts found" });
        }
        res.json({ success: true, posts });
    } catch (error) {
        console.error(error.message);
        res.status(500).json({ success: false, error: "Internal server error" });
    }
});
router.get("/getpost/:id", fetchUser, async (req, res) => {
    try {
        const id = req.params.id;

        if (!id) {
            return res.status(400).json({ success: false, error: "parameter missing" });
        }
        console.log(id)
        const post = await Job.findById(id);
        if (!post) {
            return res.status(404).json({ success: false, error: "No post found" });
        }
        res.json({ success: true, post});
    } catch (error) {
        console.error(error.message);
        res.status(500).json({ success: false, error: "Internal server error" });
    }
});
router.get("/getallpost",async(req,res)=>{
    try{
        const post=await Job.find();
        if(!post){
            return res.status(400).json({success:false,error:"post not found"});
        }
        res.json(post)
    }catch (error) {
        console.error(error.message);
        res.status(500).json({ success: false, error: "Internal server error" });
    }
});
router.get("/getuserpost",fetchUser,async(req,res)=>{
    try{
        const post=await Job.find({employer:req.user.id});

        if(!post){
            return res.status(400).json({success:false,error:"post not found"});
        }
        res.json(post)
    }catch (error) {
        console.error(error.message);
        res.status(500).json({ success: false, error: "Internal server error" });
    }
});
module.exports = router;