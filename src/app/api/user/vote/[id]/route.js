import dbConnect from "@/utils/dbConnect";
import User from "@/models/User";
import Snippit from "@/models/Snippit";

export async function POST(req, { params }) {
    try {
        await dbConnect()

        const { id } = await params
        const { option, up, down, value, _id } = await req.json()

        // up or down
        // true or false
        // other values
        // snippit id

        if (value) {
            await User.updateOne({ _id: id }, { "$addToSet": { [`${option}vote`]: _id }})
            await User.updateOne({ _id: id }, { "$pull": { [`${option === "up" ? "down" : "up"}vote`]: _id }})
        } else {
            await User.updateOne({ _id: id }, { "$pull": { [`${option}vote`]: _id }})
            await User.updateOne({ _id: id }, { "$pull": { [`${option === "up" ? "down" : "up"}vote`]: _id }})
        }

        console.log([up, down])

        // adjust vote count
        if (option === "up") {
            if (value) {
                if (down) { // if upvoted and down is already true
                    await Snippit.updateOne({ _id: _id }, { "$inc": { votes: 2 }})
                } else {
                    await Snippit.updateOne({ _id: _id }, { "$inc": { votes: 1 }})
                }
            } else {
                await Snippit.updateOne({ _id: _id }, { "$inc": { votes: -1 }})
            }
        } else {
            if (value) {
                if (up) { // if downvoted and up is already true
                    await Snippit.updateOne({ _id: _id }, { "$inc": { votes: -2 }})
                } else {
                    await Snippit.updateOne({ _id: _id }, { "$inc": { votes: -1 }})
                }
            } else {
                await Snippit.updateOne({ _id: _id }, { "$inc": { votes: 1 }})
            }
        }

        // switch (option) {
        //     case "up":
        //         let upResult = await User.updateOne({ _id: id }, { "$addToSet": { upvote: _id } })
        //         if (upResult.modifiedCount === 0) {
        //             await User.updateOne({ _id: id }, { "$pull": { upvote: _id } })
        //             await Snippit.updateOne({ _id: _id }, { "$inc": { votes: -1 } })
        //         } else {
        //             await User.updateOne({ _id: id }, { "$pull": { downvote: _id } })
        //             await Snippit.updateOne({ _id: _id }, { "$inc": { votes: 1 } })
        //         }
        //         break

        //     case "down":
        //         let downResult = await User.updateOne({ _id: id }, { "$addToSet": { downvote: _id } })
        //         if (downResult.modifiedCount === 0) {
        //             await User.updateOne({ _id: id }, { "$pull": { downvote: _id } })
        //             await Snippit.updateOne({ _id: _id }, { "$inc": { votes: 1 } })
        //         } else {
        //             await User.updateOne({ _id: id }, { "$pull": { upvote: _id } })
        //             await Snippit.updateOne({ _id: _id }, { "$inc": { votes: -1 } })
        //         }
        //         break
        // }

        return new Response("voted on snippit", { status: 200 })
    } catch (err) {
        console.log(err)
        return new Response(err, { status: 500 })
    }
}