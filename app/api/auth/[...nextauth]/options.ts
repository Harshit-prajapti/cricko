import { NextAuthOptions } from "next-auth";
import GoogleProvider from "next-auth/providers/google";
import CredentialsProvider from "next-auth/providers/credentials";
import { NextResponse } from "next/server";
import UserModel from "@/app/models/UserModel";
import connectDb from "@/app/lib/db";
import bcrypt from "bcryptjs";
export const authOptions: NextAuthOptions = {
  providers: [
    GoogleProvider({
      clientId : process.env.GOOGLE_CLIENT_ID as string, 
      clientSecret : process.env.GOOGLE_CLIENT_SECRET as string
    }),
    CredentialsProvider({
      name: "Credentials",
      credentials: {
        email: {
          label: "Email",
          type: "email",
          placeholder: "example@gmail.com",
        },
        password: {
          label: "Password",
          type: "Password",
          placeholder: "********",
        },
      },
      async authorize(credentials) {
        await connectDb();
        console.log("Credentails Are : ",credentials)
        if(!credentials){
          return null
        } 
        const user = await UserModel.findOne({ email: credentials?.email });
        console.log("user is : ",user)
        if (!user) return null;
        console.log(typeof(credentials.password));
        console.log(typeof(user.password));
        const isMatch = await bcrypt.compare(credentials.password as string, user.password);
        console.log('Match:', isMatch);
        const pass = "12345678"
        const hasedPass = await bcrypt.hash(pass ,10)
        const match = await bcrypt.compare(pass, hasedPass)
        console.log("Result of secound matching is : ",match)
        if (!isMatch) return null;
    // 4. Return user data for JWT session    
        return {
          id: user._id as string,
          email: user.email,
          name: user.name,
          image: user.avatar,
        };
      },
    }),
  ],
  pages : {
    signIn : "/auth/login"
  },
  session: {
    strategy: "jwt",
  },
  callbacks: {
    async signIn({ user, account }) { 
      const myUser = await UserModel.findOne({ email: user.email });
      if (!myUser) {
        await UserModel.create({
          name: user.name,
          email: user.email,  
          avatar: user.image,
          provider: account?.provider as string,
          role: "user",
        });
      }
      return true;
    },
    async jwt({ token}) {
      await connectDb();
         const dbUser = await UserModel.findOne({ email: token.email });
         if (dbUser) {
          (token.id = dbUser?._id),
          (token.role = dbUser?.role),
          (token.isProfileComplete = dbUser?.isProfileComplete);
      }
      return token;
    },
    async session({ session, token }) {
      if (token && session.user) {
        session.user.id = token.id as string;
        session.user.role = token.role as "user" | "organizer";
        session.user.isProfileComplete = token.isProfileComplete as boolean;
      }
      return session;
    },
    async redirect({ baseUrl }) {
      return baseUrl;
    },
  },
};
export default authOptions;
