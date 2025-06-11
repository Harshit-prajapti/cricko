import { NextRequest } from 'next/server';
import { NextResponse } from 'next/server';
import TeamModel from '@/app/models/Teams';
import CricketTournamentModel from '@/app/models/CricketTournament';
export async function GET(req: NextRequest) {
    const searchParams = new URL(req.url).searchParams;
    const tournamentId = searchParams.get("tournamentId");    
    if (!tournamentId) {
        return NextResponse.json({ message: 'Tournament ID is required' }, { status: 400 });
    }
    const tournament = await CricketTournamentModel.findById(tournamentId);
    if (!tournament) {
        return NextResponse.json({ message: 'Tournament not found' }, { status: 404 });
    }
    const teams = await TeamModel.find({ tournamentId });
    if (!teams || teams.length === 0) {
        return NextResponse.json({ message: 'No teams found for this tournament' }, { status: 404 });
    }
    return NextResponse.json({"teams": teams,"totalTeams" : tournament.teams},{status : 200})
}