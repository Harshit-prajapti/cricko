import { getServerSession } from "next-auth";
import authOptions from "../auth/[...nextauth]/options";
import { NextResponse } from "next/server";
export async function GET(){
    const session = await getServerSession(authOptions)
    const user = session?.user
    if(!user){
        return NextResponse.json("User not found")
    }
    console.log(user)
    return NextResponse.json(user,{status : 200})
}