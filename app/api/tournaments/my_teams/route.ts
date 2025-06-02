import { NextRequest, NextResponse } from "next/server";
import TeamModel from "@/app/models/Teams";
import CricketTournamentModel from "@/app/models/CricketTournament";
export async function GET(req : NextRequest){
    const {searchParams} = new URL(req.url)
    const tournamentId = searchParams.get("tournamentId")
    console.log("This is the Id : ",tournamentId    )
    if(!tournamentId){
        return NextResponse.json({message : "No Tournament Id found"})
    }
    const tournament = await CricketTournamentModel.findById(tournamentId)
    const TotalTeams = tournament?.teams
    const teams = await TeamModel.find({tournamentId : tournamentId})
    if(!teams){
        return NextResponse.json({message : "Team not found"},{status : 400})
    }
    return NextResponse.json({"teams": teams,TotalTeams},{status : 200})
}