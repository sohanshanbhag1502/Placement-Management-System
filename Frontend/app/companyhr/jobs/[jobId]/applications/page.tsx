"use client"

import { MainLayout } from "@/components/main-layout"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Eye, Plus, Search } from "lucide-react"
import Link from "next/link"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { useEffect, useState } from "react"
import { useParams, useRouter } from "next/navigation"

interface Application {
  applicationId: number
  studentName: string
  studentEmail: string
  studentPhoneNumber: string,
  job: Object,
  status: string
}

export default function CompanyJobsPage() {
  const {jobId} = useParams();

  const [applications, setApplications] = useState<Application[]>([])
  const router = useRouter();

  const fetchApplications = async () => {
    const apiUrl = process.env.NEXT_PUBLIC_API_URI;

    const response = await fetch(apiUrl+`/api/companyhr/getJobApplications/${localStorage.getItem("token")}`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify({jobId})
    })

    const res = await response.json();

    if (response.ok) {
      console.log(res)
      setApplications(res)
    } else {
      alert(res.message);
    }
  }

  useEffect(() => {
    fetchApplications()
  }, [])

  return (
    <MainLayout userRole="company" userName={localStorage.getItem("token") || " "}>
      <div className="space-y-6">
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-3xl font-bold tracking-tight">Job Applications</h1>
            <p className="text-muted-foreground">View Job Applications for Job {jobId}</p>
          </div>
        </div>

        <Tabs defaultValue="active">
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Position</TableHead>
                  <TableHead>Applicant Name</TableHead>
                  <TableHead>Applicant Email</TableHead>
                  <TableHead>Applicant Phone Number</TableHead>
                  <TableHead>Status</TableHead>
                  <TableHead>Actions</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {applications
                  .map((application) => (
                    <TableRow key={application.applicationId}>
                      <TableCell className="font-medium">{application.job.title}</TableCell>
                      <TableCell>{application.studentName}</TableCell>
                      <TableCell>{application.studentEmail}</TableCell>
                      <TableCell>{application.studentPhoneNumber}</TableCell>
                      <TableCell>{application.status}</TableCell>
                      <TableCell>
                        <div className="flex gap-2">
                          <Button size="sm" variant="outline" onClick={() => router.push(`/companyhr/jobs/${jobId}/applications/${application.applicationId}`)}>
                            View Application
                          </Button>
                        </div>
                      </TableCell>
                    </TableRow>
                  ))}
              </TableBody>
            </Table>
        </Tabs>
      </div>
    </MainLayout>
  )
}
