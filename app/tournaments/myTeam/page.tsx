'use client';

import React, { useState, useEffect } from 'react';
import Image from 'next/image';
import { RotateCcw } from 'lucide-react';

interface Player {
  name: string;
  role: string;
  jersey: number;
  contact: string;
}

interface Team {
  name: string;
  owner: string;
  players: Player[];
  substitutes: Player[];
  captain: Player;
  viceCaptain: Player;
}

export default function TeamPage() {
  const [name, setName] = useState('');
  const [owner, setOwner] = useState('');
  const [players, setPlayers] = useState<Player[]>([]);
  const [substitutes, setSubstitutes] = useState<Player[]>([]);
  const [captain, setCaptain] = useState<Player>();
  const [viceCaptain, setViceCaptain] = useState<Player>();
  
  const fetchData = async () => {
    const res = await fetch('/api/tournaments/my_teams', {
      method: 'GET',
    });

    if (res.status !== 200) {
      console.error('Team not found');
      return;
    }

    const team: Team[] = await res.json();
    setName(team[0].name);
    setOwner(team[0].owner);
    setPlayers(team[0].players);
    setCaptain(team[0].captain);
    setViceCaptain(team[0].viceCaptain);
    setSubstitutes(team[0].substitutes);
    console.log("Team ", team)
  };

  useEffect(() => {
    fetchData();
  }, []);

  const isCaptain = (player: Player) =>
    player.name === captain?.name &&
    player.jersey === captain?.jersey;

  const isViceCaptain = (player: Player) =>
    player.name === viceCaptain?.name &&
    player.jersey === viceCaptain?.jersey;

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 to-blue-50 px-4 py-10">
      <div className="max-w-6xl mx-auto">
        <h1 className="text-5xl font-bold text-center text-blue-900 mb-12 drop-shadow-md">
          {name}
        </h1>

        <section>
          <h2 className="text-2xl font-semibold mb-6 text-blue-700">Main Squad</h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-8">
            {players.map((player, index) => (
              <div
                key={index}
                className="bg-white shadow-xl rounded-2xl p-6 text-center hover:shadow-2xl transition-shadow duration-300"
              >
                <div className="w-28 h-28 mx-auto relative mb-4">
                  <Image
                    src="/rohit.jpg" // Ideally this should come from player.avatar
                    alt={player.name}
                    className="rounded-full object-cover border-4 border-blue-300"
                    fill
                    priority
                  />
                </div>
                <h2 className="text-lg font-semibold text-gray-800 flex items-center justify-center gap-2 flex-wrap">
                  {player.name}
                  {isCaptain(player) && (
                    <span className="bg-blue-100 text-blue-800 text-xs px-2 py-1 rounded-full">
                      Captain
                    </span>
                  )}
                  {isViceCaptain(player) && (
                    <span className="bg-yellow-100 text-yellow-800 text-xs px-2 py-1 rounded-full">
                      Vice-Captain
                    </span>
                  )}
                </h2>
                <p className="text-sm text-gray-500">{player.role}</p>
                <p className="text-sm text-gray-600 mt-1"># {player.jersey}</p>
                <p className="text-sm text-gray-700 mt-2">{player.contact}</p>
              </div>
            ))}
          </div>
        </section>

        {substitutes && substitutes.length > 0 && (
          <section className="mt-16">
            <h2 className="text-2xl font-semibold mb-6 text-blue-700 flex items-center gap-2">
              <RotateCcw className="w-5 h-5" />
              Substitutes
            </h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-8">
              {substitutes.map((player, index) => (
                <div
                  key={index}
                  className="bg-gray-100 shadow-md rounded-2xl p-6 text-center"
                >
                  <div className="w-24 h-24 mx-auto relative mb-4">
                    <Image
                      src="/rohit.jpg"
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
