import dbConnect from "@/utils/dbConnect";

export async function GET() {
    try {
        await dbConnect()

        console.log("success")

        return new Response("resolved", { status: 200 })
    } catch (err) {
        console.log(err)
        console.log("failure")
    }
}