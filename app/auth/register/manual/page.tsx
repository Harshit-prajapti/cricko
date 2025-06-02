"use client";
import { useState } from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import { signIn } from "next-auth/react";
import Link from "next/link";
import bcrypt from "bcryptjs";
export default function ManualRegister() {
  const [form, setForm] = useState({ name: "", email: "", password: "" });
  const [error, setError] = useState<string>("");
  const [email, setEmail] = useState<boolean>(false);
  const handleSubmit = async (e: React.FormEvent) => {
    console.log(form)
    e.preventDefault();
    form.password = await bcrypt.hash(form.password, 10);
    const res = await fetch("/auth/send-varification-email", {
      method: "POST",
      body: JSON.stringify(form),
      headers: { "Content-Type": "application/json" },
    });
    if (res.ok) {
      setEmail(true);
    } else {
      alert("Failed to register");
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50">
      <Card className="w-full max-w-md shadow-lg p-6">
        <CardContent>
          <h1 className="text-2xl font-bold text-center mb-6">
            Create Account
          </h1>
          <hr className="mt-2 mb-3" />
          <form onSubmit={handleSubmit} className="space-y-5">
            <div>
              <Label className="mb-2" htmlFor="name">
                Full Name
              </Label>
              <Input
                id="name"
                type="text"
                placeholder="Your full name"
                value={form.name}
                onChange={(e) => setForm({ ...form, name: e.target.value })}
                required
              />
            </div>
            <div>
              <Label className="mb-2" htmlFor="email">
                Email
              </Label>
              <Input
                id="email"
                type="email"
                placeholder="you@example.com"
                value={form.email}
                onChange={(e) => setForm({ ...form, email: e.target.value })}
                required
              />
            </div>
            <div>
              <Label className="mb-2" htmlFor="password">
                Password
              </Label>
              <Input
                id="password"
                type="password"
                placeholder="••••••••"
                value={form.password}
                onChange={(e) => setForm({ ...form, password: e.target.value })}
                required
              />
            </div>
            {!email ? (
              <>
                <Button className="w-full cursor-pointer hover:bg-stone-700" type="submit">
                  REGISTER
                </Button>
                <div className="flex items-center my-3">
                  <hr className="flex-grow border-gray-300" />
                  <span className="mx-2 text-gray-500">or</span>
                  <hr className="flex-grow border-gray-300" />
                </div>
                <Button
                  className="mt-4 w-full bg-red-600 cursor-pointer"
                  onClick={() => signIn("google")}
                >
                  SIGN UP WITH GOOGLE
                </Button>
              </>
            ) : (
              <>
                <div className="flex items-center my-3">
                  <hr className="flex-grow border-gray-300" />
                  <span className="mx-2 text-gray-500">or</span>
                  <hr className="flex-grow border-gray-300" />
                </div>
                <p className="text-gray-700 mt-2 mb-2">Email Is Send Please Varify Your Email</p>
                <Link href="https://mail.google.com/">
                <Button
                  className="mt-4 w-full bg-red-600 cursor-pointer"
                >
                  GO TO MAIL GMAIL
                </Button>
                </Link>
              </>
            )}
          </form>
        </CardContent>
      </Card>
    </div>
  );
}
