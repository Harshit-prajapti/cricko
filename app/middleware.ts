import { NextRequest, NextResponse } from "next/server";
import { getServerSession } from "next-auth";
import authOptions from "./api/auth/[...nextauth]/options";

export async function middleware(request:NextRequest){
    const session = await getServerSession(authOptions)
    const role = session?.user.role;
    if(!role){
        return NextResponse.redirect('/unauthorized')
    }
    const url = request.nextUrl.pathname;
    if(url.startsWith('/dashboard') && role !== "organizer"){
        return NextResponse.redirect('/unauthorized')
    }
}