import NextAuth from "next-auth"
// import AppleProvider from "next-auth/providers/apple"
import GoogleProvider from "next-auth/providers/google"
// import EmailProvider from "next-auth/providers/email"

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
})

export { handler as GET, handler as POST }