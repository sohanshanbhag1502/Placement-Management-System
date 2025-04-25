"use client"

import type React from "react"

import { useState } from "react"
import { useRouter } from "next/navigation"
import { MainLayout } from "@/components/main-layout"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"

export default function ReschedulePage() {
  const router = useRouter()

  const [candidateEmail, setCandidateEmail] = useState("")
  const [Date, setDate] = useState("")
  const [Time, setTime] = useState("")
  const [meetingLink, setMeetingLink] = useState("")
  const [meetingMode, setMeetingMode] = useState("ONLINE")
  const [interviewer, setInterviewer] = useState("")
  const [applicationId, setApplicationId] = useState("")

  const handleSubmitCompanyHR = async (e) => {
    e.preventDefault()
    console.log(meetingMode)

    const res = await fetch(process.env.NEXT_PUBLIC_API_URI+`/api/companyhr/scheduleInterview/${localStorage.getItem("token")}`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        applicationId,
        candidateEmail,
        Date,
        Time,
        meetingLink,
        meetingMode,
        interviewer
      }),
    })
    const data = await res.json()
    if (res.ok) {
      alert("Interview Scheduled");
      router.push("/companyhr/interviews")
    }
    else{
      alert(data.message);
    }
  }

  return (
    <MainLayout userRole="company" userName={localStorage.getItem("token")}>
      <Card className="w-full max-w-md">
        <CardHeader className="space-y-1 text-center">
          <CardTitle className="text-2xl font-bold">Schedule an Interview</CardTitle>
          <CardDescription>Schedule an Interview for candiate</CardDescription>
        </CardHeader>
        <CardContent>
            <form onSubmit={handleSubmitCompanyHR} className="mt-6 space-y-4">
              <div className="space-y-2">
                <Label htmlFor="name">Application Id</Label>
                <Input id="name" required 
                value={applicationId} onChange={(e)=>setApplicationId(e.currentTarget.value)}/>
              </div>
              <div className="space-y-2">
                <Label htmlFor="name">Candidate email</Label>
                <Input id="name" required 
                value={candidateEmail} onChange={(e)=>setCandidateEmail(e.currentTarget.value)}/>
              </div>
              <div className="space-y-2">
                <Label htmlFor="email">Date</Label>
                <Input id="email" type="date" required 
                value={Date} onChange={(e)=>setDate(e.currentTarget.value)}/>
              </div>
              <div className="space-y-2">
                <Label htmlFor="contactNumber">Time</Label>
                <Input id="time" type="time" required 
                value={Time} onChange={(e)=>setTime(e.currentTarget.value)}/>
              </div>
              <div className="space-y-2">
                <Label htmlFor="meetingMode">Meeting Mode</Label>
                <select
                  id="meetingMode"
                  required
                  value={meetingMode}
                  onChange={(e) => setMeetingMode(e.currentTarget.value)}
                  className="w-full border rounded px-3 py-2"
                >
                  <option value="ONLINE">Online</option>
                  <option value="OFFLINE">Offline</option>
                </select>
              </div>
              <div className="space-y-2">
                <Label htmlFor="designation">Meeting Link/Location</Label>
                <Input id="designation" required 
                value={meetingLink} onChange={(e)=>setMeetingLink(e.currentTarget.value)}/>
              </div>
              <div className="space-y-2">
                <Label htmlFor="companyId">Interviewer Name</Label>
                <Input id="companyId" required 
                value={interviewer} onChange={(e)=>setInterviewer(e.currentTarget.value)}/>
              </div>
              <Button type="submit" className="w-full">
                Schedule
              </Button>
            </form>
        </CardContent>
      </Card>
    </MainLayout>
  )
}
