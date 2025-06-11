'use client'
import { Button } from "@/components/ui/button";
import Teams from "../tournaments/dashboard/my_teams/page";
import Link from "next/link";
export default function MyTeamsButton() {
    return (
        <Link href="/tournaments/dashboard/my_teams">
        <Button className="cursor-pointer">My Teams</Button>
        </Link>
    )
}