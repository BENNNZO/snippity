import NextAuth from "next-auth"
import GoogleProvider from "next-auth/providers/google"

import dbConnect from "@/utils/dbConnect"
import User from "@/models/User"

const handler = NextAuth({
    secret: process.env.NEXTAUTH_SECRET,
    providers: [
        GoogleProvider({
            clientId: process.env.GOOGLE_ID,
            clientSecret: process.env.GOOGLE_SK,
        }),
    ],
    pages: {
        signIn: '/auth/signIn'
    },
    callbacks: {
        async session({ session }) {
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
        async signIn({ profile }) {
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
        },
        // async redirect({ url, baseUrl }) {
        //   if (url.startsWith("/")) return `${baseUrl}${url}`
        //   else if (new URL(url).origin === baseUrl) return url
        //   return baseUrl
        // }
    }
})

export { handler as GET, handler as POST }