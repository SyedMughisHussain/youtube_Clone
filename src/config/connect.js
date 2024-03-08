import mongoose from "mongoose"

const connectDb = async () => {
    try {
       const connect = await mongoose.connect(process.env.MONGODB_URI)
        console.log("Database successfully connected")
        console.log(connect.connection.host);
    } catch (error) {
        console.log("Error: " , error);
    }
}

export default connectDb;