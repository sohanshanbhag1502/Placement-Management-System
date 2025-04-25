"use client"

import { MainLayout } from "@/components/main-layout"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { useEffect, useState } from "react"
import { useRouter } from "next/navigation"

export default function JobsPage() {
  const [jobs, setJobs] = useState([])
  const [appliedJobs, setAppliedJobs] = useState([])
  const router = useRouter();

  const fetchAllJobs = async () => {
    const apiUrl = process.env.NEXT_PUBLIC_API_URI;

    const response = await fetch(apiUrl + `/api/student/getAllJobOpenings/${localStorage.getItem("token")}`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      }
    })

    const res = await response.json();

    if (response.ok) {
      setJobs(res)
    } else {
      alert(res.message);
    }

  }

  const fetchAllAppliedJobs = async () => {
    const apiUrl = process.env.NEXT_PUBLIC_API_URI;

    const response = await fetch(apiUrl + `/api/student/getAllApplications/${localStorage.getItem("token")}`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      }
    })

    const res = await response.json();

    if (response.ok) {
      setAppliedJobs(res)
    } else {
      alert(res.message);
    }

  }

  const applyJob = async (jobId: string) => {
    const apiUrl = process.env.NEXT_PUBLIC_API_URI;

    const response = await fetch(apiUrl + `/api/student/applyForJob/${localStorage.getItem("token")}`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify({
        jobId
      })
    })

    const res = await response.json();

    if (response.ok) {
      console.log(res)
      alert("Applied Successfully")
      fetchAllJobs()
    } else {
      alert(res.message);
    }

  }

  useEffect(() => {
    fetchAllJobs()
    fetchAllAppliedJobs()
  }
  , [])

  return (
    <MainLayout userRole="student" userName={localStorage.getItem("token") || ""}>
      <div className="space-y-6 w-full">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">Job Openings</h1>
          <p className="text-muted-foreground">Browse and apply for available job opportunities</p>
        </div>

        <div className="flex flex-row gap-4 w-full">
          {jobs.map((job) => (
            <Card key={job.jobId} className="w-full">
              <CardHeader>
                <div className="flex items-center justify-between w-full">
                  <CardTitle className="line-clamp-1">{job.title}</CardTitle>
                  <Badge variant="outline">{job.jobType}</Badge>
                </div>
                <CardDescription>
                  {job.company.name} • {job.location}
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="flex justify-between text-sm w-full">
                  <span className="text-muted-foreground">Posted: {new Date(job.datePosted).getDay()+"-"+new Date(job.datePosted).getMonth()+"-"+new Date(job.datePosted).getFullYear()}</span>
                  <span className="text-muted-foreground">Deadline: {new Date(job.deadline).getDay()+"-"+new Date(job.deadline).getMonth()+"-"+new Date(job.deadline).getFullYear()}</span>
                </div>
                <div className="flex gap-4 w-full justify-evenly w-full">
                  <Button className="w-full" onClick={(e)=>{applyJob(job.jobId);}}
                    disabled={appliedJobs.filter(appliedJob=>appliedJob.job.jobId===job.jobId).length>0}>{
                  appliedJobs.filter(appliedJob=>appliedJob.job.jobId==job.jobId).length>0?"Applied":"Apply"
                  }</Button>
                  <Button className="w-full" variant="outline" onClick={()=>router.push(`/student/jobs/${job.jobId}`)}>Details</Button>
                </div>
              </CardContent>
            </Card>
          ))}
          </div>
        </div>
    </MainLayout>
  )
}
