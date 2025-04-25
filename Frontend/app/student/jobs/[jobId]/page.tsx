"use client"

import { useState } from "react"
import Link from "next/link"
import { useParams } from "next/navigation"
import {
  ArrowLeft,
  Building,
  Calendar,
  CheckCircle,
  Clock,
  ExternalLink,
  Globe,
  Mail,
  MapPin,
  Share2,
} from "lucide-react"
import { useRouter } from "next/navigation"
import { MainLayout } from "@/components/main-layout"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { useEffect } from "react"

export default function StudentJobDetailsPage() {
  const {jobId} = useParams()
  const router = useRouter()

  const [job, setJob] = useState()

  const fetchJobDetails = async () => {
    const apiUrl = process.env.NEXT_PUBLIC_API_URI;

    const response = await fetch(apiUrl+`/api/student/getJobDetails/${localStorage.getItem("token")}`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ jobId })
    })
    if (response.ok) {
      const data = await response.json()
      setJob(data)
    }
  }

  useEffect(() => {
    fetchJobDetails()
  }, [])

  const getApplicationStatusBadgeVariant = (status: string | null) => {
    if (!status) return "outline"
    switch (status) {
      case "offered":
        return "success"
      case "interviewed":
        return "success"
      case "applied":
        return "secondary"
      case "rejected":
        return "destructive"
      default:
        return "outline"
    }
  }

  return (
    <MainLayout userRole="student" userName={localStorage.getItem("token") || ""}>
      <div className="space-y-6">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <Button variant="outline" size="icon" asChild>
              <Link href="/student/jobs">
                <ArrowLeft className="h-4 w-4" />
                <span className="sr-only">Back</span>
              </Link>
            </Button>
            <div>
              <h1 className="text-3xl font-bold tracking-tight">{job?.title}</h1>
              <div className="flex items-center gap-2">
                <p className="text-sm text-muted-foreground">
                  {job?.company.name} • {job?.location}
                </p>
              </div>
            </div>
          </div>
        </div>

        <div className="grid gap-6 md:grid-cols-3">
          <Card className="md:col-span-2">
            <CardHeader>
              <CardTitle>Job Description</CardTitle>
            </CardHeader>
            <CardContent className="space-y-6">
              <div>
                <h3 className="mb-2 font-semibold">Overview</h3>
                <p className="text-sm text-muted-foreground">{job?.description}</p>
              </div>

              <div>
                <h3 className="mb-2 font-semibold">Requirements</h3>
                <p className="text-sm text-muted-foreground">
                  {job?.requirements}
                </p>
              </div>
            </CardContent>
          </Card>

          <div className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle>Job Details</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div className="flex items-center gap-2">
                    <MapPin className="h-4 w-4 text-muted-foreground" />
                    <div>
                      <p className="text-sm font-medium">Location</p>
                      <p className="text-sm text-muted-foreground">{job?.location}</p>
                    </div>
                  </div>
                  <div className="flex items-center gap-2">
                    <Clock className="h-4 w-4 text-muted-foreground" />
                    <div>
                      <p className="text-sm font-medium">Job Type</p>
                      <p className="text-sm text-muted-foreground">{job?.jobType}</p>
                    </div>
                  </div>
                  <div className="flex items-center gap-2">
                    <Calendar className="h-4 w-4 text-muted-foreground" />
                    <div>
                      <p className="text-sm font-medium">Application Deadline</p>
                      {job?.deadline ? new Date(job.deadline).toLocaleDateString("en-US", { year: "numeric", month: "long", day: "numeric" }) : ""}
                    </div>
                  </div>
                  {job?.salary && (
                    <div className="flex items-center gap-2">
                      <Mail className="h-4 w-4 text-muted-foreground" />
                      <div>
                        <p className="text-sm font-medium">Salary Range</p>
                        <p className="text-sm text-muted-foreground">{job?.salary}</p>
                      </div>
                    </div>
                  )}
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>About the Company</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="flex flex-col gap-4">
                  <div className="flex items-center gap-3">
                    <div>
                      <h3 className="font-semibold">{job?.company.name}</h3>
                      <p className="text-sm text-muted-foreground">{job?.company.location}</p>
                    </div>
                  </div>
                  <p className="text-sm text-muted-foreground">{job?.company.about}</p>
                  <div className="flex items-center gap-2">
                    <Globe className="h-4 w-4 text-muted-foreground" />
                    <a
                      href={job?.company.website}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-sm text-primary hover:underline"
                    >
                      {job?.company.website}
                    </a>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </MainLayout>
  )
}
