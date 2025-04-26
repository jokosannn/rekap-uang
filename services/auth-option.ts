import { NextAuthOptions } from 'next-auth'
import GoogleProvider from 'next-auth/providers/google'

import { prisma } from '@/lib/prisma/init'

import { loginWithGoogle } from './auth-service'

interface CustomSessionUser {
  name: string
  email: string
  image: string
}

export const authOptions: NextAuthOptions = {
  session: {
    strategy: 'jwt'
  },
  secret: process.env.AUTH_SECRET,
  pages: {
    signIn: '/sign-in'
  },
  providers: [
    GoogleProvider({
      clientId: process.env.GOOGLE_CLIENT_ID!,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET!
    })
  ],
  callbacks: {
    async session({ session, token }) {
      if (session.user) {
        const user = session.user as CustomSessionUser

        // Cari user di database berdasarkan email dari token
        const userFromDb = await prisma.user.findUnique({
          where: { email: user.email }
        })

        if (userFromDb) {
          user.name = userFromDb.name
          user.email = userFromDb.email
          user.image = userFromDb.image
        } else {
          user.name = token.name as string
          user.email = token.email as string
          user.image = token.image as string
        }
      }

      return session
    },
    async jwt({ token, user, account }) {
      if (account?.provider === 'google' && user) {
        const data = {
          username: user.name!,
          email: user.email!,
          image: user.image!
        }

        try {
          const result = await loginWithGoogle(data)

          if (result.status) {
            token.name = result.data.username
            token.email = result.data.email
            token.image = result.data.image
          }
        } catch (error) {
          console.error('Error during loginWithGoogle:', error)
        }
      }

      return token
    }
  }
}
