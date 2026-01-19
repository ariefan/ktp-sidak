"use client"

import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { RefreshCw, CheckCircle, XCircle, Cloud } from "lucide-react"
import { useState } from "react"
import { toast } from "sonner"
import {
    Table,
    TableBody,
    TableCell,
    TableHead,
    TableHeader,
    TableRow,
} from "@/components/ui/table"

export default function SyncStatusPage() {
    const [syncing, setSyncing] = useState(false)

    const handleManualSync = () => {
        setSyncing(true)
        setTimeout(() => {
            setSyncing(false)
            toast.success("Sinkronisasi Manual Berhasil", {
                description: "15 data terkirim ke server PUSAT."
            })
        }, 2000)
    }

    return (
        <div className="flex flex-col gap-6">
            <div>
                <h2 className="text-2xl font-bold tracking-tight">Status Sinkronisasi</h2>
                <p className="text-muted-foreground">
                    Monitor koneksi dan antrian data ke server PUSAT.
                </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                <Card className="bg-green-50 border-green-200">
                    <CardHeader className="pb-2">
                        <CardDescription className="flex items-center gap-2 font-semibold text-green-700">
                            <CheckCircle className="h-4 w-4" /> KONEKSI SYSTEM
                        </CardDescription>
                        <CardTitle className="text-3xl text-green-800">ONLINE</CardTitle>
                    </CardHeader>
                    <CardContent>
                        <p className="text-xs text-green-600">Latency: 45ms</p>
                    </CardContent>
                </Card>
                <Card className="bg-yellow-50 border-yellow-200">
                    <CardHeader className="pb-2">
                        <CardDescription className="flex items-center gap-2 font-semibold text-yellow-700">
                            <Cloud className="h-4 w-4" /> ANTRIAN SYNC
                        </CardDescription>
                        <CardTitle className="text-3xl text-yellow-800">15</CardTitle>
                    </CardHeader>
                    <CardContent>
                        <p className="text-xs text-yellow-600">Menunggu jadwal auto-sync</p>
                    </CardContent>
                </Card>
                <Card className="bg-red-50 border-red-200">
                    <CardHeader className="pb-2">
                        <CardDescription className="flex items-center gap-2 font-semibold text-red-700">
                            <XCircle className="h-4 w-4" /> GAGAL
                        </CardDescription>
                        <CardTitle className="text-3xl text-red-800">2</CardTitle>
                    </CardHeader>
                    <CardContent>
                        <p className="text-xs text-red-600">Timeout / Conflict</p>
                    </CardContent>
                </Card>
            </div>

            <Card>
                <CardHeader className="flex flex-row items-center justify-between">
                    <div>
                        <CardTitle>Riwayat Sinkronisasi</CardTitle>
                        <CardDescription>Log aktivitas sinkronisasi terakhir.</CardDescription>
                    </div>
                    <Button onClick={handleManualSync} disabled={syncing}>
                        <RefreshCw className={`mr-2 h-4 w-4 ${syncing ? "animate-spin" : ""}`} />
                        {syncing ? "Menyelaraskan..." : "Sync Sekarang"}
                    </Button>
                </CardHeader>
                <CardContent>
                    <Table>
                        <TableHeader>
                            <TableRow>
                                <TableHead>Waktu</TableHead>
                                <TableHead>Tipe</TableHead>
                                <TableHead>Status</TableHead>
                                <TableHead className="text-right">Durasi</TableHead>
                            </TableRow>
                        </TableHeader>
                        <TableBody>
                            <TableRow>
                                <TableCell className="font-medium">Baru Saja</TableCell>
                                <TableCell>Auto-Sync</TableCell>
                                <TableCell><span className="text-green-600 font-bold">Success</span> (12 records)</TableCell>
                                <TableCell className="text-right">1.2s</TableCell>
                            </TableRow>
                            <TableRow>
                                <TableCell className="font-medium">10 Menit lalu</TableCell>
                                <TableCell>Manual</TableCell>
                                <TableCell><span className="text-green-600 font-bold">Success</span> (5 records)</TableCell>
                                <TableCell className="text-right">0.8s</TableCell>
                            </TableRow>
                            <TableRow>
                                <TableCell className="font-medium">30 Menit lalu</TableCell>
                                <TableCell>Auto-Sync</TableCell>
                                <TableCell><span className="text-red-600 font-bold">Failed</span> (Timeout)</TableCell>
                                <TableCell className="text-right">30.0s</TableCell>
                            </TableRow>
                        </TableBody>
                    </Table>
                </CardContent>
            </Card>
        </div>
    )
}
