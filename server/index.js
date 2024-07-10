const express=require("express");
const cors=require("cors");
const dotenv=require("dotenv");
const port=process.env.PORT || 80;
const app=express();
dotenv.config();

const connectToMongo=require("./db");
connectToMongo();
app.use(cors());
app.use(express.json());
app.use("/api/employer",require("./routes/employerModelRoutes"));
app.use("/api/job",require("./routes/jobRoutes"));
app.use("/api/jobseeker",require("./routes/jobSeekerRoutes"));
app.use("/api/utility",require("./routes/utilityRoutes"));


app.listen(port,()=>{
    console.log(`Job app listening on port at http://localhost:80`);
});
