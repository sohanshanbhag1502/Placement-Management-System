"use client"

import React, { useEffect, useState } from 'react';
import Link from "next/link"
import { useParams } from "next/navigation"
import { ArrowLeft, Building, Calendar, CheckCircle, Edit, FileText, Mail, MapPin, Phone, Shield, Trash, Users, XCircle } from 'lucide-react'
import { MainLayout } from "@/components/main-layout"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"
import { Textarea } from "@/components/ui/textarea"
import { Label } from "@/components/ui/label"
import { Avatar, AvatarFallback } from "@/components/ui/avatar"

interface CompanyDetails {
    companyId: string;
    name: string;
    email: string;
    location: string;
    contactNumber: string;
    address: string;
    website: string;
    description: string;
    logoUrl: string;
}

export default function CompanyDetailsPage() {
    const {company} = useParams();
    const [companyDetails, setCompanyDetails] = useState<CompanyDetails>();

    const apiUrl = process.env.NEXT_PUBLIC_API_URI;

    const fetchCompanyDetails = async () => {
        const res = await fetch(apiUrl+`/api/admin/getCompanyDetails/${localStorage.getItem("token")}`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({ companyId: company })
        });
        const data = await res.json();
        if (res.ok) {
            console.log(data);
            setCompanyDetails(data);
        } else {
            alert(data.message);
        }
    }

    useEffect(() => {
        fetchCompanyDetails();
    }
    , [company]);

  return (
    <MainLayout userRole="admin" userName={localStorage.getItem("token") || ""}>
      <div className="space-y-6">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <Button variant="outline" size="icon" asChild>
              <Link href="/admin">
                <ArrowLeft className="h-4 w-4" />
                <span className="sr-only">Back</span>
              </Link>
            </Button>
            <div>
              <h1 className="text-3xl font-bold tracking-tight">View Company</h1>
            </div>
          </div>
        </div>
        <div className="grid gap-6 md:grid-cols-3">
          <Card className="md:col-span-2">
            <CardHeader>
              <CardTitle>Company Information</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="flex flex-col gap-6">
                <div className="flex items-start gap-4">
                  <Avatar className="h-16 w-16 rounded-md">
                    <AvatarFallback className="rounded-md bg-primary text-primary-foreground">
                      {companyDetails?.logoUrl}
                    </AvatarFallback>
                  </Avatar>
                  <div className="space-y-1">
                    <h3 className="font-semibold">{companyDetails?.name}</h3>
                    <p className="text-sm text-muted-foreground">{companyDetails?.website}</p>
                    <div className="flex flex-wrap gap-x-4 gap-y-2 pt-1 text-sm">
                      <div className="flex items-center gap-1">
                        <MapPin className="h-3.5 w-3.5 text-muted-foreground" />
                        <span>{companyDetails?.address}</span>
                      </div>
                      <div className="flex items-center gap-1">
                        <Mail className="h-3.5 w-3.5 text-muted-foreground" />
                        <span>{companyDetails?.email}</span>
                      </div>
                      <div className="flex items-center gap-1">
                        <Phone className="h-3.5 w-3.5 text-muted-foreground" />
                        <span>{companyDetails?.contactNumber}</span>
                      </div>
                    </div>
                  </div>
                </div>
                <div>
                  <h3 className="mb-2 font-semibold">Description</h3>
                  <p className="text-sm text-muted-foreground">{companyDetails?.description}</p>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </MainLayout>
  )
}
