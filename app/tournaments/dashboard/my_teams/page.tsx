import Link from "next/link";
import { Card, CardContent } from "@/components/ui/card";
import { User, Star, Crown, RotateCcw } from "lucide-react";
import { getServerSession } from "next-auth";
import authOptions from "@/app/api/auth/[...nextauth]/options";
interface Player {
  name: string;
  role: string;
  jersey: number;
  contact: string;
}

interface Teams {
  _id: string;
  name: string;
  owner: string;
  players: Player[];
  substitutes: Player[];
  captain: Player;
  viceCaptain: Player;
  points: number;
  runRate: number;
  pending: boolean;
}

interface Props {
  searchParams: {
    tournamentId: string;
  };
}

export default async function Teams() {
    const session = await getServerSession(authOptions);
    console.log("Session in my teams page: ", session?.user);
    const res = await fetch(`${process.env.NEXT_PUBLIC_BASE_URL}/api/tournaments/my_teams?userId=${session?.user.id}`, {
    cache: "no-store", // prevent caching
    method: "GET",
    credentials: "include", // include cookies for session
  });
  if (!res.ok) {
    return (
      <div className="h-screen flex justify-center items-center px-4">
        <Card className="p-6 max-w-md w-full rounded-xl shadow-lg">
          <CardContent className="space-y-4 text-center">
            <h2 className="text-xl font-semibold text-red-600">Error Loading Teams</h2>
            <p className="text-gray-600">Please try again later.</p>
          </CardContent>
        </Card>
      </div>
    );
  }
  const data = await res.json();
  const teams: Teams[] = data.teams;
  if (teams.length === 0) {
    return (
      <div className="h-screen flex justify-center items-center px-4">
        <Card className="p-6 max-w-md w-full rounded-xl shadow-lg">
          <CardContent className="space-y-4 text-center">
            <h2 className="text-xl font-semibold text-red-600">No Teams Found</h2>
            <p className="text-gray-600">You haven't created any teams for this tournament.</p>
          </CardContent>
        </Card>
      </div>
    );
  }

  return (
    <div className="flex flex-col gap-6 p-4 max-w-full">
      {teams.map((team, i) => (
        <Card key={i} className="w-full md:w-4xl mx-auto rounded shadow-lg p-6 bg-white">
          <CardContent className="space-y-4">
            {team.pending && (
              <div className="bg-yellow-100 text-yellow-800 p-4 rounded-md mb-4 flex items-center gap-2">
                <p className="text-sm">This team is pending approval.</p>
              </div>
            )}

            <div className="text-center">
              <h2 className="text-2xl font-bold text-gray-800">{team.name}</h2>
              <p className="text-sm text-gray-500">Team Overview</p>
            </div>

            <div className="space-y-2 text-sm text-gray-700">
              <div className="flex items-center gap-2">
                <User className="h-4 w-4 text-blue-500" />
                <span><strong>Owner:</strong> {team.owner}</span>
              </div>
              <div className="flex items-center gap-2">
                <Star className="h-4 w-4 text-yellow-500" />
                <span><strong>Points:</strong> {team.points}</span>
              </div>
              <div className="flex items-center gap-2">
                <Crown className="h-4 w-4 text-purple-500" />
                <span><strong>Captain:</strong> {team.captain.name}</span>
              </div>
            </div>

            {/* You can add client-side buttons in a nested client component if needed */}
          </CardContent>
        </Card>
      ))}
    </div>
  );
}
