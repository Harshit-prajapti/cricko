import { NextRequest, NextResponse } from "next/server";
import CricketTournamentModel from "@/app/models/CricketTournament";
import { getServerSession } from "next-auth";
import { authOptions } from "@/app/api/auth/[...nextauth]/options"
import UserModel from "@/app/models/UserModel";
export async function POST(request : NextRequest){
    const session = await getServerSession(authOptions);
    if (!session){
        return NextResponse.json({
            message: "Unauthorized",
        }, { status: 401 });
    }
    const user = session?.user;
    if(!user){
        return NextResponse.json({
            message: "User not found",
        }, { status: 404 });
    }
    const {name, startDate, endDate, venue, description, sport,city,number,ballType,fees,organizerName,over,resgistrationDate,teams} = await request.json();
    // console.log("Received data:", {
        // name,startDate, endDate, venue, description, sport,city,number,ballType,fees,organizerName})
    const Tournament = await CricketTournamentModel.create({
        name,
        resgistrationDate : new Date(resgistrationDate),
        startDate: new Date(startDate),
        endDate: new Date(endDate),
        teams : parseInt(teams),
        venue,
        description,
        over,
        sport,
        city,
        number,
        ballType,
        fees: parseFloat(fees),
        organizerName,
        organizerId: user.id,
        isActive: false,
    })
    await UserModel.findByIdAndUpdate(user.id,{
        role : "organizer",
        new : true
    })
    return NextResponse.json({
        message: "Tournament created successfully : ",Tournament},{ status: 201 });
}