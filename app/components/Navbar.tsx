"use client";
import Image from "next/image";
import { useSession } from "next-auth/react";
import { Button } from "@/components/ui/button";
import { useSearchParams } from "next/navigation";
import { Search } from "lucide-react";
import { Input } from "@/components/ui/input";
import Link from "next/link";
import { useState } from "react";
import { useRouter } from "next/navigation";
import { LayoutDashboard } from "lucide-react";
export default function Navbar() {
  const { data: session } = useSession();
  const router = useRouter()
  let isMobile = false;
  if (typeof window !== "undefined") {
    isMobile = window.innerWidth <= 768;// Adjust the width as needed for mobile detection
  }
  const img = session?.user.image as string
  const [prompt, setPrompt] = useState<string>("")
  const [clicked, setClicked] = useState<boolean>(false);
  const handleSearch = () => {
    router.push(`/tournaments?prompt=${prompt}`)
  }
  return (
    <nav className="fixed w-full bg-white dark:bg-gray-800 shadow p-4 flex justify-between items-center top-0 z-25">
        {/* <Image src={"/logo2.jpg"} height={60} width={60} alt="logo"/> */}
      <h1 className="text-2xl dark:text-white font-bold mr-2 text-blue-600">{isMobile ? "C" : "Cricko"}</h1>
      <div className={`flex items-center ${isMobile ? "gap-3" : "gap-4"}`} >
        <Input onClick={()=>console.log("I am clicked")} value={prompt} onChange={(e)=>{setPrompt(e.target.value)}} className={`max-sm:w-auto max-md:w-3xl md:w-2xl md:h-2xl`} placeholder="search by name, city, or venue"/>
        <Button onClick={
          handleSearch
          }><Search /></Button>
        <Link href={"/tournaments/dashboard"}>
          <LayoutDashboard/>
        </Link>
        
        <Link href={"/tournaments/dashboard/my_profile"}>
        {img ? (<>
          <img
            src={img ||"/images/download.png"}
            width={40}
            height={40}
            className={`cursor-pointer rounded-2xl`}
          />
        </>) : (<>
        <Image className="rounded"
            src={"/logo.jpg"}
            alt="Admin"
            width={40}
            height={40}
            style={{ cursor: "pointer" }}
          />
        </>)}
          
        </Link>
      </div>
    </nav>
  );
}
