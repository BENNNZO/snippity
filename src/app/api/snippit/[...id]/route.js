import dbConnect from "@/utils/dbConnect";
import Snippit from "@/models/Snippit";
import User from "@/models/User";

export async function DELETE(req, { params }) {
    try {
        await dbConnect()

        const { id } = await params

        await Snippit.deleteOne({ _id: id[0] })
        await User.updateOne({ _id: id[1] }, { "$pull": { favorite: id[0] } })

        return new Response("snippit deleted", { status: 200 })
    } catch (err) {
        console.log(await req.json())
        console.log(err)
        return new Response(err, { status: 500 })
    }
}