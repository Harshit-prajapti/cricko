import Image from "next/image";
import connectDb from "./lib/db";
import { getServerSession } from "next-auth";
import authOptions from "./api/auth/[...nextauth]/options";
import { redirect } from "next/navigation";
import { Button } from "@/components/ui/button";
import Link from "next/link";
export default async function Home() {

  connectDb();
  const session = await getServerSession(authOptions)
  if(session){
    redirect("/tournaments")
  }
  return (
    <>
    <section className="w-screen h-screen bg-gradient-to-br from-indigo-50 to-white px-6 py-10">
      <div className="max-w-4xl mx-auto">
        <h1 className="text-4xl sm:text-5xl text-gray-900">Supercharge Your Cricket Tournament Experience with <span className="text-indigo-600">Cricko</span></h1>
        <p className="text-lg sm:text-xl text-gray-700 mb-10 mt-2">
          Welcome in Cricko we will help to manage you cricket Tournament and matches professionaly that will pickup you cricket experience to next level. 
        </p>
        <div className="grid gap-6 sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-3">
          <div className="bg-white shadow-lg rounded-xl p-6 hover:shadow-2xl transition hover:animate-bounce">
            <h3 className="text-xl font-semibold text-indigo-600 mb-2">🏆 Manage Tournament</h3>
            <p className="text-gray-600">Track matches, playoffs, semifinal and final in professional way</p>
          </div>
          <div className="bg-white shadow-lg rounded-xl p-6 hover:shadow-2xl transition hover:animate-bounce">
            <h3 className="text-xl font-semibold text-indigo-600 mb-2">🏏 Manage Teams</h3>
            <p className="text-gray-600">Get smart recordes of teams and matches that they are win or lose</p>
          </div>
          <div className="bg-white shadow-lg rounded-xl p-6 hover:shadow-2xl transition hover:animate-bounce">
            <h3 className="text-xl font-semibold text-indigo-600 mb-2">📈 Graphical Reports</h3>
            <p className="text-gray-600">Visualize tournamet performance over days, weeks, and months in clean charts.</p>
          </div>
          <div className="bg-white shadow-lg rounded-xl p-6 hover:shadow-2xl transition hover:animate-bounce">
            <h3 className="text-xl font-semibold text-indigo-600 mb-2">⚡ Real-Time Dashboard</h3>
            <p className="text-gray-600">Live updates and metrics for instant decision-making at your fingertips.</p>
          </div>
          <div className="bg-white shadow-lg rounded-xl p-6 hover:shadow-2xl transition hover:animate-bounce">
            <h3 className="text-xl font-semibold text-indigo-600 mb-2">🔒 Secure & Scalable</h3>
            <p className="text-gray-600">Built with modern tech, ready to scale with your growing business securely.</p>
          </div>
          <div className="bg-white shadow-lg rounded-xl p-6 hover:shadow-2xl transition hover:animate-bounce">
            <h3 className="text-xl font-semibold text-indigo-600 mb-2">💬 Personalized Support</h3>
            <p className="text-gray-600">We’re with you every step — helping you understand your data and make it work for you.</p>
          </div>
        </div>
        <div className="flex mt-4 items-center justify-center content-center">
          <Link href={"/tournaments"}><Button className="rounded cursor-pointer bg-indigo-600 text-white ">Get Started</Button></Link>
        </div>
        {/* <hr className="mt-5"/> */}
      </div>
    </section>
    </>
  );
}
