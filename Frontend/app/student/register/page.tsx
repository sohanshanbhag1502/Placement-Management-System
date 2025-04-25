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
  const [dateOfBirth, setDateOfBirth] = useState("")
  const [department, setDepartment] = useState("")
  const [cgpa, setCgpa] = useState("")
  const [resumeUrl, setResumeUrl] = useState("")
  const [github, setGithub] = useState("")
  const [linkedin, setLinkedin] = useState("")
  const [portfolioUrl, setPortfolioUrl] = useState("")

  const handleSubmitStudent = async (e) => {
      e.preventDefault()

      const res = await fetch(process.env.NEXT_PUBLIC_API_URI+`/api/student/register`, {
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
          dateOfBirth,
          department,
          cgpa,
          resumeUrl,
          github,
          linkedin,
          portfolioUrl
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
              <Users className="h-4 w-4" />
              <span className="hidden sm:inline">Student</span>
            </div>
            <form onSubmit={handleSubmitStudent} className="mt-6 space-y-4">
              <div className="space-y-2">
                <Label htmlFor="name">Name</Label>
                <Input id="name" required 
                value={name} onChange={(e)=>setName(e.currentTarget.value)}/>
              </div>
              <div className="space-y-2">
                <Label htmlFor="email">Email</Label>
                <Input id="email" type="email" placeholder="m@example.com" required 
                value={email} onChange={(e)=>setEmail(e.currentTarget.value)}/>
              </div>
              <div className="space-y-2">
                <Label htmlFor="dateOfBirth">Date of Birth</Label>
                <Input id="dateOfBirth" type="date" required 
                value={dateOfBirth} onChange={(e)=>setDateOfBirth(e.currentTarget.value)}/>
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
              <div className="space-y-2">
                <Label htmlFor="phoneNumber">Phone Number</Label>
                <Input id="phoneNumber" pattern="\d{10}" required 
                value={phoneNumber} onChange={(e)=>setPhoneNumber(e.currentTarget.value)}/>
              </div>
              <div className="space-y-2">
                <Label htmlFor="department">Department</Label>
                <select id="department" className="w-full border rounded-md p-2" required
                value={department} onChange={(e)=>setDepartment(e.currentTarget.value)}>
                  <option value="" disabled selected>
                    Select your department
                  </option>
                  <option value="CSE">CSE</option>
                  <option value="IT">IT</option>
                  <option value="ECE">ECE</option>
                  <option value="EEE">EEE</option>
                  <option value="MECH">MECH</option>
                </select>
              </div>
              <div className="space-y-2">
                <Label htmlFor="cgpa">CGPA</Label>
                <Input id="cgpa" required 
                value={cgpa} onChange={(e)=>setCgpa(e.currentTarget.value)}/>
              </div>
              <div className="space-y-2">
                <Label htmlFor="resumeUrl">Resume Link</Label>
                <Input id="resumeUrl" required 
                value={resumeUrl} onChange={(e)=>setResumeUrl(e.currentTarget.value)}/>
              </div>
              <div className="space-y-2">
                <Label htmlFor="github">Github Link</Label>
                <Input id="github" required 
                value={github} onChange={(e)=>setGithub(e.currentTarget.value)}/>
              </div>
              <div className="space-y-2">
                <Label htmlFor="linkedin">Linkedin Link</Label>
                <Input id="linkedin" required 
                value={linkedin} onChange={(e)=>setLinkedin(e.currentTarget.value)}/>
              </div>
              <div className="space-y-2">
                <Label htmlFor="portfolioUrl">Portfolio Link</Label>
                <Input id="portfolioUrl" required 
                value={portfolioUrl} onChange={(e)=>setPortfolioUrl(e.currentTarget.value)}/>
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
