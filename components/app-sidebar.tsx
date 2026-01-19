"use client"

import * as React from "react"
import { usePathname } from "next/navigation"
import {
    LayoutDashboard,
    LifeBuoy,
    Send,
    FileText,
    PlusCircle,
    Activity,
    History,
} from "lucide-react"

import { NavMain } from "@/components/nav-main"
import { NavSecondary } from "@/components/nav-secondary"
import { NavUser } from "@/components/nav-user"
import { TeamSwitcher } from "@/components/team-switcher"
import {
    Sidebar,
    SidebarContent,
    SidebarFooter,
    SidebarHeader,
} from "@/components/ui/sidebar"

// Mock data for nav
const navItems = [
    {
        title: "Dashboard",
        url: "/dashboard",
        icon: LayoutDashboard,
    },
    {
        title: "Daftar Permohonan",
        url: "/permohonan",
        icon: FileText,
    },
    {
        title: "Input Permohonan",
        url: "/permohonan/baru",
        icon: PlusCircle,
    },
    {
        title: "Status Sinkronisasi",
        url: "/admin/sync",
        icon: Activity,
    },
    {
        title: "Audit Logs",
        url: "/admin/audit",
        icon: History,
    },
]

const navSecondary = [
    {
        title: "Bantuan",
        url: "#",
        icon: LifeBuoy,
    },
    {
        title: "Feedback",
        url: "#",
        icon: Send,
    },
]

export function AppSidebar({ ...props }: React.ComponentProps<typeof Sidebar>) {
    const pathname = usePathname()

    const navMainWithActive = navItems.map((item) => ({
        ...item,
        isActive: pathname === item.url,
    }))

    return (
        <Sidebar variant="inset" {...props}>
            <SidebarHeader>
                <TeamSwitcher />
            </SidebarHeader>
            <SidebarContent>
                <NavMain items={navMainWithActive} label="Menu Utama" />
                <NavSecondary items={navSecondary} label="Bantuan" className="mt-auto" />
            </SidebarContent>
            <SidebarFooter>
                <NavUser />
            </SidebarFooter>
        </Sidebar>
    )
}
