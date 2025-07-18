// app/tournaments/dashboard/teams/page.tsx (example location)
import Link from "next/link";
import { Card, CardContent } from "@/components/ui/card";
import { User, Star, Crown, RotateCcw } from "lucide-react";
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

export default async function Teams({ searchParams }: Props) {
  const tournamentId = await searchParams.tournamentId;

  const res = await fetch(`${process.env.NEXT_PUBLIC_BASE_URL}/api/tournaments/tournament_teams?tournamentId=${tournamentId}`, {
    cache: "no-store", // prevent caching
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
  const totalTeam: number = data.totalTeams;

  if (teams.length === 0) {
    return (
      <div className="h-screen flex justify-center items-center px-4">
        <Card className="p-6 max-w-md w-full rounded-xl shadow-lg">
          <CardContent className="space-y-4 text-center">
            <h2 className="text-xl font-semibold text-red-600">No Teams Found</h2>
            <p className="text-gray-600">You haven't created any teams for this tournament.</p>
            <Link href={`/tournaments/dashboard/create_team?tournamentId=${tournamentId}`}>
              <button className="mt-2 bg-blue-600 text-white py-2 px-4 rounded">Create Team</button>
            </Link>
          </CardContent>
        </Card>
      </div>
    );
  }

  return (
    <div className="flex flex-col gap-6 p-4 max-w-full">
      <div className="md:flex md:flex-row md:justify-between">
        <h1 className="text-green-600 font-semibold text-2xl">Total Teams In The Tournament: {totalTeam}</h1>
        <h1 className="text-indigo-700 font-semibold text-2xl">Teams Created Yet: {teams.length}</h1>
      </div>

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

      {totalTeam > teams.length ? (
        <div className="flex justify-center w-full items-center px-4">
          <Card className="p-6 max-w-md w-full rounded-xl shadow-lg">
            <CardContent className="space-y-4 text-center">
              <h2 className="text-xl font-semibold text-red-600">You Need To Add More Teams In The Tournament</h2>
              <Link href={`/tournaments/dashboard/create_team?tournamentId=${tournamentId}`}>
                <button className="mt-2 bg-blue-600 text-white py-2 px-4 rounded">Add Team</button>
              </Link>
            </CardContent>
          </Card>
        </div>
      ) : (
        <div className="justify-center w-full items-center px-4">
          <Card className="p-6 max-w-md w-full rounded-xl shadow-lg">
            <CardContent className="space-y-4 text-center">
              <h2 className="text-xl font-semibold text-green-600">All Teams Are Added</h2>
              <p>Now You Can Close The Registration</p>
            </CardContent>
          </Card>
        </div>
      )}
    </div>
  );
}
