import dbConnect from "@/utils/dbConnect";
import User from "@/models/User";
import Snippit from "@/models/Snippit";

export async function GET(req, { params }) {
    try {
        await dbConnect()

        const { id } = await params

        const userData = await User.findById(id).populate({ path: "favorites", populate: { path: "creator" }})
        // const userData = await User.findById(id).populate("favorites creator")
        const userPost = await Snippit.find({ creator: id }).populate("creator")

        return new Response(JSON.stringify({ userData, userPost}), { status: 200 })
    } catch (err) {
        console.log(err)
        return new Response(err, { status: 200 })
    }
}