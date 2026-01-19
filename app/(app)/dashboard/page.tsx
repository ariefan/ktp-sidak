"use client"

import { useApplications } from "@/hooks/use-applications"
import {
    Users,
    FileText,
    CheckCircle,
    Clock,
    Printer,
    AlertTriangle,
    ArrowUpRight,
    TrendingUp,
    TrendingDown,
    Activity,
    MapPin,
    Calendar,
    Zap,
    Shield,
    RefreshCw
} from "lucide-react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import Link from "next/link"
import { StatusBadge } from "@/components/status-badge"
import {
    Table,
    TableBody,
    TableCell,
    TableHead,
    TableHeader,
    TableRow,
} from "@/components/ui/table"
import { formatDate } from "@/lib/mock-data"
import { Progress } from "@/components/ui/progress"
import { Badge } from "@/components/ui/badge"
import {
    AreaChart,
    Area,
    XAxis,
    YAxis,
    CartesianGrid,
    Tooltip,
    ResponsiveContainer,
    BarChart,
    Bar,
    PieChart,
    Pie,
    Cell,
} from "recharts"

// Mock chart data
const weeklyData = [
    { name: "Sen", permohonan: 24, selesai: 18 },
    { name: "Sel", permohonan: 32, selesai: 28 },
    { name: "Rab", permohonan: 28, selesai: 22 },
    { name: "Kam", permohonan: 45, selesai: 38 },
    { name: "Jum", permohonan: 38, selesai: 35 },
    { name: "Sab", permohonan: 12, selesai: 10 },
    { name: "Min", permohonan: 8, selesai: 6 },
]

const jenisData = [
    { name: "KTP Baru", value: 45, color: "#3b82f6" },
    { name: "Hilang", value: 25, color: "#f59e0b" },
    { name: "Rusak", value: 18, color: "#ef4444" },
    { name: "Perubahan", value: 12, color: "#8b5cf6" },
]

const wilayahData = [
    { wilayah: "Cipete", total: 45 },
    { wilayah: "Cilandak", total: 38 },
    { wilayah: "Gandaria", total: 32 },
    { wilayah: "Kebayoran", total: 28 },
    { wilayah: "Mampang", total: 22 },
]

export default function DashboardPage() {
    const { applications, stats, isLoading } = useApplications()
    const recentApps = applications.slice(0, 5)

    if (isLoading) {
        return (
            <div className="flex items-center justify-center h-96">
                <div className="flex flex-col items-center gap-4">
                    <RefreshCw className="h-8 w-8 animate-spin text-primary" />
                    <p className="text-muted-foreground">Memuat data dashboard...</p>
                </div>
            </div>
        )
    }

    return (
        <div className="flex flex-col gap-6">
            {/* Hero Section */}
            <div className="relative overflow-hidden rounded-2xl bg-gradient-to-br from-blue-600 via-blue-700 to-indigo-800 p-8 text-white">
                <div className="absolute inset-0 bg-[url('/grid.svg')] opacity-10" />
                <div className="absolute -right-20 -top-20 h-64 w-64 rounded-full bg-white/10 blur-3xl" />
                <div className="absolute -bottom-20 -left-20 h-64 w-64 rounded-full bg-blue-400/20 blur-3xl" />

                <div className="relative z-10 flex items-center justify-between">
                    <div>
                        <div className="flex items-center gap-2 text-blue-200 text-sm mb-2">
                            <Calendar className="h-4 w-4" />
                            {new Date().toLocaleDateString("id-ID", { weekday: "long", year: "numeric", month: "long", day: "numeric" })}
                        </div>
                        <h1 className="text-3xl font-bold mb-2">Selamat Datang, Admin! 👋</h1>
                        <p className="text-blue-100 max-w-lg">
                            Dashboard pelayanan KTP DISPENDUKCAPIL. Monitor permohonan, verifikasi data, dan kelola proses pencetakan dari satu tempat.
                        </p>
                    </div>
                    <div className="hidden lg:flex gap-3">
                        <Button size="lg" variant="secondary" className="bg-white/10 border-white/20 hover:bg-white/20 text-white backdrop-blur-sm" asChild>
                            <Link href="/permohonan">
                                <FileText className="mr-2 h-5 w-5" /> Lihat Permohonan
                            </Link>
                        </Button>
                        <Button size="lg" className="bg-white text-blue-700 hover:bg-blue-50" asChild>
                            <Link href="/permohonan/baru">
                                <Zap className="mr-2 h-5 w-5" /> Input Cepat
                            </Link>
                        </Button>
                    </div>
                </div>
            </div>

            {/* Stats Grid - Glassmorphism Style */}
            <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
                <Card className="relative overflow-hidden border-0 bg-gradient-to-br from-blue-500 to-blue-600 text-white shadow-lg shadow-blue-500/25">
                    <CardContent className="p-6">
                        <div className="flex items-center justify-between">
                            <div>
                                <p className="text-blue-100 text-sm font-medium">Total Permohonan</p>
                                <p className="text-4xl font-bold mt-1">{stats.total}</p>
                                <div className="flex items-center gap-1 mt-2 text-blue-100 text-xs">
                                    <TrendingUp className="h-3 w-3" />
                                    <span>+12% dari kemarin</span>
                                </div>
                            </div>
                            <div className="h-14 w-14 rounded-xl bg-white/20 flex items-center justify-center backdrop-blur-sm">
                                <Users className="h-7 w-7" />
                            </div>
                        </div>
                    </CardContent>
                </Card>

                <Card className="relative overflow-hidden border-0 bg-gradient-to-br from-amber-500 to-orange-500 text-white shadow-lg shadow-amber-500/25">
                    <CardContent className="p-6">
                        <div className="flex items-center justify-between">
                            <div>
                                <p className="text-amber-100 text-sm font-medium">Menunggu Verifikasi</p>
                                <p className="text-4xl font-bold mt-1">{stats.pending}</p>
                                <div className="flex items-center gap-1 mt-2 text-amber-100 text-xs">
                                    <AlertTriangle className="h-3 w-3" />
                                    <span>Butuh tindakan</span>
                                </div>
                            </div>
                            <div className="h-14 w-14 rounded-xl bg-white/20 flex items-center justify-center backdrop-blur-sm">
                                <Clock className="h-7 w-7" />
                            </div>
                        </div>
                    </CardContent>
                </Card>

                <Card className="relative overflow-hidden border-0 bg-gradient-to-br from-emerald-500 to-green-600 text-white shadow-lg shadow-emerald-500/25">
                    <CardContent className="p-6">
                        <div className="flex items-center justify-between">
                            <div>
                                <p className="text-emerald-100 text-sm font-medium">Siap Cetak</p>
                                <p className="text-4xl font-bold mt-1">{stats.approved}</p>
                                <div className="flex items-center gap-1 mt-2 text-emerald-100 text-xs">
                                    <Printer className="h-3 w-3" />
                                    <span>Menunggu print</span>
                                </div>
                            </div>
                            <div className="h-14 w-14 rounded-xl bg-white/20 flex items-center justify-center backdrop-blur-sm">
                                <CheckCircle className="h-7 w-7" />
                            </div>
                        </div>
                    </CardContent>
                </Card>

                <Card className="relative overflow-hidden border-0 bg-gradient-to-br from-violet-500 to-purple-600 text-white shadow-lg shadow-violet-500/25">
                    <CardContent className="p-6">
                        <div className="flex items-center justify-between">
                            <div>
                                <p className="text-violet-100 text-sm font-medium">Tercetak</p>
                                <p className="text-4xl font-bold mt-1">{stats.printed}</p>
                                <div className="flex items-center gap-1 mt-2 text-violet-100 text-xs">
                                    <TrendingUp className="h-3 w-3" />
                                    <span>Selesai proses</span>
                                </div>
                            </div>
                            <div className="h-14 w-14 rounded-xl bg-white/20 flex items-center justify-center backdrop-blur-sm">
                                <Printer className="h-7 w-7" />
                            </div>
                        </div>
                    </CardContent>
                </Card>
            </div>

            {/* Charts Row */}
            <div className="grid gap-6 lg:grid-cols-3">
                {/* Area Chart */}
                <Card className="lg:col-span-2">
                    <CardHeader>
                        <div className="flex items-center justify-between">
                            <div>
                                <CardTitle className="flex items-center gap-2">
                                    <Activity className="h-5 w-5 text-blue-500" />
                                    Tren Permohonan Mingguan
                                </CardTitle>
                                <CardDescription>Perbandingan permohonan masuk vs selesai</CardDescription>
                            </div>
                            <Badge variant="outline" className="text-green-600 border-green-200 bg-green-50">
                                <TrendingUp className="h-3 w-3 mr-1" /> +18%
                            </Badge>
                        </div>
                    </CardHeader>
                    <CardContent>
                        <div className="h-[280px]">
                            <ResponsiveContainer width="100%" height="100%">
                                <AreaChart data={weeklyData}>
                                    <defs>
                                        <linearGradient id="colorPermohonan" x1="0" y1="0" x2="0" y2="1">
                                            <stop offset="5%" stopColor="#3b82f6" stopOpacity={0.3} />
                                            <stop offset="95%" stopColor="#3b82f6" stopOpacity={0} />
                                        </linearGradient>
                                        <linearGradient id="colorSelesai" x1="0" y1="0" x2="0" y2="1">
                                            <stop offset="5%" stopColor="#10b981" stopOpacity={0.3} />
                                            <stop offset="95%" stopColor="#10b981" stopOpacity={0} />
                                        </linearGradient>
                                    </defs>
                                    <CartesianGrid strokeDasharray="3 3" className="stroke-muted" />
                                    <XAxis dataKey="name" className="text-xs" />
                                    <YAxis className="text-xs" />
                                    <Tooltip
                                        contentStyle={{
                                            backgroundColor: "hsl(var(--background))",
                                            border: "1px solid hsl(var(--border))",
                                            borderRadius: "8px"
                                        }}
                                    />
                                    <Area type="monotone" dataKey="permohonan" stroke="#3b82f6" strokeWidth={2} fillOpacity={1} fill="url(#colorPermohonan)" />
                                    <Area type="monotone" dataKey="selesai" stroke="#10b981" strokeWidth={2} fillOpacity={1} fill="url(#colorSelesai)" />
                                </AreaChart>
                            </ResponsiveContainer>
                        </div>
                        <div className="flex items-center justify-center gap-6 mt-4">
                            <div className="flex items-center gap-2">
                                <div className="h-3 w-3 rounded-full bg-blue-500" />
                                <span className="text-sm text-muted-foreground">Permohonan Masuk</span>
                            </div>
                            <div className="flex items-center gap-2">
                                <div className="h-3 w-3 rounded-full bg-emerald-500" />
                                <span className="text-sm text-muted-foreground">Selesai Diproses</span>
                            </div>
                        </div>
                    </CardContent>
                </Card>

                {/* Pie Chart */}
                <Card>
                    <CardHeader>
                        <CardTitle className="flex items-center gap-2">
                            <FileText className="h-5 w-5 text-violet-500" />
                            Jenis Permohonan
                        </CardTitle>
                        <CardDescription>Distribusi berdasarkan jenis</CardDescription>
                    </CardHeader>
                    <CardContent>
                        <div className="h-[200px]">
                            <ResponsiveContainer width="100%" height="100%">
                                <PieChart>
                                    <Pie
                                        data={jenisData}
                                        cx="50%"
                                        cy="50%"
                                        innerRadius={50}
                                        outerRadius={80}
                                        paddingAngle={5}
                                        dataKey="value"
                                    >
                                        {jenisData.map((entry, index) => (
                                            <Cell key={`cell-${index}`} fill={entry.color} />
                                        ))}
                                    </Pie>
                                    <Tooltip />
                                </PieChart>
                            </ResponsiveContainer>
                        </div>
                        <div className="grid grid-cols-2 gap-2 mt-4">
                            {jenisData.map((item) => (
                                <div key={item.name} className="flex items-center gap-2">
                                    <div className="h-2.5 w-2.5 rounded-full" style={{ backgroundColor: item.color }} />
                                    <span className="text-xs text-muted-foreground">{item.name}</span>
                                    <span className="text-xs font-semibold ml-auto">{item.value}</span>
                                </div>
                            ))}
                        </div>
                    </CardContent>
                </Card>
            </div>

            {/* Bottom Row */}
            <div className="grid gap-6 lg:grid-cols-7">
                {/* Recent Applications */}
                <Card className="lg:col-span-4">
                    <CardHeader>
                        <div className="flex items-center justify-between">
                            <div>
                                <CardTitle>Permohonan Terbaru</CardTitle>
                                <CardDescription>5 permohonan terakhir yang masuk sistem</CardDescription>
                            </div>
                            <Button variant="outline" size="sm" asChild>
                                <Link href="/permohonan">
                                    Lihat Semua <ArrowUpRight className="ml-2 h-4 w-4" />
                                </Link>
                            </Button>
                        </div>
                    </CardHeader>
                    <CardContent>
                        <Table>
                            <TableHeader>
                                <TableRow>
                                    <TableHead>No. Aplikasi</TableHead>
                                    <TableHead>Nama</TableHead>
                                    <TableHead>Status</TableHead>
                                    <TableHead className="text-right">Tanggal</TableHead>
                                </TableRow>
                            </TableHeader>
                            <TableBody>
                                {recentApps.map((app) => (
                                    <TableRow key={app.id} className="cursor-pointer hover:bg-muted/50">
                                        <TableCell className="font-mono text-sm">{app.applicationNumber}</TableCell>
                                        <TableCell>
                                            <div>
                                                <p className="font-medium">{app.namaLengkap}</p>
                                                <p className="text-xs text-muted-foreground">{app.nik}</p>
                                            </div>
                                        </TableCell>
                                        <TableCell>
                                            <StatusBadge status={app.status} />
                                        </TableCell>
                                        <TableCell className="text-right text-muted-foreground text-sm">
                                            {formatDate(app.createdAt)}
                                        </TableCell>
                                    </TableRow>
                                ))}
                            </TableBody>
                        </Table>
                    </CardContent>
                </Card>

                {/* Wilayah Stats & Sync */}
                <div className="lg:col-span-3 space-y-6">
                    {/* Top Wilayah */}
                    <Card>
                        <CardHeader className="pb-3">
                            <CardTitle className="flex items-center gap-2 text-base">
                                <MapPin className="h-4 w-4 text-rose-500" />
                                Top Wilayah
                            </CardTitle>
                        </CardHeader>
                        <CardContent className="space-y-3">
                            {wilayahData.map((item, i) => (
                                <div key={item.wilayah} className="flex items-center gap-3">
                                    <span className="text-xs font-bold text-muted-foreground w-4">{i + 1}</span>
                                    <div className="flex-1">
                                        <div className="flex items-center justify-between mb-1">
                                            <span className="text-sm font-medium">{item.wilayah}</span>
                                            <span className="text-xs text-muted-foreground">{item.total}</span>
                                        </div>
                                        <Progress value={(item.total / 50) * 100} className="h-1.5" />
                                    </div>
                                </div>
                            ))}
                        </CardContent>
                    </Card>

                    {/* Sync Status */}
                    <Card>
                        <CardHeader className="pb-3">
                            <CardTitle className="flex items-center gap-2 text-base">
                                <Shield className="h-4 w-4" />
                                Status Sistem
                            </CardTitle>
                        </CardHeader>
                        <CardContent className="space-y-4">
                            <div className="flex items-center justify-between">
                                <div className="flex items-center gap-2">
                                    <div className="h-2 w-2 rounded-full bg-emerald-400 animate-pulse" />
                                    <span className="text-sm">Server PUSAT</span>
                                </div>
                                <Badge variant="default">Online</Badge>
                            </div>
                            <div className="flex items-center justify-between">
                                <span className="text-sm">Antrian Sync</span>
                                <span className="text-sm font-bold dark:text-amber-400 text-amber-600">{stats.syncPending}</span>
                            </div>
                            <div className="flex items-center justify-between">
                                <span className="text-sm">Sync Errors</span>
                                <span className="text-sm font-bold dark:text-red-400 text-red-600">{stats.syncError}</span>
                            </div>
                            <div className="pt-3 border-t border-slate-700">
                                <p className="text-xs">
                                    Terakhir sync: 2 menit yang lalu
                                </p>
                            </div>
                        </CardContent>
                    </Card>
                </div>
            </div>
        </div>
    )
}
