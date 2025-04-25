"use client"

import { MainLayout } from "@/components/main-layout"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Badge } from "@/components/ui/badge"
import { Eye, FileText, Search } from "lucide-react"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { useEffect, useState } from "react"
import Link from "next/link"

interface jobApplication {
  applicationId: number;
  studentName: string;
  studentEmail: string;
  studentPhoneNumber: string;
  studentDepartment: string;
  studentCGPA: string;
  studentResumeUrl: string;
  studentLinkedIn: string;
  studentGitHub: string;
  studentPortfolioUrl: string;
  JobOpening: Object;
  JobStatus: Object;
}

export default function StudentApplicationsPage() {
  const [applications, setApplications] = useState<jobApplication[]>([])
  const apiUrl = process.env.NEXT_PUBLIC_API_URI;

  const fetchApplications = async () => {
    const response = await fetch(apiUrl+`/api/student/getAllApplications/${localStorage.getItem("token")}`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
    })

    const res = await response.json()

    if (response.ok) {
      setApplications(res)
    } else {
      console.error("Failed to fetch applications:", res.message)
    }
  }

  useEffect(() => {
    fetchApplications()
  }, [])

  return (
    <MainLayout userRole="student" userName={localStorage.getItem("token") || ""}>
      <div className="space-y-6">
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-3xl font-bold tracking-tight">My Applications</h1>
            <p className="text-muted-foreground">Track the status of your job applications</p>
          </div>
          <Button asChild>
            <Link href="/student/jobs">
              <FileText className="mr-2 h-4 w-4" /> Browse Jobs
            </Link>
          </Button>
        </div>

        <Tabs defaultValue="all">
          <TabsList>
            <TabsTrigger value="all">All Applications</TabsTrigger>
          </TabsList>
          <TabsContent value="all" className="space-y-4">
            <Card>
              <CardHeader className="pb-3">
                <CardTitle>All Applications</CardTitle>
                <CardDescription>Complete history of your job applications</CardDescription>
              </CardHeader>
              <CardContent>
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead>Application Id</TableHead>
                      <TableHead>Company</TableHead>
                      <TableHead>Position</TableHead>
                      <TableHead>Status</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {applications.map((application) => (
                      <TableRow key={application.applicationId}>
                        <TableCell className="font-medium">{application.applicationId}</TableCell>
                        <TableCell>{application.job.company.name}</TableCell>
                        <TableCell>{application.job.title}</TableCell>
                        <TableCell>
                            {application.status}
                        </TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </div>
    </MainLayout>
  )
}
