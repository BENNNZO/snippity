import NextAuth from "next-auth"
// import AppleProvider from "next-auth/providers/apple"
import GoogleProvider from "next-auth/providers/google"
// import EmailProvider from "next-auth/providers/email"

import dbConnect from "@/utils/dbConnect"
import User from "@/models/User"

const handler = NextAuth({
    secret: process.env.NEXTAUTH_SECRET,
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

                const sessionUser = await User.findOne({ email: session.user.email })

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

                const userExists = await User.findOne({ email: profile.email })

                if (!userExists) await User.create({ username: profile.name, email: profile.email, picture: profile.picture })

                return true
            } catch (err) {
                console.log(err)
                return false
            }
        }
    }
})

export { handler as GET, handler as POST }