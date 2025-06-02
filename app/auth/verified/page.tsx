'use client'
import { Card, CardContent } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { CheckCircle2} from 'lucide-react'
import Link from 'next/link'

export default function VerifyEmailPage() {
  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100 px-4">
      <Card className="w-full max-w-md shadow-md border border-gray-200">
        <CardContent className="py-8 text-center space-y-4">
              <CheckCircle2 className="h-10 w-10 text-green-600 mx-auto" />
              <h2 className="text-xl font-semibold text-green-700">Email Verified!</h2>
              <p className="text-gray-600">Your email has been successfully verified.</p>
              <Link href="/auth/login">
                <Button className="mt-4 cursor-pointer">Go to Login</Button>
              </Link>
        </CardContent>
      </Card>
    </div>
  )
}

