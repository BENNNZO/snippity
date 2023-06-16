import dbConnect from "@/utils/dbConnect";
import Snippit from "@/models/Snippit";

export async function DELETE(req, { params }) {
    try {
        await dbConnect()

        const { id } = await params

        await Snippit.deleteOne({ _id: id })

        return new Response("snippit deleted", { status: 200 })
    } catch (err) {
        console.log(await req.json())
        console.log(err)
        return new Response(err, { status: 500 })
    }
}