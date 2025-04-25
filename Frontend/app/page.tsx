import Link from "next/link"
import { ArrowRight } from "lucide-react"

import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"

export default function Home() {
  return (
    <div className="flex min-h-screen flex-col items-center justify-center p-4">
      <div className="mx-auto max-w-3xl space-y-8 text-center">
        <h1 className="text-4xl font-bold tracking-tighter sm:text-5xl md:text-6xl">Placement Management System</h1>
        <p className="mx-auto max-w-[700px] text-gray-500 md:text-xl dark:text-gray-400">
          Connecting students with opportunities and companies with talent
        </p>
        <div className="flex flex-col gap-4 sm:flex-row sm:justify-center">
          <Button asChild size="lg">
            <Link href="/login">
              Login
              <ArrowRight className="ml-2 h-4 w-4" />
            </Link>
          </Button>
        </div>
      </div>

      <div className="mt-16 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
        <Card>
          <CardHeader>
            <CardTitle>For Students</CardTitle>
            <CardDescription>Find and apply for job opportunities</CardDescription>
          </CardHeader>
          <CardContent>
            <ul className="list-disc pl-5 space-y-2">
              <li>Browse all available job openings</li>
              <li>Apply with a single click</li>
              <li>Track application status</li>
              <li>Manage interview schedules</li>
            </ul>
          </CardContent>
          <CardFooter>
            <Button asChild variant="outline" className="w-full">
              <Link href="/student/register">Register as Student</Link>
            </Button>
          </CardFooter>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>For Companies</CardTitle>
            <CardDescription>Post jobs and find the right talent</CardDescription>
          </CardHeader>
          <CardContent>
            <ul className="list-disc pl-5 space-y-2">
              <li>Post job openings</li>
              <li>Review applications</li>
              <li>Schedule interviews</li>
              <li>Manage hiring process</li>
            </ul>
          </CardContent>
          <CardFooter>
            <Button asChild variant="outline" className="w-full">
              <Link href="/company/register">Register as Company</Link>
            </Button>
          </CardFooter>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>For Company HR</CardTitle>
            <CardDescription>Access your Company Dashboard</CardDescription>
          </CardHeader>
          <CardContent>
            <ul className="list-disc pl-5 space-y-2">
              <li>Post job openings</li>
              <li>Review applications</li>
              <li>Schedule interviews</li>
              <li>Manage hiring process</li>
            </ul>
          </CardContent>
          <CardFooter>
            <Button asChild variant="outline" className="w-full">
              <Link href="/companyhr/register">Register as Company HR</Link>
            </Button>
          </CardFooter>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>For Administrators</CardTitle>
            <CardDescription>Manage the entire placement process</CardDescription>
          </CardHeader>
          <CardContent>
            <ul className="list-disc pl-5 space-y-2">
              <li>Approve company registrations</li>
              <li>Monitor placement statistics</li>
              <li>Oversee the entire process</li>
              <li>Generate reports</li>
            </ul>
          </CardContent>
          <CardFooter>
            <Button asChild variant="outline" className="w-full">
              <Link href="/admin/company">Admin Login</Link>
            </Button>
          </CardFooter>
        </Card>
      </div>
    </div>
  )
}
