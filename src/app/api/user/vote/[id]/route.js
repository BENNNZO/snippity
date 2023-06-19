import dbConnect from "@/utils/dbConnect";
import User from "@/models/User";

export async function POST(req, { params }) {
    try {
        await dbConnect()

        const { id } = await params
        const { option, vote, _id } = await req.json()

        switch (option) {
            case "up":
                let upResult = await User.updateOne({ _id: id }, { "$addToSet": { upvote: _id } })
                if (upResult.modifiedCount === 0) {
                    await User.updateOne({ _id: id }, { "$pull": { upvote: _id } })
                } else {
                    await User.updateOne({ _id: id }, { "$pull": { downvote: _id } })
                }
                break

            case "down":
                let downResult = await User.updateOne({ _id: id }, { "$addToSet": { downvote: _id } })
                if (downResult.modifiedCount === 0) {
                    await User.updateOne({ _id: id }, { "$pull": { downvote: _id } })
                } else {
                    await User.updateOne({ _id: id }, { "$pull": { upvote: _id } })
                }
                break
        }

        return new Response("voted on snippit", { status: 200 })
    } catch (err) {
        console.log(err)
        return new Response(err, { status: 500 })
    }
}