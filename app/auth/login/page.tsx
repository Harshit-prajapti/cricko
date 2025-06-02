"use client";
import { signIn } from "next-auth/react";
import { useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { useState } from "react";
import { Input } from "@/components/ui/input";
export default function LoginPage() {
  const [email,setEmail] = useState<string>("")
  const [password, setPassword] = useState<string>("")
  const router = useRouter();

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100">
      <Card className="w-full max-w-md shadow-lg p-6">
        <CardContent className="space-y-4">
          <div>
            <h1 className="text-2xl font-bold text-center mb-4">
              WELCOME TO CRICKO
            </h1>
            <p className="text-gray-500 text-center ">
              Get started - it's free
            </p>
            <div className=" mt-2 grid grid-cols-1 gap-2">
                <label className="text-gray-800" htmlFor="">Email</label>
                <Input type="text" value={email} onChange={(e)=>setEmail(e.target.value)} placeholder="example@gmail.com"/>
                <label className="text-gray-800" htmlFor="">Password</label>
                <Input type="password" value={password} onChange={(e)=>setPassword(e.target.value)} placeholder="********"/>
            </div>
            <div className="flex flex-row justify-center w-full ">
                <Button
              className="mt-4 bg-blue-600 flex-row-reverse cursor-pointer"
              onClick={() => signIn("credentials",{email,password})}
            >
              LET'S GO 
            </Button>
            </div>
            
            <div className="flex items-center my-3">
                <hr className="flex-grow border-gray-300" />
                <span className="mx-2 text-gray-500">or</span>
                <hr className="flex-grow border-gray-300" />
            </div>
            <Button
              className="mt-4 w-full cursor-pointer"
              onClick={() => signIn("google")}
            >
              SIGN UP WITH GOOGLE
            </Button>
            <div className="flex items-center my-3">
                <hr className="flex-grow border-gray-300" />
                <span className="mx-2 text-gray-500">or</span>
                <hr className="flex-grow border-gray-300" />
            </div>
            <Button
              variant="outline"
              className="w-full cursor-pointer font-semibold"
              onClick={() => router.push("/auth/register/manual")}
            >
              DON'T HAVE AN ACCOUNT
            </Button>
          </div>
          
        </CardContent>
      </Card>
    </div>
  );
}
