"use client"

import { useApplications } from "@/hooks/use-applications"
import { DataTable } from "@/components/data-table"
import { ColumnDef } from "@tanstack/react-table"
import { KTPApplication, formatDate } from "@/lib/mock-data"
import { Button } from "@/components/ui/button"
import { ArrowUpDown, MoreHorizontal, Plus, Eye, Pencil, Trash } from "lucide-react"
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuLabel,
    DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { StatusBadge } from "@/components/status-badge"
import Link from "next/link"
import { useRouter } from "next/navigation"

export default function PermohonanPage() {
    const { applications, isLoading } = useApplications()
    const router = useRouter()

    const columns: ColumnDef<KTPApplication>[] = [
        {
            accessorKey: "applicationNumber",
            header: "No. Aplikasi",
            cell: ({ row }) => <div className="font-medium">{row.getValue("applicationNumber")}</div>,
        },
        {
            accessorKey: "nik",
            header: "NIK",
        },
        {
            accessorKey: "namaLengkap",
            header: ({ column }) => {
                return (
                    <Button
                        variant="ghost"
                        onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
                    >
                        Nama Lengkap
                        <ArrowUpDown className="ml-2 h-4 w-4" />
                    </Button>
                )
            },
        },
        {
            accessorKey: "jenisPermohonan",
            header: "Jenis",
            cell: ({ row }) => <div className="capitalize">{row.getValue("jenisPermohonan")}</div>,
        },
        // Using teamId to filter by status for now (misusing Data Table generic prop logic slightly so I'll fix structure)
        // I'll filter by 'status' key
        {
            accessorKey: "status",
            header: "Status",
            cell: ({ row }) => <StatusBadge status={row.getValue("status")} />,
            filterFn: (row, id, value) => {
                return value === "all" ? true : row.getValue(id) === value
            },
        },
        {
            accessorKey: "createdAt",
            header: "Tanggal",
            cell: ({ row }) => <div className="text-right">{formatDate(row.getValue("createdAt"))}</div>,
        },
        {
            id: "actions",
            cell: ({ row }) => {
                const app = row.original

                return (
                    <DropdownMenu>
                        <DropdownMenuTrigger asChild>
                            <Button variant="ghost" className="h-8 w-8 p-0">
                                <span className="sr-only">Open menu</span>
                                <MoreHorizontal className="h-4 w-4" />
                            </Button>
                        </DropdownMenuTrigger>
                        <DropdownMenuContent align="end">
                            <DropdownMenuLabel>Actions</DropdownMenuLabel>
                            <DropdownMenuItem onClick={() => router.push(`/permohonan/${app.id}`)}>
                                <Eye className="mr-2 h-4 w-4" /> Lihat Detail
                            </DropdownMenuItem>
                            <DropdownMenuItem>
                                <Pencil className="mr-2 h-4 w-4" /> Edit Data
                            </DropdownMenuItem>
                            <DropdownMenuLabel>Admin</DropdownMenuLabel>
                            <DropdownMenuItem className="text-red-600">
                                <Trash className="mr-2 h-4 w-4" /> Hapus
                            </DropdownMenuItem>
                        </DropdownMenuContent>
                    </DropdownMenu>
                )
            },
        },
    ]

    return (
        <div className="flex flex-col gap-4">
            <div className="flex items-center justify-between">
                <div>
                    <h2 className="text-2xl font-bold tracking-tight">Daftar Permohonan</h2>
                    <p className="text-muted-foreground">
                        Kelola data masuk permohonan KTP masyarakat.
                    </p>
                </div>
                <Button asChild>
                    <Link href="/permohonan/baru">
                        <Plus className="mr-2 h-4 w-4" /> Buat Baru
                    </Link>
                </Button>
            </div>

            {isLoading ? (
                <div className="p-8 text-center text-muted-foreground">Memuat data...</div>
            ) : (
                <DataTable
                    columns={columns}
                    data={applications}
                    searchKey="namaLengkap"
                    filterColumn="status"
                    filterOptions={[
                        { label: "Pending", value: "pending" },
                        { label: "Verified", value: "verified" },
                        { label: "Approved", value: "approved" },
                        { label: "Printed", value: "printed" },
                        { label: "Rejected", value: "rejected" },
                    ]}
                />
            )}
        </div>
    )
}
