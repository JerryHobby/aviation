import NextAuth, {NextAuthOptions} from "next-auth"
import GoogleProvider from "next-auth/providers/google";
import CredentialsProvider from "next-auth/providers/credentials";
import {PrismaAdapter} from "@next-auth/prisma-adapter";
//import bcrypt from "bcrypt";
import prisma from "@/prisma/client";

const nextAuthOptions: NextAuthOptions = {
    adapter: PrismaAdapter(prisma),
    providers: [
        // CredentialsProvider({
        //     name: "Credentials",
        //     credentials: {
        //         email: {label: "Email", type: "email"},
        //         password: {label: "Password", type: "password"}
        //     },
        //     async authorize(credentials, req) {
        //         if (!credentials?.email || !credentials?.password) {
        //             return null;
        //         }
        //         const user = await prisma.user.findUnique(
        //             {
        //                 where: {
        //                     email: credentials.email,
        //                 }
        //             });
        //
        //         if (!user) {
        //             return null;
        //         }
        //
        //         const passwordsMatched = await bcrypt.compare(credentials.password, user.hashedPassword!);
        //         //const isValid = await prisma.user.validatePassword(credentials.password, user.hashedPassword);
        //
        //         if (!passwordsMatched) {
        //             return null;
        //         }
        //         return user;
        //     }
        // }),

        GoogleProvider({
                clientId: process.env.GOOGLE_CLIENT_ID!,
                clientSecret: process.env.GOOGLE_CLIENT_SECRET!,
                authorization: {
                    params: {
                        prompt: "consent",
                        access_type: "offline",
                        response_type: "code"
                    }
                }
            },
        )
    ],
    callbacks: {
        async signIn({ user, account, profile, email, credentials }) {
            return true
        },
        async redirect({ url, baseUrl }) {
            return baseUrl
        },
        async session({ session, user, token }) {
            return session
        },
        async jwt({ token, user, account, profile }) {
            return token
        }
    },
    session: {
        strategy: "jwt",
    }
}

const handler = NextAuth(nextAuthOptions);
export {handler as GET, handler as POST};


