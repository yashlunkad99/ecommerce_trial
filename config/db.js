import mongoose from "mongoose";
import colors from "colors";

//connection
const connectDB = async() => {
    try{
        const conn = await mongoose.connect(process.env.mongoDB_url);
        console.log("connected to database")
    }
    catch(error)
    {
        console.log(error.message.red);
    }
}

export default connectDB;