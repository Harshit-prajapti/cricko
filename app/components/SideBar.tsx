"use client";

import { useMemo } from "react";
import Link from "next/link";
import { useSession } from "next-auth/react";
import Image from "next/image";

const Sidebar = () => {
  const { data: session } = useSession();

  // Derived booleans (no need for useState)
  const isOrganizer = session?.user.role === "organizer";
   const organizer = useMemo(()=>[
    { label: "My Tournaments", icon: "/house.png", href: "/tournaments" },
    { label: "Create Tournament", icon: "/trophy.png", href: "/tournaments/dashboard/my_tournaments" },
        { href: "/tournaments/dashboard/add", icon: "/add.png", label: "CREATE" },
    // { label: "Team Requests", icon: "/magic-wand.png", href: "/tournaments/dashboard/ai" },
    { label: "Leaderboard", icon: "/edit.png", href: "/tournaments/dashboard/my_teams" },
    { label: "Settings", icon: "/settings.png", href: "/tournaments/dashboard/setting" },
   ],[])
  const links = useMemo(() => [
    { href: "/tournaments", icon: "/house.png", label: "Analysis" },
    { label: "Create Tournament", icon: "/trophy.png", href: "/tournaments/dashboard/my_tournaments" },
    { href: "/tournaments/dashboard/add", icon: "/add.png", label: "CREATE" },
    { label: "Leaderboard", icon: "/edit.png", href: "/tournaments/dashboard/my_teams" },
    { href: "/dashboard/setting", icon: "/settings.png", label: "Setting" },
  ], []);

  return (
    <div
      className={` rounded md:pt-10 
        fixed z-50 bg-white dark:bg-stone-800 text-black shadow-lg p-2
        flex md:flex-col md:top-14 md:left-0 md:h-screen md:w-30
        bottom-0 w-full justify-around md:justify-start md:items-center md:gap-5
      `}
    >
      {isOrganizer ? (
        <>
          {organizer.map(({ href, icon, label }) => (
            <Link
              key={href}
              href={href}
              className="flex flex-col md:flex-row items-center gap-1 md:gap-2 p-2 hover:bg-blue-500 hover:text-white rounded"
            >
              <Image height={40} width={40} src={icon} alt={label} />
            </Link>
          ))}
        </>
      ) : (
        <>
          {links.map(({ href, icon, label }) => (
            <Link
              key={href}
              href={href}
              className="flex flex-col md:flex-row items-center gap-1 md:gap-2 p-2 hover:bg-blue-500 hover:text-white rounded"
            >
              <Image height={40} width={40} src={icon} alt={label} />
            </Link>
          ))}
        </>
      )}
    </div>
  );
};

export default Sidebar;
