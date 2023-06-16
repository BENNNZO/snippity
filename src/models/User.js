import { model, models, Schema } from "mongoose";

const UserSchema = new Schema({
    username: String,
    email: String,
    picture: String,
    favorites: [Schema.Types.ObjectId]
})

export default models.User || model("User", UserSchema)