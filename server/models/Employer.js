const mongoose=require("mongoose")
const User=require("./User")
const EmployerSchema=new mongoose.Schema({
    companyName:{
        type:String,
        required:true
    },
    industry:{
        type:String,
        required:true
    }
})

const Employer=User.discriminator('Employer',EmployerSchema)

module.exports=Employer;