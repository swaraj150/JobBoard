const mongoose=require("mongoose")
const User=require("./User")
const EmployerSchema=new mongoose.Schema({
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
    companyName:{
        type:String,
        required:true
    },
    industry:{
        type:String,
        required:true
    },
    
})

// const Employer=User.discriminator('Employer',EmployerSchema)
const Employer=mongoose.model('Employer',EmployerSchema)

module.exports=Employer;