// lib/tournaments.ts
import { cookies } from "next/headers"
const cookieStore = cookies()
interface tournament {
  name: string,
  description: string,
  city: string,
  venue: string,
  startDate: Date,
  endDate: Date,
  createdAt: string,
  updatedAt: Date | string,
  fees: number,
  ballType: string,
  over: number,
  isActive: boolean,
  number: string,
  organizerId: string,
  organizerName: string,
  teams: number,
  resgistrationDate: Date,
}

export async function getMyTournaments(): Promise<tournament[]> {
  // Ideally, you'd use Prisma or direct DB access here
  const res = await fetch(`http://localhost:3000/api/tournaments/myTournament`,{
    headers : {
        Cookie : (await cookieStore).toString()
    }
  });
  if (!res.ok) throw new Error('Failed to fetch tournaments');
  const json = await res.json();
  return json.tournaments;
}
