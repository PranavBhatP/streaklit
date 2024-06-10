import NextAuth from "next-auth";
import GoogleProvider from "next-auth/providers/google";
import GitHubProvider from "next-auth/providers/github";
import CredentialsProvider from "next-auth/providers/credentials";

import User  from "@/model/User";
import bcrypt from "bcryptjs";

export const {
    handlers: { GET,POST },
    auth,
    signIn,
    signOut,
} = NextAuth({
    session: {
        strategy: 'jwt',
    },
    providers: [
        CredentialsProvider({
            credentials: {
                email: {},
                password: {},
            },
            async authorize(credentials) {
                if (!credentials) {
                    throw new Error("No credentials provided");
                }
                const { email, password } = credentials;
                try {
                    const user = await User.findOne({
                        email: email
                    })
                    if (user) {
                        const isMatch = await bcrypt.compare(
                            password,
                            user.password
                        );

                        if (isMatch) {
                            return user;
                        } else {
                            throw new Error("Email or Password is not correct");
                        }
                    } else {
                        throw new Error("User not found");
                    }
                } catch (error) {
                    throw new Error("User cannot be accessed");
                }
            },
        }),
    ],
})