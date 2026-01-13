import mongoose from "mongoose";





const db = async ()=>{
    try{
        await mongoose.connect(`${process.env.MONGO_URL}`);
        console.log("Connected to Database");
    }catch(error){

    }
}


export default db;