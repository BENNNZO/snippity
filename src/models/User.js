import { model, models, Schema } from "mongoose";

const UserSchema = new Schema({
    Username: String,
    Email: String,
    ProfileImage: String
})

export default models.User || model("User", UserSchema)