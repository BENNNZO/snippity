import dbConnect from "@/utils/dbConnect"
import Snippit from "@/models/Snippit"

export async function GET(req, { params }) {
    try {
        await dbConnect()

        // console.log(req)
        // console.log('req.url.searchParams.page')
        // console.log(page)
        // console.log('req.url.searchParams.page')
        console.log(params)
        const snippits = await Snippit.find(params.info.length !== 2 ? {} : { code: new RegExp(params.info[1], "i") }).skip(params.info[0] * 3).limit(3)

        return new Response(JSON.stringify(snippits), { status: 200 })
    } catch (err) {
        console.log(err)
        return new Response(err, { status: 500 })
    }
}