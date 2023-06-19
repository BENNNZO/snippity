import dbConnect from "@/utils/dbConnect";
import User from "@/models/User";

export async function POST(req, { params }) {
    try {
        await dbConnect()

        const { id } = await params
        const { snippitId } = await req.json()

        let result = await User.updateOne({ _id: id }, { "$addToSet": { favorites: snippitId } })

        if (result.modifiedCount === 0) await User.updateOne({ _id: id }, { "$pull": { favorites: snippitId } })

        return new Response("pushed / pulled snippit id to user favorites array", { status: 200 })
    } catch (err) {
        console.log(err)
        return new Response(err, { status: 500 })
    }
}