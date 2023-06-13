import dbConnect from "@/utils/dbConnect";
import SnippitSchema from "@/models/SnippitSchema";

export async function GET() {
    
}

export async function POST() {
    try {
        await dbConnect()
        await SnippitSchema.create({
            title: "title 01",
            code: "let snippity = 'the home of copy and paste'",
            votes: 43,
            language: "js",
            tags: ["snippity", "copy", "paste"]
        })
        return new Response("snippit created", { status: 200 })
    } catch (err) {
        console.log(err)
        return Response(err, { status: 500 })
    }
}