import mongoose from "mongoose" // importing mongoose from the mongoose package

//database in collections of cluster0

export const connectDB = async () => {
    try {
        await mongoose.connect(process.env.MONGO_URI);
        console.log("MONGODB Connected Successfully")
    } catch (error) {
        console.error("Error connecting to MONGODB",error);
        process.exit(1); //exit with failure
    }

}