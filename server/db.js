const mongoose=require("mongoose")
const MONGOURI=`mongodb+srv://${process.env.DB_USER}:${process.env.DB_PASSWORD}@mycluster.oc2fxnz.mongodb.net/jobBoard`
// const MONGOURI="mongodb://127.0.0.1:27017/jobBoard"

const connectToMongo=()=>{
    mongoose.connect(MONGOURI);
    const db=mongoose.connection;
    db.on('error',console.error.bind(console,"Mongodb connection refused"))
    db.once('open', () => {
        console.log('Connected to MongoDB successfully!');
      });
}

module.exports=connectToMongo;