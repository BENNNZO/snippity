import { ConnectDB } from "@/utils/database";

export async function GET() {
    try {
        await ConnectDB()

        console.log("success")

        return new Response("resolved", { status: 200 })
    } catch (err) {
        console.log(err)
        console.log("failure")
    }
}