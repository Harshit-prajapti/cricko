"use client";

import React, { useState } from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import { motion, number } from "framer-motion";
import { Crown, Star, CheckCircle2 } from "lucide-react";
import { useSearchParams } from "next/navigation";
import Link from "next/link";
import Image from "next/image";
import Images from "@/app/Images";

const TeamRegistrationForm = () => {
  const searchParams = useSearchParams();
  const tournamentId = searchParams.get("tournamentId");

  const [players, setPlayers] = useState(
    Array.from({ length: 11 }, () => ({
      name: "",
      age: "",
      jersey: "",
      contact: "",
      role: "Batsman"
    }))
  );

  const [substitutes, setSubstitutes] = useState(
    Array.from({ length: 2 }, () => ({
      name: "",
      age: "",
      jersey: "",
      contact: "",
      role: ""
    }))
  );

  const [captainIndex, setCaptainIndex] = useState<number | null>(null);
  const [viceCaptainIndex, setViceCaptainIndex] = useState<number | null>(null);
  const [teamName, setTeamName] = useState("");
  const [owner, setOwner] = useState("");
  const [contact, setContact] = useState("");
  const [email, setEmail] = useState("");
  const [loading, setLoading] = useState(false);
  const [created, setCreate] = useState(false);
  const [notCreated, setNotCreated] = useState(false);

  const handleChange = (index : number, field : string, value : string, isSub = false) => {
    const list = isSub ? [...substitutes] : [...players];
    list[index][field as "name"] = value;
    isSub ? setSubstitutes(list) : setPlayers(list);
  };

  const handleSubmit = async () => {
    const teamData = {
      teamName,
      owner,
      contact,
      email,
      players,
      substitutes,
      captain: captainIndex !== null ? players[captainIndex] : null,
      viceCaptain: viceCaptainIndex !== null ? players[viceCaptainIndex] : null
    };
    setLoading(true);
    const response = await fetch(`/api/tournaments/apply_team?tournamentId=${tournamentId}`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(teamData)
    });
    setLoading(false);
    response.status === 200 ? setCreate(true) : setNotCreated(true);
  };

  if (loading) return <div className="flex justify-center items-center min-h-screen"><div className="animate-spin h-12 w-12 border-4 border-blue-500 border-t-transparent rounded-full"></div></div>;

  if (created || notCreated) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-50">
        <Card className="w-full max-w-md border border-gray-200">
          <CardContent className="py-8 text-center">
            <CheckCircle2 className={`mx-auto h-12 w-12 ${created ? "text-green-600" : "text-red-600"}`} />
            <h2 className={`text-xl font-semibold ${created ? "text-green-700" : "text-red-700"}`}>
              {created ? "Team Applied Successfully" : "Something Went Wrong"}
            </h2>
            <p className="text-gray-500">
              {created ? "Please wait until the Tournament organizer accepts your team" : "Team is not created successfully."}
            </p>
            {created && (
              <p className="text-gray-500 mt-2">Your team is under review. The Owner will contact you through your registered email.</p>
            )}
            <Link href={created ? `/tournaments/dashboard/tournament_teams?tournamentId=${tournamentId}` : "/tournaments/dashboard/my_tournaments"}>
              <Button className="mt-4">{created ? "View Teams" : "Go to Dashboard"}</Button>
            </Link>
          </CardContent>
        </Card>
      </div>
    );
  }

  return (
    <div className="min-h-screen px-4 py-10 bg-white">
      <h1 className="text-3xl font-bold text-center text-orange-600 mb-10">🏏 Team Registration</h1>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
        <Input placeholder="Team Name" value={teamName} onChange={(e) => setTeamName(e.target.value)} />
        <Input placeholder="Owner Name" value={owner} onChange={(e) => setOwner(e.target.value)} />
        <Input placeholder="Contact Number" value={contact} onChange={(e) => setContact(e.target.value)} />
        <Input placeholder="Owner Email" value={email} onChange={(e) => setEmail(e.target.value)} />
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {players.map((player, index) => (
          <motion.div key={index} whileHover={{ scale: 1.02 }} className="bg-gray-50 rounded-xl shadow-sm">
            <Card className="p-4">
              <CardContent>
                <div className="flex items-center mb-4">
                  <Image src={Images[index]} alt={`Player ${index + 1}`} width={40} height={40} className="rounded-full mr-2" />
                  <h2 className="text-lg font-semibold text-gray-700">Player {index + 1}</h2>
                </div>
                <div className="grid grid-cols-2 gap-3">
                  <Input placeholder="Name" value={player.name} onChange={(e) => handleChange(index, "name", e.target.value)} />
                  <Input placeholder="Age" value={player.age} onChange={(e) => handleChange(index, "age", e.target.value)} />
                  <Input placeholder="Jersey" value={player.jersey} onChange={(e) => handleChange(index, "jersey", e.target.value)} />
                  <Input placeholder="Contact" value={player.contact} onChange={(e) => handleChange(index, "contact", e.target.value)} />
                  <select defaultValue={player.role} onChange={(e) => handleChange(index, "role", e.target.value)} className="col-span-2 border rounded p-2">
                    <option value="Batsman">Batsman</option>
                    <option value="Bowler">Bowler</option>
                    <option value="AllRounder">AllRounder</option>
                    <option value="Wicket Keeper Batsman">Wicket Keeper Batsman</option>
                  </select>
                </div>
                <div className="mt-4 flex gap-3">
                  <Button variant={captainIndex === index ? "default" : "outline"} onClick={() => setCaptainIndex(index)}>
                    <Crown className="mr-1 h-4 w-4" /> Captain
                  </Button>
                  <Button variant={viceCaptainIndex === index ? "default" : "outline"} onClick={() => setViceCaptainIndex(index)}>
                    <Star className="mr-1 h-4 w-4" /> Vice Captain
                  </Button>
                </div>
              </CardContent>
            </Card>
          </motion.div>
        ))}
      </div>

      <h2 className="text-2xl font-semibold mt-10 mb-4 text-sky-600">Substitute Players</h2>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {substitutes.map((sub, index) => (
          <Card key={index} className="bg-gray-50 p-4 border border-gray-200 shadow-sm">
            <CardContent>
              <div className="flex items-center mb-4">
                <Image src="/Kuldeep.jpg" alt="Substitute" width={40} height={40} className="rounded-full mr-2" />
                <h3 className="text-lg font-semibold text-gray-700">Substitute {index + 1}</h3>
              </div>
              <div className="grid grid-cols-2 gap-3">
                <Input placeholder="Name" value={sub.name} onChange={(e) => handleChange(index, "name", e.target.value, true)} />
                <Input placeholder="Age" value={sub.age} onChange={(e) => handleChange(index, "age", e.target.value, true)} />
                <Input placeholder="Jersey" value={sub.jersey} onChange={(e) => handleChange(index, "jersey", e.target.value, true)} />
                <Input placeholder="Contact" value={sub.contact} onChange={(e) => handleChange(index, "contact", e.target.value, true)} />
                <Input placeholder="Role" value={sub.role} onChange={(e) => handleChange(index, "role", e.target.value, true)} className="col-span-2" />
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      <div className="text-center mt-10">
        <Button onClick={handleSubmit} className="bg-amber-600 hover:bg-sky-700 text-white px-8 py-3 rounded-full text-lg shadow-md">
          Apply
        </Button>
      </div>
    </div>
  );
};

export default TeamRegistrationForm;
