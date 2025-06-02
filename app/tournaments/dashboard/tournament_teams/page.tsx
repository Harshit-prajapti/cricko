"use client";

import Link from "next/link";
import { useEffect, useState, useCallback } from "react";
import { useSearchParams } from "next/navigation";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { User, Star, Crown, RotateCcw } from "lucide-react";
import Image from "next/image";
import Images from "@/app/Images";
interface Player {
  name: string;
  role: string;
  jersey: number;
  contact: string;
}

interface Teams {
  name: string;
  owner: string;
  players: Player[];
  substitutes: Player[];
  captain: Player;
  viceCaptain: Player;
  points: number;
  runRate: number;
}

export default function Teams() {
  const searchParams = useSearchParams();
  const tournamentId = searchParams.get("tournamentId");
  const [teams, setTeams] = useState<Teams[]>([]);
  const [index, setIndex] = useState<number>();
  const [loading, setLoading] = useState<boolean>(true);
  const [totalTeam, setTotalTeam] = useState<number>()
  const fetchData = useCallback(async () => {
    setLoading(true);
    const res = await fetch(`/api/tournaments/my_teams?tournamentId=${tournamentId}`, { method: "GET" });

    if (res.status !== 200) {
      console.error("Team not found");
      setLoading(false);
      return;
    }
    const data = await res.json();
    console.log("this is the data : ",data)
    setTeams(data.teams);
    setLoading(false);
  }, [tournamentId]);

  useEffect(() => {
    fetchData();
  }, [fetchData]);

  if (loading) {
    return <div className="text-center mt-20 text-gray-500">Loading teams...</div>;
  }

  if (teams.length === 0) {
    return (
      <div className="h-screen flex justify-center items-center px-4">
        <Card className="p-6 max-w-md w-full rounded-xl shadow-lg">
          <CardContent className="space-y-4 text-center">
            <h2 className="text-xl font-semibold text-red-600">No Teams Found</h2>
            <p className="text-gray-600">You haven't created any teams for this tournament.</p>
            <Link href="/tournaments/dashboard/create_team">
              <Button className="cursor-pointer">Create Team</Button>
            </Link>
          </CardContent>
        </Card>
      </div>
    );
  }

  if (index !== undefined) {
    const team = teams[index];
    return (
      <div className="min-h-screen bg-gradient-to-br from-slate-50 to-blue-50 px-4 py-10">
        <div className="max-w-6xl mx-auto">
          <h1 className="text-5xl font-bold text-center text-blue-900 mb-12 drop-shadow-md">{team.name}</h1>

          <section>
            <h2 className="text-2xl font-semibold mb-6 text-blue-700">Main Squad</h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-8">
              {team.players.map((player : Player, i) => (
                <div key={i} className="bg-white shadow-xl rounded-2xl p-6 text-center hover:shadow-2xl">
                  <div className="w-28 h-28 mx-auto relative mb-4">
                    <Image
                      src={Images[i]}
                      alt={player.name}
                      className="rounded-full object-cover border-4 border-blue-300"
                      fill
                    />
                  </div>
                  <h1 className="text-orange-600">{player.name}</h1>
                  <p className="text-sm text-gray-500">{player.role}</p>
                  <p className="text-sm text-gray-600 mt-1"># {player.jersey}</p>
                  <p className="text-sm text-gray-700 mt-2">{player.contact}</p>
                </div>
              ))}
            </div>
          </section>

          {team.substitutes.length > 0 && (
            <section className="mt-16">
              <h2 className="text-2xl font-semibold mb-6 text-blue-700 flex items-center gap-2">
                <RotateCcw className="w-5 h-5" />
                Substitutes
              </h2>
              <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-8">
                {team.substitutes.map((player, i) => (
                  <div key={i} className="bg-gray-100 shadow-md rounded-2xl p-6 text-center">
                    <div className="w-24 h-24 mx-auto relative mb-4">
                      <Image
                        src="/Bum.jpg"
                        alt={player.name}
                        className="rounded-full object-cover border-2 border-gray-300"
                        fill
                      />
                    </div>
                    <h2 className="text-md font-semibold text-gray-800">{player.name}</h2>
                    <p className="text-sm text-gray-500">{player.role}</p>
                    <p className="text-sm text-gray-600 mt-1"># {player.jersey}</p>
                    <p className="text-sm text-gray-700 mt-2">{player.contact}</p>
                  </div>
                ))}
              </div>
            </section>
          )}
        </div>
      </div>
    );
  }

  return (
    <div className="flex flex-col gap-6 p-4">
      {teams.map((team, i) => (
        <Card key={i} className="w-full md:w-4xl mx-auto rounded-2xl shadow-lg p-6 bg-white">
          <CardContent className="space-y-4">
            <div className="text-center">
              <h2 className="text-2xl font-bold text-gray-800">{team.name}</h2>
              <p className="text-sm text-gray-500">Team Overview</p>
            </div>

            <div className="space-y-2 text-sm text-gray-700">
              <div className="flex items-center gap-2">
                <User className="h-4 w-4 text-blue-500" />
                <span>
                  <strong>Owner:</strong> {team.owner}
                </span>
              </div>
              <div className="flex items-center gap-2">
                <Star className="h-4 w-4 text-yellow-500" />
                <span>
                  <strong>Points:</strong> {team.points}
                </span>
              </div>
              <div className="flex items-center gap-2">
                <Crown className="h-4 w-4 text-purple-500" />
                <span>
                  <strong>Captain:</strong> {team.captain.name}
                </span>
              </div>
            </div>

            <div className="text-center">
              <Button onClick={() => setIndex(i)} className="mt-2">
                More Details
              </Button>
            </div>
          </CardContent>
        </Card>
      ))}
    </div>
  );
}
