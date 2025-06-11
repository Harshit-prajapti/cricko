import Tournaments from "../components/Tournaments";
import { Phone, Badge, User, CalendarDays, MapPin } from "lucide-react";
import { Separator } from "@/components/ui/separator";
import ApplyButton from "../components/Apply";
import MyTeamsButton from "../components/MyTeams";
interface Tournament {
  _id: string;
  name: string;
  description: string;
  city: string;
  venue: string;
  startDate: string;
  endDate: string;
  createdAt: string;
  updatedAt: string;
  fees: number;
  ballType: string;
  over: number;
  isActive: boolean;
  number: string;
  organizerId: string;
  organizerName: string;
  teams: number;
  resgistrationDate: string;
}

interface Props {
  searchParams: { prompt?: string };
}

export default async function TeamPage({
  searchParams,
}: {
  searchParams: { prompt?: string };
}) {
  const prompt = await searchParams.prompt || "";
  const res = await fetch(`http://localhost:3000/api/tournaments/search_tournaments?prompt=${prompt}`, {
    cache: "no-store",
  });
  if(res.status !== 200) {
    return(
      <div className="text-center mt-20 text-gray-500">
        Something went wrong while fetching tournaments. Please try again later.
        <br />
      </div>
    )
  }
  const data : Tournament[] = await res.json();
  if(data.length === 0) {
    return (
      <div className="text-center mt-20 text-gray-500">
        No tournaments found for the search term <span className="font-semibold">{prompt}</span>. Please try a different search.
      </div>

    )
  }
  return (
    <div className="mb-10">
      <div className="max-w-full flex right-0">
        <MyTeamsButton />
      </div>
      {data && data.map((tournament, index) => (
        <div key={index} className="max-w-5xl mx-auto md:p-10 mb-5">
          <div className="bg-white shadow-md rounded border border-gray-200 p-6 md:p-10">
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

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-x-8 gap-y-6 text-gray-700 text-base md:text-lg">
              <InfoItem icon={<MapPin className="text-blue-600 w-5 h-5" />} label="City" value={tournament.city} />
              <InfoItem icon={<MapPin className="text-purple-600 w-5 h-5" />} label="Venue" value={tournament.venue} />
              <InfoItem icon={<User className="text-purple-600 w-5 h-5" />} label="Total Teams" value={tournament.teams?.toString() || "Not Defined"} />
              <InfoItem icon={<CalendarDays className="text-green-600 w-5 h-5" />} label="Start Date" value={new Date(tournament.startDate).toDateString()} />
              <InfoItem icon={<CalendarDays className="text-red-600 w-5 h-5" />} label="End Date" value={new Date(tournament.endDate).toDateString()} />
              <InfoItem icon={<CalendarDays className="text-red-600 w-5 h-5" />} label="Last date of Registration" value={tournament.resgistrationDate ? new Date(tournament.resgistrationDate).toDateString() : "Till the End Date"} />
              <InfoItem icon={<Phone className="text-indigo-600 w-5 h-5" />} label="Contact" value={tournament.number} />
              <InfoItem icon={<User className="text-gray-800 w-5 h-5" />} label="Organizer" value={tournament.organizerName} />
              <InfoItem icon={<span className="text-green-700 font-bold text-xl">₹</span>} label="Fees" value={`₹${tournament.fees.toLocaleString()}`} />
            </div>
            <div className="mt-6 flex justify-end">
            <ApplyButton tournamentId={tournament._id as string} />
            </div>
          </div>
        </div>  
      ))}
    </div>
  );
};

function InfoItem({
  icon,
  label,
  value,
}: {
  icon: React.ReactNode;
  label: string;
  value: string;
}) {
  return (
    <div className="flex items-start gap-3">
      <div className="pt-1">{icon}</div>
      <div>
        <div className="text-sm text-gray-500">{label}</div>
        <div className="font-medium text-gray-800">{value}</div>
      </div>
    </div>
  );
}
