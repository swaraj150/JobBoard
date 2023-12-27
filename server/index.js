const express=require("express");
const cors=require("cors");
const connectToMongo=require("./db");
const port=80;
const app=express();
app.use(cors());
app.use(express.json());
app.use("/api/employer",require("./routes/employerModelRoutes"));
app.use("/api/job",require("./routes/jobRoutes"));
app.use("/api/jobseeker",require("./routes/jobSeekerRoutes"));
app.listen(port,()=>{
    console.log(`Bank app listening on port at http://localhost:80`);
});
connectToMongo();