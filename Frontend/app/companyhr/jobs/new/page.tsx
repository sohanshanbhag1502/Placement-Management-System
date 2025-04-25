"use client"

import { MainLayout } from "@/components/main-layout"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { DatePicker } from "@/components/ui/date-picker"
import { useState } from "react"

export default function NewJobPage() {
  const [jobType, setJobType] = useState<string>("");
  const [location, setLocation] = useState<string>("");
  const [title, setTitle] = useState<string>("");
  const [description, setDescription] = useState<string>("");
  const [requirements, setRequirements] = useState<string>("");
  const [salary, setSalary] = useState<string>("");
  const [deadline, setDeadline] = useState<Date>();

  const postJob = async () => {
    const jobData = {
      title,
      location,
      jobType,
      deadline,
      description,
      requirements,
      salary,
      datePosted: new Date()
    }

    const apiUrl = process.env.NEXT_PUBLIC_API_URI;

    const response = await fetch(apiUrl+`/api/companyhr/postJobOpening/${localStorage.getItem("token")}`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify(jobData)
    });

    const res = await response.json();

    if (response.ok) {
      alert("Job posted successfully!");
      setTitle("");
      setLocation("");
      setJobType("");
      setDeadline(new Date());
      setDescription("");
      setRequirements("");
      setSalary("");
    } else {
      alert(res.message);
    }
  }

  return (
    <MainLayout userRole="company" userName={localStorage.getItem("token") || " "}>
      <div className="space-y-6">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">Post a New Job</h1>
          <p className="text-muted-foreground">Create a new job opening for students to apply</p>
        </div>

        <Card>
          <CardHeader>
            <CardTitle>Job Details</CardTitle>
            <CardDescription>Fill in the details for the new job opening</CardDescription>
          </CardHeader>
          <CardContent className="space-y-6">
            <div className="space-y-2">
              <Label htmlFor="title">Job Title</Label>
              <Input id="title" placeholder="e.g. Software Engineer" 
              value={title} onChange={(e)=>setTitle(e.currentTarget.value)}/>
            </div>

            <div className="space-y-2">
              <Label htmlFor="location">Location</Label>
              <Input id="location" placeholder="e.g. New York, NY" 
              value={location} onChange={(e)=>setLocation(e.currentTarget.value)}/>
            </div>

            <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
              <div className="space-y-2">
                <Label htmlFor="type">Job Type</Label>
                <Select
                value={jobType} onValueChange={(e)=>setJobType(e)}>
                  <SelectTrigger id="type">
                    <SelectValue placeholder="Select job type" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="full-time">Full-time</SelectItem>
                    <SelectItem value="part-time">Part-time</SelectItem>
                    <SelectItem value="internship">Internship</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              <div className="space-y-2">
                <Label htmlFor="deadline">Application Deadline</Label>
                <DatePicker date={deadline} setDate={setDeadline} />
              </div>
            </div>

            <div className="space-y-2">
              <Label htmlFor="description">Job Description</Label>
              <Textarea
                id="description"
                placeholder="Describe the job role, responsibilities, and requirements..."
                rows={6}
                value={description} onChange={(e)=>setDescription(e.currentTarget.value)}
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="requirements">Requirements</Label>
              <Textarea
                id="requirements"
                placeholder="List the skills, qualifications, and experience required..."
                rows={4}
                value={requirements} onChange={(e)=>setRequirements(e.currentTarget.value)}
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="salary">Salary Range</Label>
              <Input id="salary" placeholder="e.g. $60,000 - $80,000" 
              value={salary} onChange={(e)=>setSalary(e.currentTarget.value)}/>
            </div>
          </CardContent>
          <CardFooter className="flex justify-end gap-2">
            <Button onClick={postJob}>Post Job</Button>
          </CardFooter>
        </Card>
      </div>
    </MainLayout>
  )
}
