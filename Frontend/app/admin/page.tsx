"use client"

import { MainLayout } from "@/components/main-layout"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Badge } from "@/components/ui/badge"
import { CheckCircle, Search, XCircle } from "lucide-react"
import { useEffect, useState } from "react"
import { useRouter } from "next/navigation"

interface Company {
  admin: {
    email: string
  };
  company: {
    companyId: string,
    name: string
  };
  status: string;
}

export default function CompaniesPage() {
  const [companies, setCompanies] = useState<Company[]>([]);
  const router = useRouter();

  const fetchAllCompanies = async () => {
    const apiUrl = process.env.NEXT_PUBLIC_API_URI;

    const res = await fetch(apiUrl+`/api/admin/getAllCompanies/${localStorage.getItem("token")}`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      }
    })
    const data = await res.json()

    if (res.ok) {
      setCompanies(data);
    } else {
      alert(data.message);
    }
  }

  const approveCompany = async (companyId: string) => {
    const apiUrl = process.env.NEXT_PUBLIC_API_URI;

    const res = await fetch(apiUrl+`/api/admin/approve/${localStorage.getItem("token")}`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        companyId
      })
    })
    const data = await res.json()
    if (res.ok) {
      fetchAllCompanies();
    } else {
      alert(data.message);
    }
  }

  const rejectCompany = async (companyId: string) => {
    const apiUrl = process.env.NEXT_PUBLIC_API_URI;

    const res = await fetch(apiUrl+`/api/admin/reject/${localStorage.getItem("token")}`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        companyId
      })
    })
    const data = await res.json()
    if (res.ok) {
      fetchAllCompanies();
    } else {
      alert(data.message);
    }
  }

  useEffect(() => {
    fetchAllCompanies();
  }, [])

  return (
    <MainLayout userRole="admin" userName={localStorage.getItem("token") || ""}>
      <div className="space-y-6 w-full">
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-3xl font-bold tracking-tight">Companies</h1>
            <p className="text-muted-foreground">Manage company registrations and approvals</p>
          </div>
          <div className="flex items-center gap-2">
            <div className="relative">
              <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
              <Input type="search" placeholder="Search companies..." className="w-[250px] pl-8" />
            </div>
          </div>
        </div>

        <Card>
          <CardHeader>
            <CardTitle>Companies Requested for Approval</CardTitle>
            <CardDescription>View and manage all registered companies</CardDescription>
          </CardHeader>
          <CardContent>
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Name</TableHead>
                  <TableHead>Status</TableHead>
                  <TableHead>Actions</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {companies.map((company : Company) => (
                  <TableRow key={company.company.companyId}>
                    <TableCell className="font-medium">{company.company.name}</TableCell>
                    <TableCell>
                      <Badge
                        variant={
                          company.status === "approved"
                            ? "default"
                            : company.status === "pending"
                              ? "outline"
                              : "destructive"
                        }
                      >
                        {company.status}
                      </Badge>
                    </TableCell>
                    <TableCell>
                      <div className="flex gap-2">
                        <Button size="sm" variant="outline" className="h-8 w-8 p-0"
                        onClick={(e)=>approveCompany(company.company.companyId)}>
                          <CheckCircle className="h-4 w-4 text-green-500" />
                          <span className="sr-only">Approve</span>
                        </Button>
                        <Button size="sm" variant="outline" className="h-8 w-8 p-0"
                        onClick={(e)=>rejectCompany(company.company.companyId)}>
                          <XCircle className="h-4 w-4 text-red-500" />
                          <span className="sr-only">Reject</span>
                        </Button>
                        <Button size="sm" variant="outline" onClick={()=>router.push(`/admin/viewcompany/${company.company.companyId}`)}>
                          View
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
