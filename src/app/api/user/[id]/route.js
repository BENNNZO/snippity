import dbConnect from "@/utils/dbConnect";
import User from "@/models/User";

export async function GET(req, { params }) {
    try {
        await dbConnect()

        const { id } = await params

        const userData = await User.findById(id)

        return new Response(JSON.stringify(userData), { status: 200 })
    } catch (err) {
        console.log(err)
        return new Response(err, { status: 200 })
    }
}