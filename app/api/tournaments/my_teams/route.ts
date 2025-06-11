import { NextRequest, NextResponse } from "next/server";
import TeamModel from "@/app/models/Teams";
export async function GET(req: NextRequest){
    const searchParams = req.nextUrl.searchParams;
    const userId = searchParams.get("userId");
    if(!userId){
        return NextResponse.json({message : "User ID is required"},{status : 400})
    }
    const teams = await TeamModel.find({userId : userId}).sort({createdAt : -1})
    if(!teams){
        return NextResponse.json({message : "Team not found"},{status : 400})
    } 
    return NextResponse.json({"teams": teams,"totalTeams" : teams.length},{status : 200})
}