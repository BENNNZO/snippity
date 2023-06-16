import dbConnect from "@/utils/dbConnect";
import Snippit from "@/models/Snippit";

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