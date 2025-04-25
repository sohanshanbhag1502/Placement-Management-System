"use client"

import type React from "react"

import { useState } from "react"
import Link from "next/link"
import { useRouter, useSearchParams } from "next/navigation"
import { Building, User, Users } from "lucide-react"

import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs"

export default function LoginPage() {
  const router = useRouter()
  const searchParams = useSearchParams()
  const defaultRole = searchParams.get("role") || "student"

  const [role, setRole] = useState<string>("student");
  const [email, setEmail] = useState<string>();
  const [password, setPassword] = useState<string>();

  const apiUrl = process.env.NEXT_PUBLIC_API_URI

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    const res = await fetch(apiUrl+`/api/${role}/login`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        email,
        password,
      }),
    })
    const data = await res.json()
    if (res.ok) {
      localStorage.setItem("token", data.token)
      router.push(`/${role}`);
    }
    else{
      alert(data.message);
    }
  }

  return (
    <div className="flex min-h-screen items-center justify-center p-4">
      <Card className="w-full max-w-md">
        <CardHeader className="space-y-1 text-center">
          <CardTitle className="text-2xl font-bold">Login</CardTitle>
          <CardDescription>Enter your credentials to access your account</CardDescription>
        </CardHeader>
        <CardContent>
          <Tabs value={role} onValueChange={(v: string) => setRole(v)} className="w-full">
            <TabsList className="grid w-full grid-cols-3">
              <TabsTrigger value="student" className="flex items-center gap-2">
                <Users className="h-4 w-4" />
                <span className="hidden sm:inline">Student</span>
              </TabsTrigger>
              <TabsTrigger value="companyhr" className="flex items-center gap-2">
                <Building className="h-4 w-4" />
                <span className="hidden sm:inline">Company HR</span>
              </TabsTrigger>
              <TabsTrigger value="admin" className="flex items-center gap-2">
                <User className="h-4 w-4" />
                <span className="hidden sm:inline">Admin</span>
              </TabsTrigger>
            </TabsList>

            <form onSubmit={handleSubmit} className="mt-6 space-y-4">
              <div className="space-y-2">
                <Label htmlFor="email">Email</Label>
                <Input id="email" type="email" placeholder="m@example.com" 
                value={email}
                onChange={(e)=>setEmail(e.target.value)}
                required />
              </div>
              <div className="space-y-2">
                <div className="flex items-center justify-between">
                  <Label htmlFor="password">Password</Label>
                  <Link href="/forgot-password" className="text-xs text-muted-foreground underline">
                    Forgot password?
                  </Link>
                </div>
                <Input id="password" type="password" required 
                value={password}
                onChange={(e)=>setPassword(e.target.value)}/>
              </div>
              <Button type="submit" className="w-full">
                Login
              </Button>
            </form>
          </Tabs>
        </CardContent>
        <CardFooter className="flex flex-col">
          <div className="text-center text-sm text-muted-foreground mt-2">
            Don&apos;t have an account?{" "}
            <Link href={`/${role}/register`} className="underline">
              Register
            </Link>
          </div>
        </CardFooter>
      </Card>
    </div>
  )
}
