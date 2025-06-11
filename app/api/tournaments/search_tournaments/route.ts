import { NextRequest, NextResponse } from "next/server"
import CricketTournamentModel from "@/app/models/CricketTournament"
import connectDb from "@/app/lib/db"
export async function GET(req : NextRequest){
    await connectDb()   
    const {searchParams} = new URL(req.url)
    const prompt = searchParams.get("prompt")   
    if(prompt){
        const regex = new RegExp(prompt,"i")
        const res = await CricketTournamentModel.find({
            $or : [
                {name : {$regex : regex}},
                {city : {$regex : regex}},
                {owner : {$regex : regex}},
                {venue : {$regex : regex}},
            ]
        });

        return NextResponse.json(res,{status : 200})
    }
    const recentTeams  = await CricketTournamentModel.find().sort({createdAt : -1}).limit(10);
    return NextResponse.json(recentTeams,{status : 200})
}