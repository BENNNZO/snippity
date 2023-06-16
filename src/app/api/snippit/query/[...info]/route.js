import dbConnect from "@/utils/dbConnect"
import Snippit from "@/models/Snippit"

export async function GET(req, { params }) {
    try {
        await dbConnect()

        console.log(params)
        const snippits = await Snippit.find(params.info.length !== 3 ? {} : params.info[2] === "true" ? { tags: new RegExp(params.info[1], "i") } : { code: new RegExp(params.info[1], "i") }).sort('dateCreated').skip(params.info[0] * 6).limit(6)

        return new Response(JSON.stringify(snippits), { status: 200 })
    } catch (err) {
        console.log(err)
        return new Response(err, { status: 500 })
    }
}