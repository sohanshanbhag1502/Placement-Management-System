"use client"

import { useEffect, useState } from "react"
import Link from "next/link"
import { useParams } from "next/navigation"
import { ArrowLeft, Calendar, CheckCircle, Clock, Download, ExternalLink, FileText, Mail, MapPin, Phone, User } from 'lucide-react'
import { MainLayout } from "@/components/main-layout"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"

export default function ApplicationDetailsPage() {
  const {applicationId} = useParams()
  const [application, setApplication] = useState()
  const [token, setToken] = useState("")

  const fetchApplication = async () => {
    const apiUrl = process.env.NEXT_PUBLIC_API_URI

    const response = await fetch(apiUrl+`/api/companyhr/getJobApplication/${localStorage.getItem("token")}`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ applicationId }),
    })

    const res = await response.json()

    if (response.ok) {
      console.log(res)
      setApplication(res)
    } else {
      console.error("Failed to fetch application:", res.message)
    }
  }

  useEffect(() => {
    fetchApplication()
    setToken(localStorage.getItem("token"))
  }, [])

  const getStatusBadgeVariant = (status: string) => {
    switch (status) {
      case "hired":
        return "success"
      case "interviewed":
        return "success"
      case "reviewed":
        return "outline"
      case "new":
        return "secondary"
      case "rejected":
        return "destructive"
      default:
        return "secondary"
    }
  }

  return (
    <MainLayout userRole="company" userName={token}>
      <div className="space-y-6">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <Button variant="outline" size="icon" asChild>
              <Link href={`/company/jobs/${application?.job.jobId}`}>
                <ArrowLeft className="h-4 w-4" />
                <span className="sr-only">Back</span>
              </Link>
            </Button>
            <div>
              <h1 className="text-3xl font-bold tracking-tight">Application Details</h1>
              <div className="flex items-center gap-2">
                <Badge variant={getStatusBadgeVariant(application?.status)}>{application?.status}</Badge>
              </div>
            </div>
          </div>
        </div>
      </div>

        <div className="grid gap-6 md:grid-cols-3">
          <Card className="md:col-span-2">
            <CardHeader>
              <div className="flex items-center justify-between">
                <CardTitle>Applicant Information</CardTitle>
                <Button variant="outline" size="sm" asChild>
                  <Link href={`/company/students/${application?.applicationId}`}>
                    <User className="mr-2 h-4 w-4" />
                    View Full Profile
                  </Link>
                </Button>
              </div>
            </CardHeader>
            <CardContent>
              <div className="flex flex-col gap-6">
                <div className="flex items-start gap-4">
                  <div className="space-y-1">
                    <h3 className="font-semibold">{application?.studentName}</h3>
                    <div className="flex flex-wrap gap-x-4 gap-y-2 pt-1 text-sm">
                      <div className="flex items-center gap-1">
                        <Mail className="h-3.5 w-3.5 text-muted-foreground" />
                        <span>{application?.studentEmail}</span>
                      </div>
                      <div className="flex items-center gap-1">
                        <Phone className="h-3.5 w-3.5 text-muted-foreground" />
                        <span>{application?.studentPhoneNumber}</span>
                      </div>
                    </div>
                  </div>
                </div>

                <div>
                  <h3 className="mb-3 font-semibold">Application Documents</h3>
                  <div className="grid gap-3 sm:grid-cols-2">
                    <div className="flex items-center gap-3 rounded-lg border p-3">
                      <FileText className="h-8 w-8 text-muted-foreground" />
                      <div className="flex-1">
                        <h4 className="font-medium">Resume</h4>
                        <p className="text-sm text-muted-foreground">{application?.studentResumeUrl}</p>
                      </div>
                      <Button variant="outline" size="sm"
                      onClick={() => window.open(application?.studentResumeUrl, "_blank")}>
                        Open
                      </Button>
                    </div>
                  </div>
                </div>
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
                  <div>
                    <h3 className="font-semibold">{application?.job.title}</h3>
                    <p className="text-sm text-muted-foreground">{application?.job.department}</p>
                  </div>
                  <div className="flex items-center gap-2">
                    <MapPin className="h-4 w-4 text-muted-foreground" />
                    <p className="text-sm">{application?.job.location}</p>
                  </div>
                  <div className="flex items-center gap-2">
                    <p className="text-sm">{application?.job.jobType}</p>
                  </div>
                  <div className="flex items-center gap-2">
                    <Calendar className="h-4 w-4 text-muted-foreground" />
                    <p>{new Date(application?.job.deadline).toLocaleDateString("en-GB")}</p>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
    </MainLayout>
  )
}
