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
        const [password, setPassword] = useState("")
        const [confirmPassword, setConfirmPassword] = useState("")
        const [address, setAddress] = useState("")
        const [website, setWebsite] = useState("")
        const [description, setDescription] = useState("")
        const [logoUrl, setLogoUrl] = useState("")
        const [contactNumber, setContactNumber] = useState("")


    const handleSubmitCompany = async (e) => {
        e.preventDefault()

        const res = await fetch(process.env.NEXT_PUBLIC_API_URI+`/api/company/register`, {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify({
            name,
            email,
            contactNumber,
            address,
            website,
            description,
            logoUrl
        }),
        })
        const data = await res.json()
        if (res.ok) {
        alert("Company has been sent to admin for approval");
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
              <span className="hidden sm:inline">Company</span>
            </div>

            <form onSubmit={handleSubmitCompany} className="mt-6 space-y-4">
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
                value={contactNumber} onChange={(e)=>setContactNumber(e.currentTarget.value)}/>
              </div>
              <div className="space-y-2">
                <Label htmlFor="address">Address</Label>
                <Input id="address" required 
                value={address} onChange={(e)=>setAddress(e.currentTarget.value)}/>
              </div>
              <div className="space-y-2">
                <Label htmlFor="designation">Website</Label>
                <Input id="designation" required 
                value={website} onChange={(e)=>setWebsite(e.currentTarget.value)}/>
              </div>
              <div className="space-y-2">
                <Label htmlFor="companyId">Description</Label>
                <Input id="companyId" required 
                value={description} onChange={(e)=>setDescription(e.currentTarget.value)}/>
              </div>
              <div className="space-y-2">
                <Label htmlFor="companyId">Logo URL</Label>
                <Input id="companyId" required 
                value={logoUrl} onChange={(e)=>setLogoUrl(e.currentTarget.value)}/>
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
