import React from 'react'
import { Card, CardContent } from '@/components/ui/card'
import { Badge, MapPin,User,CalendarDays,Phone } from 'lucide-react';
import { Separator } from '@/components/ui/separator';
import { Button } from '@/components/ui/button';
import Link from 'next/link';
interface Tournaments{
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
const Tournaments = ({tournaments} : {tournaments : Tournaments[]}) => {
  return (
    <div className='mb-10'> 
        {tournaments && tournaments.map((tournament, index) => (
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
export default Tournaments
