import type { NextAuthOptions } from 'next-auth'
import CredentialsProvider from 'next-auth/providers/credentials';
import  User from '@/model/User';
import { dbConnect } from '@/lib/dbConnect';
import bcrypt from 'bcryptjs'
export const options:NextAuthOptions = {
    providers: [
        CredentialsProvider({
            name: "Credentials",
            credentials: {
                email: {
                    type: "email",
                },
                password: {
                    type: "password",
                }
            },
            async authorize(credentials) {
                if (!credentials){
                    console.log("Missing credentials");
                    return null;
                } 
                     // Return null if credentials are missing
                console.log(credentials);
                const user = await User.findOne({ email: credentials.email });
            
                if (!user) {
                    console.log("Missing user");
                    return null;
                } // Return null if user not found
                console.log(user);
                // Use a method like comparePassword to check the provided password against the hashed password
                const passwordMatch = await bcrypt.compare(credentials.password, user.password);
            
                if (!passwordMatch) {
                    console.log('Password mismatch');
                    return null;
                } // Return null if passwords don't match

                return user; // Return the user if credentials are valid
            }
            
        }) 
    ],
    pages: {
        signIn: '/auth/login',  // Custom sign-in page
    },
    callbacks: {
        async jwt({ token, user }) {
            if (user) {
                token.id = user.id;
            }
            return token;
        },
        async session({ session, token }) {
            if (token.id) {
                session.user.id = token.id;
            }
            return session;
        }
        // async signIn({ user, account, profile }) {
        //     return '/dashboard'; // Return the URL as a string
        // }
        // async redirect({ url, baseUrl }) {
        //     // Redirect to dashboard after successful authentication
        //     return `/dashboard`;
        // }
    },
    // events: {
    //     async signIn({ user, account, profile }) {
    //         // Redirect the user to the dashboard page
    //         return '/dashboard';
    //     }
    // }
}
