import NextAuth from "next-auth"
// import AppleProvider from "next-auth/providers/apple"
import GoogleProvider from "next-auth/providers/google"
// import EmailProvider from "next-auth/providers/email"

import dbConnect from "@/utils/dbConnect"
import User from "@/models/User"

const handler = NextAuth({
    secret: process.env.SECRET,
    providers: [
        // OAuth authentication providers
        // AppleProvider({
        //   clientId: process.env.APPLE_ID,
        //   clientSecret: process.env.APPLE_SECRET,
        // }),
        GoogleProvider({
            clientId: process.env.GOOGLE_ID,
            clientSecret: process.env.GOOGLE_SK,
        }),
        // Sign in with passwordless email link
        // EmailProvider({
        //   server: process.env.MAIL_SERVER,
        //   from: "<no-reply@example.com>",
        // }),
    ],
    pages: {
        signIn: '/auth/signIn'
    },
    callbacks: {
        session: async ({ session }) => {
            try {
                await dbConnect()

                const sessionUser = await User.findOne({ Email: session.user.email })

                session.user.id = sessionUser._id

                return session
            } catch (err) {
                console.log(err)

                return session
            }
        },
        signIn: async ({ profile }) => {
            console.log(profile)
            try {
                await dbConnect()

                const userExists = await User.findOne({ Email: profile.email })

                if (!userExists) await User.create({ Username: profile.name, Email: profile.email, ProfileImage: profile.picture })

                return true
            } catch (err) {
                console.log(err)
                return false
            }
        }
    }
    // events: {
    //     signIn: async ({ user }) => {
    //         console.log("118222427277813091957")
    //         console.log(user.id)
    //         try {
    //             await dbConnect()

    //             const userExists = await User.findOne({ Session: user.id })

    //             console.log(userExists)

    //             if (!userExists) await User.create({ Session: String(user.id), Username: user.name, Email: user.email, ProfileImage: user.image })
    //         } catch (err) {
    //             console.log("failed to connect to db")
    //             console.log(err)
    //         }
    //     }
    // }
})

export { handler as GET, handler as POST }