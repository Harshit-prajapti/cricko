'use client'
import { useSearchParams } from 'next/navigation'
import { Input } from '@/components/ui/input'
import { Textarea } from '@/components/ui/textarea'
import { Button } from '@/components/ui/button'
import { Label } from '@/components/ui/label'
import { Calendar } from '@/components/ui/calendar'
import { Popover, PopoverContent, PopoverTrigger } from '@/components/ui/popover'
import { format } from 'date-fns'
import { CalendarIcon } from 'lucide-react'
import { useSession } from 'next-auth/react'
import { Card, CardContent } from '@/components/ui/card'
import Link from 'next/link'
import { CheckCircle2 } from 'lucide-react'
import React, { useState } from 'react'
import { register } from 'module'
const CreateTournamentPage = () => {
  const searchParams = useSearchParams()
  const sport = searchParams.get('sport') || 'Unknown'
  const [startDate, setStartDate] = useState<Date>()
  const [endDate, setEndDate] = useState<Date>()
    const [name , setName] = useState<string>("")
    const [number , setNumber] = useState<string>("")
    const [venue, setVenue] = useState<string>("")
    const [description, setDescription] = useState<string>("")
    const [over, setOver] = useState<string>("")
    const [fees, setFees] = useState<string>("")
    const [ballType, setBallType] = useState<string>("tennis")
    const [organizerName, setOrganizerName] = useState<string>("")
    const [city , setCity] = useState<string>("")
    const [created, setCreated] = useState<boolean>(false)
    const [loading, setLoading] = useState<boolean>(false)
    const [resgistrationDate, setResgistrationDate] = useState<Date>()
    const [teams, setTeams] = useState<string>("")
    const [error, setError] = useState<string>("")
    const session = useSession()
    const user = session.data?.user
    const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
  const data = {
    sport: sport,
    organizerName: organizerName || user?.name || "Unknown Organizer",
    fees: fees,
    over: over,
    city: city,
    number: number,
    teams : teams,
    resgistrationDate : resgistrationDate,
    ballType: ballType,
    name: name,
    startDate: startDate?.toISOString(),
    endDate: endDate?.toISOString(),
    venue: venue,
    description: description,
  }
  setLoading(true)
  const response = await fetch('/api/tournaments/create_tournament', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify(data),
  })
  if (response.ok) {
    console.log("Tournament created successfully")
    setLoading(false)
    setCreated(true)
  } else {
    setLoading(false)
    console.error("Failed to create tournament", response)
  }
}
  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="animate-spin rounded-full h-16 w-16 border-b-2 border-blue-500"></div>
      </div>
    )
  }
  if (created) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-100 px-4">
      <Card className="w-full max-w-md shadow-md border border-gray-200">
        <CardContent className="py-8 text-center space-y-4">
              <CheckCircle2 className="h-10 w-10 text-green-600 mx-auto" />
              <h2 className="text-xl font-semibold text-green-700">Well done!</h2>
              <p className="text-gray-600">Your Tournament Created Successfully</p>
              <Link href="/tournaments/dashboard/my_tournaments">
              <Button className="mt-4 cursor-pointer">Check it Out</Button>
              </Link>
        </CardContent>
      </Card>
    </div>
    )
  }
  return (    
    <div className="max-w-4xl mx-auto p-4">
      <h1 className="text-3xl font-bold text-green-700 mb-8">
        Create Tournament: <span className="capitalize">{sport}</span>
      </h1>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div>
          <Label className='mb-2'>TOURNAMENT NAME</Label>
          <Input value={name} onChange={(e)=>setName(e.target.value)} placeholder="Enter tournament name" />
        </div>


        {(sport === "cricket") && <>
            <div>
          <Label className='mb-2'>OVER FORMATE</Label>
          <Input value={over} onChange={(e)=>setOver(e.target.value)} type='number'  placeholder="How Many Overs Each Innings Consists" />
        </div>
        </>}
        <div>
          <Label className='mb-2'>REGISTRATION FEES</Label>
          <Input value={fees} onChange={(e)=>setFees(e.target.value)} placeholder={"Enter Registeration fees"} />
        </div>
        <div>
          <Label className='mb-2'>BALL TYPE</Label>
          <select className='w-full p-2 border rounded-xl' value={ballType} onChange={(e)=>setBallType(e.target.value)}>
            <option value="tennis">Tennis</option>
            <option value="leather">Leather</option>
          </select>
        </div>
        <div>
          <Label className='mb-2'>ORGANIZER NAME</Label>
          <Input value={organizerName} onChange={(e)=>setOrganizerName(e.target.value)} placeholder={user?.name as string || "Enter Organizer Name"} />
        </div>
        <div className="md">
          <Label className='mb-2'>CONTACT NUMBER</Label>
          <Input value={number} onChange={(e)=>setNumber(e.target.value)} placeholder="Enter Contact Number" />
        </div>
        <div className="md">
          <Label className='mb-2'>NUMBER OF TEAMS</Label>
          <Input value={teams} onChange={(e)=>setTeams(e.target.value)} placeholder="Enter Contact Number" />
        </div>
        <div>
          <Label className='mb-2'>LAST DAY OF REGISTRATION</Label>
          <Popover>
            <PopoverTrigger asChild>
              <Button variant="outline" className="w-full justify-start text-left font-normal">
                {resgistrationDate ? format(resgistrationDate, 'PPP') : <span>Pick a date</span>}
                <CalendarIcon className="ml-auto h-4 w-4 opacity-50" />
              </Button>
            </PopoverTrigger>
            <PopoverContent className="w-auto p-0">
              <Calendar mode="single" selected={resgistrationDate} onSelect={setResgistrationDate} initialFocus />
            </PopoverContent>
          </Popover>
        </div>
        <div>
          <Label className='mb-2'>START DATE</Label>
          <Popover>
            <PopoverTrigger asChild>
              <Button variant="outline" className="w-full justify-start text-left font-normal">
                {startDate ? format(startDate, 'PPP') : <span>Pick a date</span>}
                <CalendarIcon className="ml-auto h-4 w-4 opacity-50" />
              </Button>
            </PopoverTrigger>
            <PopoverContent className="w-auto p-0">
              <Calendar mode="single" selected={startDate} onSelect={setStartDate} initialFocus />
            </PopoverContent>
          </Popover>
        </div>

        <div>
          <Label className='mb-2'>END DATE</Label>
          <Popover>
            <PopoverTrigger asChild>
              <Button variant="outline" className="w-full justify-start text-left font-normal">
                {endDate ? format(endDate, 'PPP') : <span>Pick a date</span>}
                <CalendarIcon className="ml-auto h-4 w-4 opacity-50" />
              </Button>
            </PopoverTrigger>
            <PopoverContent className="w-auto p-0">
              <Calendar mode="single" selected={endDate} onSelect={setEndDate} initialFocus />
            </PopoverContent>
          </Popover>
        </div>
        <div className="">
          <Label className='mb-2'>CITY</Label>
          <Input value={city} onChange={(e)=>setCity(e.target.value)} placeholder="Enter City and State" />
        </div>
        <div className="">
          <Label className='mb-2'>VENUE</Label>
          <Input value={venue} onChange={(e)=>setVenue(e.target.value)} placeholder="Enter venue or location" />
        </div>
        <div className="md:col-span-2">
          <Label className='mb-2'>DESCRIPTIONS</Label>
          <Textarea value={description} onChange={(e)=>setDescription(e.target.value)} placeholder="Describe your tournament... like about pricess etc." rows={4} />
        </div>
      </div>

      <div className="flex justify-end mt-6">
        <Button onClick={handleSubmit} type="submit" className='cursor-pointer'>Create Tournament</Button>
      </div>
    </div>
  )
}

export default CreateTournamentPage
