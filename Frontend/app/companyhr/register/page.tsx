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
import { Tabs } from "@/components/ui/tabs"

export default function RegisterPage() {
  const router = useRouter()

  const [name, setName] = useState("")
  const [email, setEmail] = useState("")
  const [phoneNumber, setPhoneNumber] = useState("")
  const [password, setPassword] = useState("")
  const [confirmPassword, setConfirmPassword] = useState("")
  const [address, setAddress] = useState("")
  const [designation, setDesignation] = useState("")
  const [companyId, setCompanyId] = useState("")

  const handleSubmitCompanyHR = async (e) => {
    e.preventDefault()

    const res = await fetch(process.env.NEXT_PUBLIC_API_URI+`/api/companyhr/register`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        name,
        email,
        phoneNumber,
        password,
        confirmPassword,
        address,
        designation,
        companyId
      }),
    })
    const data = await res.json()
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
            <div className="flex items-center gap-2">
              <Building className="h-4 w-4" />
              <span className="hidden sm:inline">Company HR</span>
            </div>

            <form onSubmit={handleSubmitCompanyHR} className="mt-6 space-y-4">
              <div className="space-y-2">
                <Label htmlFor="name">Name</Label>
                <Input id="name" required 
                value={name} onChange={(e)=>setName(e.currentTarget.value)}/>
              </div>
              <div className="space-y-2">
                <Label htmlFor="email">Email</Label>
                <Input id="email" type="email" placeholder="company@example.com" required 
                value={email} onChange={(e)=>setEmail(e.currentTarget.value)}/>
              </div>
              <div className="space-y-2">
                <Label htmlFor="contactNumber">Contact Number</Label>
                <Input id="contactNumber" pattern="\d{10}" required 
                value={phoneNumber} onChange={(e)=>setPhoneNumber(e.currentTarget.value)}/>
              </div>
              <div className="space-y-2">
                <Label htmlFor="address">Address</Label>
                <Input id="address" required 
                value={address} onChange={(e)=>setAddress(e.currentTarget.value)}/>
              </div>
              <div className="space-y-2">
                <Label htmlFor="designation">Designation</Label>
                <Input id="designation" required 
                value={designation} onChange={(e)=>setDesignation(e.currentTarget.value)}/>
              </div>
              <div className="space-y-2">
                <Label htmlFor="companyId">Company Id</Label>
                <Input id="companyId" required 
                value={companyId} onChange={(e)=>setCompanyId(e.currentTarget.value)}/>
              </div>
              <div className="space-y-2">
                <Label htmlFor="password">Password</Label>
                <Input id="password" type="password" required 
                value={password} onChange={(e)=>setPassword(e.currentTarget.value)}/>
              </div>
              <div className="space-y-2">
                <Label htmlFor="companyConfirmPassword">Confirm Password</Label>
                <Input id="companyConfirmPassword" type="password" required 
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
