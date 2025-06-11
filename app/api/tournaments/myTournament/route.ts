import { NextResponse } from 'next/server';
import { getServerSession } from 'next-auth';
import { authOptions } from '@/app/api/auth/[...nextauth]/options';
import CricketTournamentModel from '@/app/models/CricketTournament';
export async function GET() {
    const session = await getServerSession(authOptions);
    console.log(session)
    if (!session) { 
        return NextResponse.json({
            message: 'Unauthorized',
        }, { status: 400 });
    }
    const user = session?.user;
    if (!user) {
        return NextResponse.json({
            message: 'User not found',
        }, { status: 404 });
    }
    const tournaments = await CricketTournamentModel.find({ organizerId: user.id }).sort({ createdAt: -1 });
    if (!tournaments || tournaments.length === 0) {
        return NextResponse.json({
            message: 'No tournaments found for this user',
        }, { status: 404 });
    }
    return NextResponse.json({tournaments: tournaments,}, { status: 200 });
}