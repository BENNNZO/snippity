import { model, models, Schema } from "mongoose";

const SnippitSchema = new Schema({
    creator: Schema.Types.ObjectId,
    dateCreated: {
        type: Date,
        default: new Date()
    },
    title: String,
    code: String,
    votes: Number,
    language: String,
    tags: [String],
})

export default models.Snippit || model('Snippit', SnippitSchema)