import { NextRequest } from "next/server";
import { NextResponse } from "next/server";
import TeamModel from "@/app/models/Teams";
import { getServerSession } from "next-auth";
import authOptions from "../../auth/[...nextauth]/options";
import CricketTournamentModel from "@/app/models/CricketTournament";
export async function POST(req: NextRequest) {
     const searchParams = new URL(req.url).searchParams;
     const session = await getServerSession(authOptions);
    const user = session?.user;
    if(!user || !user.id){
        return NextResponse.json({ message: 'Unauthorized' }, { status: 401 });
    }
    // console.log("User ID:", user.id);   
    const tournamentId = searchParams.get("tournamentId");  
    try {
        const body = await req.json();
        const { teamName, contact, email, owner, players, substitutes, captain, viceCaptain } = body;
        // console.log("Received data:", {
        //     teamName, contact, email, owner, players, substitutes, captain, viceCaptain
        // });
        const tournament = await CricketTournamentModel.findById(tournamentId);
        if (!tournament) {
            return NextResponse.json({ message: 'Tournament not found' }, { status: 404 });
        }
        if (!teamName || !players || players.length < 11 || !substitutes || substitutes.length < 2) {
            return NextResponse.json({ message: 'Invalid input' }, { status: 400 });
        }
        const team = await TeamModel.create({
            tournamentId: tournamentId,
            userId: user.id,
            owner: owner,
            contact: contact,
            email: email,
            name: teamName,
            players: players,
            pending : true,
            substitutes: substitutes,
            captain: captain,
            viceCaptain: viceCaptain
        });
        await CricketTournamentModel.findByIdAndUpdate(tournamentId, {
            $push: {
                pendingTeams: team._id
            }
        }); 
        return NextResponse.json({ message: 'Team registration successful' }, { status: 200 });
    } catch (error) {
        console.error('Error processing request:', error);
        return NextResponse.json({ message: 'Internal Server Error' }, { status: 500 });
    }
}