"use client"

import { MainLayout } from "@/components/main-layout"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { CheckCircle, XCircle } from "lucide-react"
import { Plus } from "lucide-react"
import { useEffect, useState } from "react"
import { useRouter } from "next/navigation"

interface Interview {
  id: string;
  student: string;
  position: string;
  date: string;
  time: string;
  status: "scheduled" | "rescheduled" | "cancelled";
}

export default function CompanyInterviewsPage() {
  const [interviews, setInterviews] = useState<Interview[]>([])
  const router = useRouter();

  const apiUrl = process.env.NEXT_PUBLIC_API_URI;

  const fetchInterviews = async () => {
    const res = await fetch(apiUrl+`/api/companyhr/getAllRescheduleRequest/${localStorage.getItem("token")}`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      }
    })
    const data = await res.json()
    if (res.ok) {
      console.log(data);
      setInterviews(data);
    } else {
      alert(data.message);
    }
  }

  const approveRequest = async (interviewId: string) => {
    const res = await fetch(apiUrl+`/api/companyhr/approveReschedule/${localStorage.getItem("token")}`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        interviewId
      })
    })
    const data = await res.json()
    if (res.ok) {
      fetchInterviews();
    } else {
      alert(data.message);
    }
  }

  const rejectRequest = async (interviewId: string) => {
    const res = await fetch(apiUrl+`/api/companyhr/rejectReschedule/${localStorage.getItem("token")}`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        interviewId
      })
    })
    const data = await res.json()
    if (res.ok) {
      fetchInterviews();
    } else {
      alert(data.message);
    }
  }

  useEffect(() => {
    fetchInterviews();
  }
  , [])

  return (
    <MainLayout userRole="company" userName={localStorage.getItem("token")}>
      <div className="space-y-6">
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-3xl font-bold tracking-tight">Interviews</h1>
            <p className="text-muted-foreground">Manage and schedule interviews with candidates</p>
          </div>
          <Button onClick={()=>router.push("/companyhr/interviews/schedule")}>
            <Plus className="mr-2 h-4 w-4" /> Schedule Interview
          </Button>
        </div>
        <Card>
          <CardHeader className="pb-3">
            <CardTitle>Interview Rechedule Requests</CardTitle>
            <CardDescription>Approve/Reject Interview Reschedule Requests</CardDescription>
          </CardHeader>
          <CardContent>
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Candidate Email</TableHead>
                  <TableHead>Current Date</TableHead>
                  <TableHead>Current Time</TableHead>
                  <TableHead>New Date</TableHead>
                  <TableHead>New Time</TableHead>
                  <TableHead>Interviewer</TableHead>
                  <TableHead>Meeting Mode</TableHead>
                  <TableHead>Meeting Link/Location</TableHead>
                  <TableHead>Actions</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {interviews
                  .map((interview : Interview) => (
                    <TableRow key={interview.id}>
                      <TableCell className="font-medium">{interview.studentEmail}</TableCell>
                      <TableCell>{interview.date}</TableCell>
                      <TableCell>{interview.time}</TableCell>
                      <TableCell>{interview.newDate}</TableCell>
                      <TableCell>{interview.newTime}</TableCell>
                      <TableCell>{interview.interviewer}</TableCell>
                      <TableCell>{interview.meetingMode}</TableCell>
                      <TableCell>{interview.meetingLink}</TableCell>
                      <TableCell>
                      <div className="flex gap-2">
                        <Button size="sm" variant="outline" className="h-8 w-8 p-0"
                        onClick={(e)=>approveRequest(interview.interviewId)}>
                          <CheckCircle className="h-4 w-4 text-green-500" />
                          <span className="sr-only">Approve</span>
                        </Button>
                        <Button size="sm" variant="outline" className="h-8 w-8 p-0"
                        onClick={(e)=>rejectRequest(interview.interviewId)}>
                          <XCircle className="h-4 w-4 text-red-500" />
                          <span className="sr-only">Reject</span>
                        </Button>
                      </div>
                    </TableCell>
                    </TableRow>
                  ))}
              </TableBody>
            </Table>
          </CardContent>
        </Card>
      </div>
    </MainLayout>
  )
}
