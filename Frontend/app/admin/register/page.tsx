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
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"

export default function RegisterPage() {
  const router = useRouter()

  const [name, setName] = useState("")
  const [email, setEmail] = useState("")
  const [phoneNumber, setPhoneNumber] = useState("")
  const [password, setPassword] = useState("")
  const [confirmPassword, setConfirmPassword] = useState("")

  const handleSubmitAdmin = async (e) => {
      e.preventDefault()

      if (password !== confirmPassword) {
        alert("Passwords do not match")
        return
      }
      const res = await fetch(process.env.NEXT_PUBLIC_API_URI+`/api/admin/register`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          name,
          email,
          phoneNumber,
          password
        }),
      })
      const data = await res.json()
      console.log(data);
      if (res.ok) {
        router.push(`/login`);
      }
      else{
        alert(data.message);
      }
    }

  return (
    <div className="flex min-h-screen items-center justify-center p-4">
      <Card className="w-full max-w-md">
        <CardHeader className="space-y-1 text-center">
          <CardTitle className="text-2xl font-bold">Create an account</CardTitle>
          <CardDescription>Enter your information to create your account</CardDescription>
        </CardHeader>
        <CardContent>
          <Tabs className="w-full">
            <div value="admin" className="flex items-center gap-2">
              <User className="h-4 w-4" />
              <span className="hidden sm:inline">Admin</span>
            </div>
            <form onSubmit={handleSubmitAdmin} className="mt-6 space-y-4">
              <div className="space-y-2">
                <Label htmlFor="name">Full Name</Label>
                <Input id="name" required 
                value={name} onChange={(e)=>setName(e.currentTarget.value)}/>
              </div>
              <div className="space-y-2">
                <Label htmlFor="email">Email</Label>
                <Input id="email" type="email" placeholder="admin@example.com" required 
                value={email} onChange={(e)=>setEmail(e.currentTarget.value)}/>
              </div>
              <div className="space-y-2">
                <Label htmlFor="phoneNumber">Phone Number</Label>
                <Input id="phoneNumber" pattern="\d{10}" required 
                value={phoneNumber} onChange={(e)=>setPhoneNumber(e.currentTarget.value)}/>
              </div>
              <div className="space-y-2">
                <Label htmlFor="password">Password</Label>
                <Input id="password" type="password" required 
                value={password} onChange={(e)=>setPassword(e.currentTarget.value)}/>
              </div>
              <div className="space-y-2">
                <Label htmlFor="confirmPassword">Confirm Password</Label>
                <Input id="confirmPassword" type="password" required 
                value={confirmPassword} onChange={(e)=>setConfirmPassword(e.currentTarget.value)}/>
              </div>
              <Button type="submit" className="w-full">
                Register
              </Button>
            </form>
          </Tabs>
        </CardContent>
        <CardFooter className="flex flex-col">
          <div className="text-center text-sm text-muted-foreground mt-2">
            Already have an account?{" "}
            <Link href={`/login`} className="underline">
              Login
            </Link>
          </div>
        </CardFooter>
      </Card>
    </div>
  )
}
