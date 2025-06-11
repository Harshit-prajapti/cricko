// app/profile/page.tsx
import { getServerSession } from "next-auth";
import authOptions from "@/app/api/auth/[...nextauth]/options";
import Image from "next/image";
import { redirect } from "next/navigation";
import { BadgeCheck, ShieldCheck, User2 } from "lucide-react";
import MyTeamsButton from "@/app/components/MyTeams";
export default async function ProfilePage() {
  const session = await getServerSession(authOptions);

  if (!session?.user) {
    redirect("auth/login"); // or show a login CTA
  }

  const { name, email, image, role, isProfileComplete } = session.user as {
    name: string;
    email: string;
    image: string;
    role: "user" | "organizer";
    isProfileComplete: boolean;
  };

  return (
    <>
    
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-gray-100 to-white">
      <div className="max-w-md w-full bg-white shadow-2xl rounded-2xl p-8 space-y-6">
        <div className="flex flex-col items-center">
          <div className="relative w-24 h-24 rounded-full overflow-hidden ring-4 ring-blue-500">
            <Image
              src={"/profile.jpg"}
              alt={name}
              fill
              className="object-cover"
            />
          </div>
          <h2 className="mt-4 text-xl font-bold text-gray-800">{name}</h2>
          <p className="text-sm text-gray-500">{email}</p>
        </div>

        <div className="border-t border-gray-200 pt-4 space-y-2">
          <div className="flex items-center justify-between">
            <span className="text-gray-600">Role:</span>
            <span className="inline-flex items-center px-3 py-1 text-sm font-medium bg-blue-100 text-blue-800 rounded-full">
              {role === "organizer" ? (
                <>
                  <ShieldCheck className="w-4 h-4 mr-1" /> Organizer
                </>
              ) : (
                <>
                  <User2 className="w-4 h-4 mr-1" /> User
                </>
              )}
            </span>
          </div>
          <div className="flex items-center justify-between">
            <span className="text-gray-600">Profile Status:</span>
            <span
              className={`inline-flex items-center px-3 py-1 text-sm font-medium rounded-full ${
                isProfileComplete
                  ? "bg-green-100 text-green-800"
                  : "bg-yellow-100 text-yellow-800"
              }`}
            >
              {isProfileComplete ? (
                <>
                  <BadgeCheck className="w-4 h-4 mr-1" />
                  Completed
                </>
              ) : (
                <>Incomplete</>
              )}
            </span>
          </div>
        </div>

        <div className="pt-4">
          <button className="w-full bg-blue-600 text-white py-2 px-4 rounded-xl hover:bg-blue-700 transition">
            Edit Profile
          </button>
        </div>
        <div className="w-full flex flex-row-reverse">
          <MyTeamsButton />
        </div>
      </div>
    </div>
    </>
  );
}
