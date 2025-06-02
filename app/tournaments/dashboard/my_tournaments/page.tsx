'use client'
import axios from 'axios'
import React, { useEffect, useState } from 'react'
import { Badge } from '@/components/ui/badge';
import { Separator } from '@/components/ui/separator';
import { CalendarDays, MapPin, Phone, Router, User } from "lucide-react"
import { Card, CardContent, } from '@/components/ui/card';
import { CrossIcon } from 'lucide-react';
import { Button } from '@/components/ui/button';
// import { useRouter } from 'next/router';
import Link from 'next/link';
interface tournament{
  _id : string
  name: string,
  description: string,
  city: string,
  venue: string,
  startDate: Date,
  endDate: Date,
  createdAt: string ,
  updatedAt: Date | string,
  fees: number,
  ballType: string,
  over: number,
  isActive: boolean,
  number: string,
  organizerId: string,
  organizerName: string,
  teams : number,
  resgistrationDate : Date,
}
const page = () => {
  // const router = useRouter();
  const [error, setError] = useState<string | null>(null)
  const [loading, setLoading] = useState<boolean>(true)
  const [NotFound,setNotFound] = useState<boolean>(false)
    const [tournaments, setTournaments] = useState<tournament[]>([])
    const fetchTournaments = async () => {
      setLoading(true)
        const data  = await fetch('/api/tournaments/myTournament',{
          method : "GET"
        })
        console.log(data)
        if(data.status!== 200) {
          console.log( "This is the Response " , data)
          setLoading(false)
          setNotFound(true)         
        }
        if(data.ok){
          const res = await data.json()
          console.log("This is the response : ",res)
          setLoading(false)
          setTournaments(res.tournaments)
          setError(null) 
        }
    }
    useEffect(()=>{
        fetchTournaments()
    },[])
    if(loading) {
        return (
            <div className="flex items-center justify-center min-h-screen">
        <div className="animate-spin rounded-full h-16 w-16 border-b-2 border-blue-500"></div>
      </div>
        )
    }
    if(NotFound){
      return(
        <div className="min-h-screen flex items-center mb-10 justify-center bg-gray-100 px-4">
      <Card className="w-full max-w-md shadow-md border border-gray-200">
        <CardContent className="py-8 text-center space-y-4">
              <CrossIcon className="h-10 w-10 text-red-600 mx-auto" />
              <h2 className="text-xl font-semibold text-red-700">No Tournament Found</h2>
              <p className="text-gray-600">Please Create a Tournament first</p>
              <Link href="/tournaments/dashboard/add">
              <Button className="mt-4 cursor-pointer">CREATE</Button>
              </Link>
        </CardContent>
      </Card>
    </div>
      )      
    }
    return (
      <div className=''>
        {tournaments.map((tournament, index) => (
          <div key={index} className="max-w-5xl mx-auto md:p-10 mb-5">
      <div className="bg-white shadow-md rounded border border-gray-200 p-6 md:p-10">
        {/* Header */}
        <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
          <h1 className="text-3xl md:text-4xl font-semibold text-gray-800">
            {tournament.name}
          </h1>
          <Badge
            className={`text-sm md:text-base px-3 py-1 rounded-xl ${
              tournament.isActive ? "bg-green-600" : "bg-red-500"
            } text-white`}
          >
            {tournament.isActive ? "Active" : "Inactive"}
          </Badge>
        </div>

        <p className="mt-3 text-gray-600 text-base md:text-lg leading-relaxed">
          {tournament.description}
        </p>

        <Separator className="my-6" />

        {/* Info Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-x-8 gap-y-6 text-gray-700 text-base md:text-lg">
          <InfoItem icon={<MapPin className="text-blue-600 w-5 h-5" />} label="City" value={tournament.city} />
          <InfoItem icon={<MapPin className="text-purple-600 w-5 h-5" />} label="Venue" value={tournament.venue} />
          <InfoItem icon={<User className="text-purple-600 w-5 h-5" />} label="Total Teams" value={tournament.teams ? tournament.teams.toString() : "Not Defined"} />
          <InfoItem icon={<CalendarDays className="text-green-600 w-5 h-5 md:col-span-2" />}label="Start Date" value={tournament.startDate.toString()} />
          <InfoItem icon={<CalendarDays className="text-red-600 w-5 h-5 md:col-span-1" />} label="End Date" value={tournament.endDate.toString()} />
          <InfoItem icon={<CalendarDays className="text-red-600 w-5 h-5 md:col-span-1" />} label="Last date of Registration" value={tournament.resgistrationDate ? tournament.resgistrationDate.toString() : "Till the End Date"} />
    
          {/* <InfoItem icon={<Cricket className="text-yellow-600 w-5 h-5" />} label="Overs" value={`${tournament.over} overs`} /> */}
          {/* <InfoItem icon={<Cricket className="text-orange-600 w-5 h-5" />} label="Ball Type" value={tournament.ballType} /> */}
          <InfoItem icon={<Phone className="text-indigo-600 w-5 h-5" />} label="Contact" value={tournament.number} />
          <InfoItem icon={<User className="text-gray-800 w-5 h-5" />} label="Organizer" value={tournament.organizerName} />
          <InfoItem icon={<span className="text-green-700 font-bold text-xl">₹</span>} label="Fees" value={`₹${tournament.fees.toLocaleString()}`} />
        </div>

        <Separator className="my-8" />
        <div className='flex justify-center content-center'>
          <Link href={`/tournaments/dashboard/tournament_teams?tournamentId=${tournaments[index]._id}`} className=''>
              <Button className='cursor-pointer'>MANAGE</Button>
          </Link>
        </div>
      </div>
    </div>
  ))}
</div>
     
  )

}
function InfoItem({
  icon,
  label,
  value,
}: {
  icon: React.ReactNode
  label: string
  value: string
}) {
  return (
    <div className={`flex items-start gap-3`}>
      <div className="pt-1">{icon}</div>
      <div>
        <div className="text-sm text-gray-500">{label}</div>
        <div className="font-medium text-gray-800">{value}</div>
      </div>
    </div>
  )
}
export default page
