const mongoose=require("mongoose")
const MONGOURI="mongodb+srv://andhaleswaraj6:EhnkJIIKaZVJ0KJG@mycluster.oc2fxnz.mongodb.net/jobBoard"

const connectToMongo=()=>{
    mongoose.connect(MONGOURI);
    const db=mongoose.connection;
    db.on('error',console.error.bind(console,"Mongodb connection refused"))
    db.once('open', () => {
        console.log('Connected to MongoDB successfully!');
      });
}

module.exports=connectToMongo;