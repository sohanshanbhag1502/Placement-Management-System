"use client"

import type React from "react"
import Link from "next/link"
import { usePathname } from "next/navigation"
import {
  BarChart3,
  Building,
  Calendar,
  ChevronDown,
  Clipboard,
  FileText,
  Home,
  LogOut
} from "lucide-react"
import { Button } from "@/components/ui/button"
import {
  SidebarProvider,
  Sidebar,
  SidebarTrigger,
  SidebarContent,
  SidebarHeader,
  SidebarFooter,
  SidebarMenu,
  SidebarMenuItem,
  SidebarMenuButton,
  SidebarGroup,
  SidebarGroupLabel,
  SidebarGroupContent,
} from "@/components/ui/sidebar"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { useRouter } from "next/navigation"

type UserRole = "admin" | "company" | "student"

interface MainLayoutProps {
  children: React.ReactNode
  userRole: UserRole
  userName: string
}

export function MainLayout({ children, userRole, userName }: MainLayoutProps) {
  const pathname = usePathname()
  const router = useRouter()

  // Navigation items based on user role
  const getNavItems = (role: UserRole) => {
    switch (role) {
      case "admin":
        return [
          { name: "Dashboard", href: "/admin", icon: Home },
        ]
      case "company":
        return [
          { name: "Dashboard", href: "/companyhr", icon: Home },
          { name: "Job Openings", href: "/companyhr/jobs", icon: FileText },
          { name: "Post Job", href: "/companyhr/jobs/new", icon: Clipboard },
          { name: "Interviews", href: "/companyhr/interviews", icon: Calendar },
        ]
      case "student":
        return [
          { name: "Dashboard", href: "/student", icon: Home },
          { name: "Job Openings", href: "/student/jobs", icon: FileText },
          { name: "My Applications", href: "/student/applications", icon: Clipboard },
          { name: "Interviews", href: "/student/interviews", icon: Calendar },
        ]
      default:
        return []
    }
  }

  const navItems = getNavItems(userRole)
  const userInitials = userName
    .split(" ")
    .map((n) => n[0])
    .join("")
    .toUpperCase()

  return (
    <SidebarProvider>
      <div className="flex min-h-screen w-screen">
        <Sidebar>
          <SidebarHeader className="flex h-14 items-center border-b px-4">
            <Link href="/" className="flex items-center gap-2 font-semibold">
              <BarChart3 className="h-5 w-5" />
              <span>PlaceMe</span>
            </Link>
          </SidebarHeader>
          <SidebarContent>
            <SidebarGroup>
              <SidebarGroupLabel>Navigation</SidebarGroupLabel>
              <SidebarGroupContent>
                <SidebarMenu>
                  {navItems.map((item) => (
                    <SidebarMenuItem key={item.name}>
                      <SidebarMenuButton asChild isActive={pathname === item.href}>
                        <Link href={item.href}>
                          <item.icon className="h-4 w-4" />
                          <span>{item.name}</span>
                        </Link>
                      </SidebarMenuButton>
                    </SidebarMenuItem>
                  ))}
                </SidebarMenu>
              </SidebarGroupContent>
            </SidebarGroup>
          </SidebarContent>
          <SidebarFooter className="border-t p-4">
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button variant="ghost" className="w-full justify-start gap-2">
                  <span className="truncate">{userName}</span>
                  <ChevronDown className="ml-auto h-4 w-4" />
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="end" className="w-56"
              onClick={() => {
                localStorage.removeItem("token")
                router.push("/login")
              }}>
                <DropdownMenuItem>
                  <LogOut className="mr-2 h-4 w-4" />
                  <span>Log out</span>
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          </SidebarFooter>
        </Sidebar>
        <div className="w-full">
          <header className="flex h-14 items-center border-b px-4 lg:px-6 w-full">
            <SidebarTrigger />
            <div className="ml-auto flex items-center gap-4">
              <Button variant="outline" size="sm">
                Help
              </Button>
            </div>
          </header>
          <main className="w-full p-4 md:p-6">{children}</main>
        </div>
      </div>
    </SidebarProvider>
  )
}
