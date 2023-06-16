import dbConnect from "@/utils/dbConnect";
import Snippit from "@/models/Snippit";

export async function GET() {
    try {
        await dbConnect()

        const snippits = await Snippit.find({})

        return new Response(JSON.stringify(snippits), { status: 200 })
    } catch (err) {
        console.log(err)
        return new Response(err, { status: 500 })
    }
}

export async function POST(req) {
    try {
        await dbConnect()

        const { title, code, tags, language, creator } = await req.json()
        
        await Snippit.create({
            creator,
            title,
            code,
            tags,
            language,
            votes: 0
        })
        
        return new Response("snippit created", { status: 201 })
    } catch (err) {
        console.log(err)
        return Response(err, { status: 500 })
    }
}