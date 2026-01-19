"use client"

import { mockAuditLogs, formatDateTime } from "@/lib/mock-data"
import {
    Table,
    TableBody,
    TableCell,
    TableHead,
    TableHeader,
    TableRow,
} from "@/components/ui/table"
import {
    Card,
    CardContent,
    CardDescription,
    CardHeader,
    CardTitle,
} from "@/components/ui/card"

export default function AuditPage() {
    return (
        <div className="flex flex-col gap-6">
            <div>
                <h2 className="text-2xl font-bold tracking-tight">Audit Logs</h2>
                <p className="text-muted-foreground">
                    Jejak rekam aktivitas user dalam sistem.
                </p>
            </div>

            <Card>
                <CardHeader>
                    <CardTitle>Log Aktivitas</CardTitle>
                    <CardDescription>Semua perubahan data tercatat disini.</CardDescription>
                </CardHeader>
                <CardContent>
                    <Table>
                        <TableHeader>
                            <TableRow>
                                <TableHead>Waktu</TableHead>
                                <TableHead>User</TableHead>
                                <TableHead>Action</TableHead>
                                <TableHead>Deskripsi</TableHead>
                            </TableRow>
                        </TableHeader>
                        <TableBody>
                            {mockAuditLogs.map((log) => (
                                <TableRow key={log.id}>
                                    <TableCell className="whitespace-nowrap font-medium text-muted-foreground text-xs">
                                        {formatDateTime(log.createdAt)}
                                    </TableCell>
                                    <TableCell>
                                        <div className="flex flex-col">
                                            <span className="font-medium text-sm">{log.userName}</span>
                                            <span className="text-xs text-muted-foreground">ID: {log.userId}</span>
                                        </div>
                                    </TableCell>
                                    <TableCell>
                                        <span className={`inline-flex items-center rounded-md px-2 py-1 text-xs font-medium ring-1 ring-inset ${log.action === 'CREATE' ? 'bg-green-50 text-green-700 ring-green-600/20' :
                                                log.action === 'UPDATE' ? 'bg-blue-50 text-blue-700 ring-blue-600/20' :
                                                    'bg-red-50 text-red-700 ring-red-600/20'
                                            }`}>
                                            {log.action}
                                        </span>
                                    </TableCell>
                                    <TableCell className="text-sm">{log.description}</TableCell>
                                </TableRow>
                            ))}
                        </TableBody>
                    </Table>
                </CardContent>
            </Card>
        </div>
    )
}
