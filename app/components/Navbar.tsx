"use client";
import Image from "next/image";
import { useSession } from "next-auth/react";
import { Button } from "@/components/ui/button";
import Link from "next/link";
export default function Navbar() {
  const { data: session } = useSession();
  const img = session?.user.image as string
  return (
    <nav className="fixed w-full bg-white dark:bg-gray-800 shadow p-4 flex justify-between items-center top-0 z-25">
        {/* <Image src={"/logo2.jpg"} height={60} width={60} alt="logo"/> */}
      <h1 className="text-2xl dark:text-white font-bold text-blue-600">Cricko</h1>
      <div className="flex items-center gap-4">
        <Link href={"/tournaments/dashboard"}>
          <Button className="cursor-pointer">Dashboard</Button>
        </Link>
        <Link href={"/profile"}>
        {img ? (<>
          <img
            src={img ||"/images/download.png"}
            width={30}
            height={30}
            className="cursor-pointer rounded-2xl"
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
