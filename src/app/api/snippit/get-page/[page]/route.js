import dbConnect from "@/utils/dbConnect"
import Snippit from "@/models/Snippit"

export async function GET(req, { params }) {
    try {
        await dbConnect()

        // console.log(req)
        const { page } = await params
        console.log('req.url.searchParams.page')
        console.log(page)
        console.log('req.url.searchParams.page')
        const snippits = await Snippit.find({}).skip(page * 3).limit(3)

        return new Response(JSON.stringify(snippits), { status: 200 })
    } catch (err) {
        console.log(err)
        return new Response(err, { status: 500 })
    }
}