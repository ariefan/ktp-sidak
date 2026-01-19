"use client"

import { AppSidebar } from "@/components/app-sidebar"
import { SyncIndicator } from "@/components/sync-indicator"
import { ModeToggle } from "@/components/mode-toggle"
import {
    Breadcrumb,
    BreadcrumbItem,
    BreadcrumbLink,
    BreadcrumbList,
    BreadcrumbPage,
    BreadcrumbSeparator,
} from "@/components/ui/breadcrumb"
import { Separator } from "@/components/ui/separator"
import {
    SidebarInset,
    SidebarProvider,
    SidebarTrigger,
} from "@/components/ui/sidebar"
import { usePathname } from "next/navigation"

export default function AppLayout({
    children,
}: Readonly<{
    children: React.ReactNode
}>) {
    const pathname = usePathname()

    // Simple breadcrumb generator
    const getBreadcrumbs = () => {
        const parts = pathname.split('/').filter(Boolean)

        const map: Record<string, string> = {
            dashboard: "Dashboard",
            permohonan: "Permohonan",
            baru: "Input Baru",
            admin: "Administrasi",
            sync: "Sinkronisasi",
            audit: "Audit Logs"
        }

        return (
            <Breadcrumb>
                <BreadcrumbList>
                    <BreadcrumbItem className="hidden md:block">
                        <BreadcrumbLink href="/dashboard">SIDAK</BreadcrumbLink>
                    </BreadcrumbItem>
                    <BreadcrumbSeparator className="hidden md:block" />
                    {parts.map((part, index) => {
                        const isLast = index === parts.length - 1
                        const label = map[part] || part
                        return (
                            <div key={part} className="flex items-center gap-1.5 align-middle">
                                <BreadcrumbItem>
                                    {isLast ? (
                                        <BreadcrumbPage>{label}</BreadcrumbPage>
                                    ) : (
                                        <BreadcrumbLink href={`/${parts.slice(0, index + 1).join('/')}`}>
                                            {label}
                                        </BreadcrumbLink>
                                    )}
                                </BreadcrumbItem>
                                {!isLast && <BreadcrumbSeparator />}
                            </div>
                        )
                    })}
                </BreadcrumbList>
            </Breadcrumb>
        )
    }

    return (
        <SidebarProvider>
            <AppSidebar />
            <SidebarInset>
                <header className="flex h-16 shrink-0 items-center gap-2 transition-[width,height] ease-linear group-has-data-[collapsible=icon]/sidebar-wrapper:h-12 border-b bg-background sticky top-0 z-10">
                    <div className="flex items-center gap-2 px-4 w-full justify-between">
                        <div className="flex items-center gap-2">
                            <SidebarTrigger className="-ml-1" />
                            <Separator orientation="vertical" className="mr-2 h-4" />
                            {getBreadcrumbs()}
                        </div>
                        <div className="flex items-center gap-2">
                            <SyncIndicator />
                            <ModeToggle />
                        </div>
                    </div>
                </header>
                <div className="flex flex-1 flex-col gap-4 p-4 pt-4 bg-muted/10 h-full">
                    {children}
                </div>
            </SidebarInset>
        </SidebarProvider>
    )
}
