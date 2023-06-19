import { model, models, Schema } from "mongoose";

const UserSchema = new Schema({
    username: String,
    email: String,
    picture: String,
    favorites: [{
        type: Schema.Types.ObjectId,
        ref: "Snippit"
    }],
    upvote: [Schema.Types.ObjectId],
    downvote: [Schema.Types.ObjectId]
})

export default models.User || model("User", UserSchema)