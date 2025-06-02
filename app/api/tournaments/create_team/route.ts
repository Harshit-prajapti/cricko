import { NextRequest, NextResponse } from "next/server";
import { getServerSession } from "next-auth";
import authOptions from "../../auth/[...nextauth]/options";
import CricketTournamentModel from "@/app/models/CricketTournament";
type player = {
    name : string,
    age : string,
    jurseyNumber : string,
    contactNumber : string
}
import TeamModel from "@/app/models/Teams";
export async function POST(req : NextRequest){
    const session = await getServerSession(authOptions)
    const user =  session?.user
    if(!user){
        return NextResponse.json({messgae : "Unauthorized"},{status : 400})
    }
    const tournament = await CricketTournamentModel.findOne({organizerId : user?.id})
    const tournamentId = tournament?._id    
    if(!tournamentId){
        return NextResponse.json({message : "Tournament not found"},{status : 400})
    }    
    const data = await req.json()
    console.log(data)
    const team = await TeamModel.create({
        tournamentId,
        name : data.teamName,
        owner : data.owner,
        contact : data.contact,
        email : data.email as string,
        captain : data.captain,        
        viceCaptain : data.viceCaptain,
        players : data.players,
        substitutes : data.substitutes,
    })
    return NextResponse.json({message : team},{status : 200})    
}