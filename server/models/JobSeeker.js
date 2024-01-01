const mongoose=require("mongoose")
const User=require("./User");
const Job = require("./Job");
const JobSeekerSchema=new mongoose.Schema({
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
    ]
})
// JobSeekerSchema.index({ "applications": 1 });
const JobSeeker=User.discriminator('JobSeeker',JobSeekerSchema)

module.exports=JobSeeker;