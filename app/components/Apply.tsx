'use client';
import React from 'react';
import Link from 'next/link';
import { Button } from '@/components/ui/button';
type ApplyButtonProps = {
    tournamentId : string;
}
const ApplyButton: React.FC<ApplyButtonProps> = ({ tournamentId }) => {
    return (
        <Link href={`/tournaments/apply?tournamentId=${tournamentId}`}>
        <Button className="bg-blue-600 cursor-pointer text-white px-4 py-2 rounded hover:bg-blue-700 transition duration-300">
            Apply Now
        </Button>
        </Link>
    );
}
export default ApplyButton;