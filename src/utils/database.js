import mongoose from "mongoose";

let connected = false

export async function ConnectDB() {
    if (!connected) {
        try {
            await mongoose.connect(process.env.MONGODB_URI)
            console.log("connected.")
            connected = true
        } catch (err) {
            console.log(err)
            console.log("failed to connect.")
        }
    } else {
        console.log("already connected.")
    }
}