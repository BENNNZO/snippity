import mongoose from "mongoose";

let cached = global.mongoose

if (!cached) {
    cached = global.mongoose = { conn: null, promise: null }
}

export default async function dbConnect() {
    if (cached.conn) {
        console.log("mongodb already connected")
        return cached.conn
    }

    if (!cached.promise) {
        const opts = {
            bufferCommands: false,
        }

        cached.promise = mongoose.connect(process.env.MONGODB_URI, opts).then((mongoose) => {
            return mongoose
        })
    }

    try {
        cached.conn = await cached.promise
    } catch (e) {
        cached.promise = null
        throw e
    }

    console.log("connected")
    return cached.conn
}