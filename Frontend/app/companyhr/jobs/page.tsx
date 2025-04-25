"use client"

import { MainLayout } from "@/components/main-layout"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Eye, Plus, Search } from "lucide-react"
import Link from "next/link"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { useEffect, useState } from "react"
import { useRouter } from "next/navigation"

interface Job {
  jobId: number
  title: string
  description: string
  location: string
  salary: string
  requirements: string
  jobType: string
  deadline: string
  datePosted: string
  department: string,
  company: Object,
  hr: Object
}

export default function CompanyJobsPage() {
  const [jobs, setJobs] = useState<Job[]>([])
  const router = useRouter();

  const fetchJobs = async () => {
    const apiUrl = process.env.NEXT_PUBLIC_API_URI;

    const response = await fetch(apiUrl+`/api/companyhr/getJobOpenings/${localStorage.getItem("token")}`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      }
    })

    const res = await response.json();

    if (response.ok) {
      console.log(res)
      setJobs(res)
    } else {
      alert(res.message);
    }
  }

  useEffect(() => {
    fetchJobs()
  }, [])

  return (
    <MainLayout userRole="company" userName={localStorage.getItem("token") || " "}>
      <div className="space-y-6">
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-3xl font-bold tracking-tight">Job Openings</h1>
            <p className="text-muted-foreground">Manage your job postings and view applications</p>
          </div>
          <Button asChild>
            <Link href="/company/jobs/new">
              <Plus className="mr-2 h-4 w-4" /> Post New Job
            </Link>
          </Button>
        </div>
        <Card>
          <CardHeader className="pb-3">
            <CardTitle>All Job Openings</CardTitle>
          </CardHeader>
          <CardContent>
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Job Title</TableHead>
                  <TableHead>Posted On</TableHead>
                  <TableHead>Deadline</TableHead>
                  <TableHead>Actions</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {jobs
                  .map((job) => (
                    <TableRow key={job.jobId}>
                      <TableCell className="font-medium">{job.title}</TableCell>
                      <TableCell>{new Date(job.datePosted).toLocaleDateString('en-GB')}</TableCell>
                      <TableCell>{new Date(job.deadline).toLocaleDateString('en-GB')}</TableCell>
                      <TableCell>
                        <div className="flex gap-2">
                          <Button size="sm" variant="outline" className="h-8 w-8 p-0">
                            <Eye className="h-4 w-4" />
                            <span className="sr-only">View</span>
                          </Button>
                          <Button size="sm" variant="outline" onClick={() => router.push(`/companyhr/jobs/${job.jobId}/applications`)}>
                            View Applications
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
