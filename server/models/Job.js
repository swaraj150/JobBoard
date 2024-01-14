const mongoose = require("mongoose")
const Employer = require("./Employer")
const JobSchema = new mongoose.Schema({
    employer: {
        type: mongoose.Schema.Types.ObjectId,
        ref: Employer
    },
    title: {
        type: String,
        required: true
    },
    description: {
        type: String,
        required: true
    },
    requirements: {
        type: String,
        required: true
    },
    skills_required: {
        type: [String],
        required: true
    },
    openings: {
        type: Number,
        required: true
    },
    income: {
        type: String,
        required: true
    },
    location: {
        type: String,
        required: true
    },
    applicants: [
        {
            applicant:{
                type: mongoose.Schema.Types.ObjectId,
                ref: "JobSeeker"
            },
            status:{
                type:String
            }
        }
    ]

});
const Job = mongoose.model("Job", JobSchema);
module.exports = Job;