const express=require("express");
const cors=require("cors");
const connectToMongo=require("./db");

const app=express();
app.use(cors());
app.use(express.json());
app.listen(()=>{
    console.log(`Bank app listening on port at http://localhost:80`);
});
connectToMongo();