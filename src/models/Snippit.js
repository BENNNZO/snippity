import { model, models, Schema } from "mongoose";

const SnippitSchema = new Schema({
    creator: {
        type: Schema.Types.ObjectId,
        ref: "User"
    },
    date: {
        type: Date,
        default: Date.now
    },
    title: String,
    code: String,
    votes: Number,
    language: String,
    tags: [String],
})

export default models.Snippit || model('Snippit', SnippitSchema)