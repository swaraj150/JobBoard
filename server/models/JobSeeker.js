const mongoose=require("mongoose")
// const User=require("./User");
const Job = require("./Job");
const JobSeekerSchema=new mongoose.Schema({
    name:{
        type:String,
        required:true
    },
    username:{
        type:String,
        required:true,
        unique:true
    },
    email:{
        type:String,
        required:true,
        unique:true
    },
    password:{
        type:String,
        required:true
    },
    skills:{
        type:[String],
        required:true
    },
    education:{
        type:String,
        required:true
    },
    applications:[
        {
            type:mongoose.Schema.Types.ObjectId,
            ref:Job
        }
    ],
    savedPosts:[
        {
            type:mongoose.Schema.Types.ObjectId,
            ref:Job
        }
    ]

})
// JobSeekerSchema.index({ "applications": 1 });
const JobSeeker=mongoose.model('JobSeeker',JobSeekerSchema)

module.exports=JobSeeker;