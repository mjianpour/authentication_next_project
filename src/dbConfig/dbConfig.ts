import mongoose, { Mongoose } from "mongoose";

export async function connect() {
    try {
        mongoose.connect(process.env.MONGO_URI!)

        const connection = mongoose.connection;

        connection.on('connected', () => {
            console.log("Connected to MongoDB successfully!")
        })

        connection.on('error', (err) => {
            console.log(`An error occured: ${err}`);    
            process.exit();
        })
    } catch(error) {
        console.log(`Error: ${error}`)
    }
}