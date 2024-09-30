import mongoose from "mongoose";

const uri = "mongodb+srv://ceggeoconsultation:niceonetoyou23@cluster0.a1f7avf.mongodb.net/"

const connectToDatabase = async () => {
    try{
        if(mongoose.connection.readyState >= 1) return;
        await mongoose.connect(uri);
        console.log("Successfully Connected to the database");
    }
    catch(error){
        console.error("Connection error: ", error);
    }
}

export default connectToDatabase