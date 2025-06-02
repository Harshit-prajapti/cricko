import { NextRequest, NextResponse } from "next/server";
import { VerificationToken } from "@/app/models/varificationToken";
import UserModel from "@/app/models/UserModel";
import connectDb from "@/app/lib/db";
export async function GET(req : NextRequest){
    await connectDb();
  const { searchParams } = new URL(req.url);
  const token = searchParams.get('token');

  const foundToken = await VerificationToken.findOne({ token });
  console.log("found token is : ",foundToken)
  if (!foundToken || new Date() > foundToken.expiresAt) {
    return new Response(JSON.stringify({ error: 'Invalid or expired token' }), { status: 400 });
  }
  await UserModel.create({
    email : foundToken.email,
    name : foundToken.name,
    password : foundToken.password as string,
    provider : "credential"
  })
  await VerificationToken.deleteOne({ token }); // remove after verification

  return NextResponse.redirect("http://localhost:3000/auth/verified")
}