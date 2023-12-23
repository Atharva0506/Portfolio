import mongoose from "mongoose";

export async function connect() {
    try {
        console.log(process.env.MONGO_URI)
        mongoose.connect(process.env.MONGO_URI!);

        const connection = mongoose.connection;
        
        connection.on('connected', () => {
            console.log("Connected to MongoDB successfully!");
        });

        connection.on('error', (err) => {
            console.error("MongoDB connection error:", err.message);
            process.exit(1); // Exit with a non-zero code to indicate failure
        });
    } catch (error) {
        console.error("Something went wrong:", error);
    }
}