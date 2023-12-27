const mongoose=require("mongoose")
const User=require("./User")
const JobSeekerSchema=new mongoose.Schema({
    skills:{
        type:[String],
        required:true
    },
    education:{
        type:String,
        required:true
    }
})

const JobSeeker=User.discriminator('JobSeeker',JobSeekerSchema)

module.exports=JobSeeker;