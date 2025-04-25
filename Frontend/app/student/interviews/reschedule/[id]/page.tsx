"use client"

import type React from "react"

import { useState } from "react"
import { useParams, useRouter } from "next/navigation"
import { MainLayout } from "@/components/main-layout"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"

export default function ReschedulePage() {
  const {id} = useParams();

  const router = useRouter()

  const [newDate, setNewDate] = useState("")
  const [newTime, setNewTime] = useState("")

  const handleSubmitRequest = async (e) => {
    e.preventDefault()

    const res = await fetch(process.env.NEXT_PUBLIC_API_URI+`/api/student/requestInterviewReschedule/${localStorage.getItem("token")}`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        interviewId: id,
        newDate,
        newTime
      }),
    })
    const data = await res.json()
    if (res.ok) {
      alert("Reschedule Requested");
      router.push("/companyhr/interviews")
    }
    else{
      alert(data.message);
    }
  }

  return (
    <MainLayout userRole="company" userName={localStorage.getItem("token") || ""}>
      <Card className="w-full max-w-md">
        <CardHeader className="space-y-1 text-center">
          <CardTitle className="text-2xl font-bold">Request for Reschedule of Interview {id}</CardTitle>
          <CardDescription>Request for Reschedule of Interview</CardDescription>
        </CardHeader>
        <CardContent>
            <form onSubmit={handleSubmitRequest} className="mt-6 space-y-4">
              <div className="space-y-2">
                <Label htmlFor="newDate">New Date</Label>
                <Input id="newDate" type="date" required 
                value={newDate} onChange={(e)=>setNewDate(e.currentTarget.value)}/>
              </div>
              <div className="space-y-2">
                <Label htmlFor="newTime">New Time</Label>
                <Input id="newTime" type="time" required 
                value={newTime} onChange={(e)=>setNewTime(e.currentTarget.value)}/>
              </div>
              <Button type="submit" className="w-full">
                Reschedule
              </Button>
            </form>
        </CardContent>
      </Card>
    </MainLayout>
  )
}
