import { Resend } from "resend";
import { v4 as uuidv4 } from 'uuid';
import { VerificationToken } from "@/app/models/varificationToken";
import UserModel from "@/app/models/UserModel";
import connectDb from "@/app/lib/db";
import { NextRequest } from "next/server";
import { NextResponse } from "next/server";

const resend = new Resend(process.env.RESEND_API_KEY as string)

export async function POST(req: NextRequest){
    await connectDb();
    const {email,name,password} = await req.json();
    const res = await UserModel.findOne({email})
    if(res){
        return NextResponse.json("User with this eamil already exists",{status : 400})
    }
    const token = uuidv4();
    const expiresAt = new Date(Date.now() + 1000 * 60 * 30);
    await VerificationToken.create({email,token,expiresAt,name,password});
    const verificationUrl = `${process.env.NEXT_PUBLIC_APP_URL}/auth/verify-email?token=${token}`
    console.log(verificationUrl)
    await resend.emails.send({
        from : 'Cricko <noreply@cricko.site>',
        to : email,
        subject : 'Varify your email address',
        html : `
             <p>Welcome to Cricko!</p>
            <p>Click below to verify your email:</p>
            <a href=${verificationUrl} style="padding: 10px 15px; cursor : "pointer"; background-color: #2563eb; color: white; text-decoration: none;">Verify Email</a>
            <p>This link expires in 30 minutes.</p>
        `
    });
    console.log("Email send successfully")
    return NextResponse.json("email send successfully",{status : 200})
}