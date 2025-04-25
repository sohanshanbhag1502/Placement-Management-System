"use client"

import { MainLayout } from "@/components/main-layout"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { useEffect, useState } from "react"
import { useRouter } from "next/navigation"


export default function StudentInterviewsPage() {
  const [interviews, setInterviews] = useState([])
  const router = useRouter();

  const fetchInterviews = async () => {
    const apiUrl = process.env.NEXT_PUBLIC_API_URI;

    const response = await fetch(apiUrl+`/api/student/getAllInterviews/${localStorage.getItem("token")}`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      }
    })

    const res = await response.json()

    if (response.ok) {
      console.log(res)
      setInterviews(res)
    } else {
      console.error("Failed to fetch interviews:", res.message)
    }
  }

  useEffect(() => {
    fetchInterviews()
  }, [])

  return (
    <MainLayout userRole="student" userName={localStorage.getItem("token") || ""}>
      <div className="space-y-6 w-full">
        <div className="flex items-center justify-between w-full">
          <div>
            <h1 className="text-3xl font-bold tracking-tight">My Interviews</h1>
            <p className="text-muted-foreground">Track and manage your interview schedule</p>
          </div>
        </div>

        <div className="flex flex-col gap-4 md:flex-row w-full">
          <Card className="w-full">
            <CardHeader className="pb-3">
              <CardTitle>Upcoming Interviews</CardTitle>
              <CardDescription>Interviews scheduled for the coming days</CardDescription>
            </CardHeader>
            <CardContent>
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Hr email</TableHead>
                    <TableHead>Date</TableHead>
                    <TableHead>Time</TableHead>
                    <TableHead>Mode</TableHead>
                    <TableHead>Interviewer</TableHead>
                    <TableHead>Meeting Link/Location</TableHead>
                    <TableHead>Actions</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {interviews
                    .map((interview) => (
                      <TableRow key={interview.interviewId}>
                        <TableCell className="font-medium">{interview.hrEmail}</TableCell>
                        <TableCell>{interview.Date}</TableCell>
                        <TableCell>{interview.Time}</TableCell>
                        <TableCell>{interview.meetingMode}</TableCell>
                        <TableCell>{interview.interviewer}</TableCell>
                        <TableCell>{interview.meetingLink}</TableCell>
                        <TableCell>
                          <Button size="sm" variant="outline" onClick={() => router.push(`/student/interviews/reschedule/${interview.interviewId}`)}>
                            Request for Reschedule
                          </Button>
                        </TableCell>
                      </TableRow>
                    ))}
                </TableBody>
              </Table>
            </CardContent>
          </Card>
        </div>
      </div>
    </MainLayout>
  )
}
