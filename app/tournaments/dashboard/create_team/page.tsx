'use client'
import React, { useState } from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import { motion } from "framer-motion";
import { Crown, Star, Vault } from "lucide-react";
import { CheckCircle2 } from "lucide-react";
import Link from "next/link";
import Image from "next/image";
import Images from "@/app/Images";
const playerColors = [
  "bg-blue-100",
  "bg-red-100",
  "bg-yellow-100",
  "bg-green-100",
  "bg-purple-100",
  "bg-pink-100",
  "bg-indigo-100",
  "bg-teal-100",
  "bg-orange-100",
  "bg-cyan-100",
  "bg-lime-100"
];

const TeamRegistrationForm = () => {
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
  const [teamName, setTeamName] = useState<string>("")
  const [owner,setOwner] = useState<string>("")
  const [contact, setContact] = useState<string>("")
  const [email, setEmail] = useState<string>("")
  const [loading, setLoading] = useState<boolean>(false)
  const [created, setCreate] = useState<boolean>(false)
  const handleChange = (
    index: number,
    field: string,
    value: string,
    isSub: boolean = false
  ) => {
    const list = isSub ? [...substitutes] : [...players];
    list[index][field as "name"] = value;
    isSub ? setSubstitutes(list) : setPlayers(list);
  };

  const handleSubmit = async() => {
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
    console.log("Team Data:", teamData);
    setLoading(true)
    const response = await fetch('/api/tournaments/create_team',{
      method : "POST",
      headers : {
        'Content-Type' : "application/json"
      },
      body : JSON.stringify(teamData)
    })
    setLoading(false)
    setCreate(true)
    const res = await response.json()
    console.log(res)
  };
  if(loading){
    return(
      <div>
        <div className="flex items-center justify-center min-h-screen">
        <div className="animate-spin rounded-full h-16 w-16 border-b-2 border-blue-500"></div>
      </div>
      </div>
    )
  }
    if (created) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-100 px-4">
      <Card className="w-full max-w-md shadow-md border border-gray-200">
        <CardContent className="py-8 text-center space-y-4">
              <CheckCircle2 className="h-10 w-10 text-green-600 mx-auto" />
              <h2 className="text-xl font-semibold text-green-700">TEAM CREATED SUCCESSFULLY</h2>
              <p className="text-gray-600">Now you can create next teams</p>
              <Link href="/tournaments/myTeam">
              <Button className="mt-4 cursor-pointer">Go to Dashboard</Button>
              </Link>
        </CardContent>
      </Card>
    </div>
    )
  }
  return (
    <div className="p-6 bg-gradient-to-b from-white to-sky-50 min-h-screen">
      <h1 className="text-4xl font-extrabold mb-8 text-center text-sky-700 drop-shadow-sm">
        🏏 Team Registration
      </h1>
      <div className="border-4 rounded-xl mt-2 border-rose-300 grid grid-cols-2 gap-4 mb-4 p-6">
            <Input value={teamName} onChange={(e)=>setTeamName(e.target.value)} placeholder="TEAM NAME" type="text"/>
            <Input value={owner} onChange={(e)=>setOwner(e.target.value)} placeholder="OWNER NAME" type="text" />
            <Input value={contact} onChange={(e)=>setContact(e.target.value)} placeholder="CONTACT NUMBER" type="text"/>
            <Input value={email} onChange={(e)=>setEmail(e.target.value)} placeholder="OWNER EMAIL" type="text"/>          
        </div>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">        
        {players.map((player, index) => (
          <motion.div
            key={index}
            whileHover={{ scale: 1.02 }}
            className={`rounded-xl shadow-md p-4 transition ${playerColors[index % playerColors.length]}`}
          >
            <Card className="p-4">
              <CardContent>
                <div className="flex items-center mb-2">
                  <Image
                    src={Images[index]}
                    alt="Player"
                    width={40}
                    height={40}
                    className="rounded-full mr-2"
                  />
                  <h2 className="text-lg font-semibold text-sky-700">
                    Player {index + 1}
                  </h2>
                </div>
                <div className="grid grid-cols-2 gap-3">
                  <div>
                    <Label className="mb-2">Name</Label>
                    <Input
                      value={player.name}
                      onChange={(e) => handleChange(index, "name", e.target.value)}
                    />
                  </div>
                  <div>
                    <Label className="mb-2">Age</Label>
                    <Input
                      value={player.age}
                      onChange={(e) => handleChange(index, "age", e.target.value)}
                    />
                  </div>
                  <div>
                    <Label className="mb-2">Jersey Number</Label>
                    <Input
                      value={player.jersey}
                      onChange={(e) => handleChange(index, "jersey", e.target.value)}
                    />
                  </div>
                  <div>
                    <Label className="mb-2">Contact</Label>
                    <Input
                      value={player.contact}
                      onChange={(e) => handleChange(index, "contact", e.target.value)}
                    />
                  </div>
                  <div className="col-span-2">
                    <Label className="mb-2">Role</Label>
                    <select defaultValue={"Batsman"} onChange={(e)=>handleChange(index,"role",e.target.value)} className="rounded p-2 border border-red-300" name="" id="">
                      <option  value="Batsman">Batsman</option>
                      <option value="Bowlar">Bowlar</option>
                      <option value="AllRounder">AllRounder</option>
                      <option value="Wicket Keeper Batsman"></option>
                    </select>
                  </div>
                </div>
                <div className="mt-4 flex gap-3">
                  <Button
                    variant={captainIndex === index ? "default" : "outline"}
                    onClick={() => setCaptainIndex(index)}
                    className="text-sky-700 border-sky-300 hover:bg-sky-200"
                  >
                    <Crown className="mr-2 h-4 w-4" /> Captain
                  </Button>
                  <Button
                    variant={viceCaptainIndex === index ? "default" : "outline"}
                    onClick={() => setViceCaptainIndex(index)}
                    className="text-yellow-700 border-yellow-300 hover:bg-yellow-200"
                  >
                    <Star className="mr-2 h-4 w-4" /> Vice Captain
                  </Button>
                </div>
              </CardContent>
            </Card>
          </motion.div>
        ))}
      </div>

      <h2 className="text-2xl font-bold mt-10 mb-4 text-sky-600 border-b pb-2">Substitute Players</h2>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {substitutes.map((sub, index) => (
          <Card key={index} className="bg-slate-50 p-4 border border-gray-200 shadow-sm hover:shadow-md transition">
            <CardContent>
              <div className="flex items-center mb-2">
                <Image
                  src="/Kuldeep.jpg"
                  alt="Substitute"
                  width={40}
                  height={40}
                  className="rounded-full mr-2"
                />
                <h3 className="text-lg font-semibold text-gray-700">
                  Substitute {index + 1}
                </h3>
              </div>
              <div className="grid grid-cols-2 gap-3">
                <div>
                  <Label className="mb-2">Name</Label>
                  <Input
                    value={sub.name}
                    onChange={(e) => handleChange(index, "name", e.target.value, true)}
                  />
                </div>
                <div>
                  <Label className="mb-2">Age</Label>
                  <Input
                    value={sub.age}
                    onChange={(e) => handleChange(index, "age", e.target.value, true)}
                  />
                </div>
                <div>
                  <Label className="mb-2">Jersey Number</Label>
                  <Input
                    value={sub.jersey}
                    onChange={(e) => handleChange(index, "jersey", e.target.value, true)}
                  />
                </div>
                <div>
                  <Label className="mb-2">Contact</Label>
                  <Input
                    value={sub.contact}
                    onChange={(e) => handleChange(index, "contact", e.target.value, true)}
                  />
                </div>
                <div className="col-span-2">
                  <Label className="mb-2">Role</Label>
                  <Input
                    value={sub.role}
                    onChange={(e) => handleChange(index, "role", e.target.value, true)}
                  />
                </div>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      <div className="mt-10 text-center">
        <Button
          onClick={handleSubmit}
          className="bg-sky-600 hover:bg-sky-700 text-white px-8 py-3 rounded-full text-lg shadow-md"
        >
          ✅ Submit Team
        </Button>
      </div>
    </div>
  );
};

export default TeamRegistrationForm;
