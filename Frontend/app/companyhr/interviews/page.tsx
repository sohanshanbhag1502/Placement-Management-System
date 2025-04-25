"use client"

import { MainLayout } from "@/components/main-layout"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Badge } from "@/components/ui/badge"
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
    const res = await fetch(apiUrl+`/api/companyhr/getAllInterviews/${localStorage.getItem("token")}`, {
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
            <CardTitle>All Interviews</CardTitle>
            <CardDescription>All Interviews scheduled by you</CardDescription>
          </CardHeader>
          <CardContent>
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Candidate Email</TableHead>
                  <TableHead>Date</TableHead>
                  <TableHead>Time</TableHead>
                  <TableHead>Interviewer</TableHead>
                  <TableHead>Meeting Mode</TableHead>
                  <TableHead>Meeting Link/Location</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {interviews
                  .map((interview : Interview) => (
                    <TableRow key={interview.id}>
                      <TableCell className="font-medium">{interview.studentEmail}</TableCell>
                      <TableCell>{interview.date}</TableCell>
                      <TableCell>{interview.time}</TableCell>
                      <TableCell>{interview.interviewer}</TableCell>
                      <TableCell>{interview.meetingMode}</TableCell>
                      <TableCell>{interview.meetingLink}</TableCell>
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
