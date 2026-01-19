"use client"

import { use, useState, useEffect } from "react"
import { getApplicationById, KTPApplication, mockAuditLogs, formatDateTime, getStatusLabel } from "@/lib/mock-data"
import { StatusBadge } from "@/components/status-badge"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Separator } from "@/components/ui/separator"
import { toast } from "sonner"
import {
    ArrowLeft,
    CheckCircle,
    XCircle,
    Printer,
    History,
    FileText,
    User,
    MapPin,
    Phone
} from "lucide-react"
import { useRouter } from "next/navigation"
import { KTPPrintPreview } from "@/components/ktp-print-preview"
import {
    Table,
    TableBody,
    TableCell,
    TableHead,
    TableHeader,
    TableRow,
} from "@/components/ui/table"

export default function PermohonanDetailPage({ params }: { params: Promise<{ id: string }> }) {
    const resolvedParams = use(params)
    const router = useRouter()
    const [app, setApp] = useState<KTPApplication | undefined>(undefined)
    const [loading, setLoading] = useState(true)
    const [printOpen, setPrintOpen] = useState(false)

    useEffect(() => {
        // Simulate fetch
        setTimeout(() => {
            const found = getApplicationById(resolvedParams.id)
            setApp(found)
            setLoading(false)
        }, 500)
    }, [resolvedParams.id])

    if (loading) {
        return <div className="p-8 text-center text-muted-foreground">Memuat detail permohonan...</div>
    }

    if (!app) {
        return <div className="p-8 text-center text-red-500">Data tidak ditemukan</div>
    }

    const handleAction = (action: string) => {
        toast.info(`Simulasi Action: ${action}`, {
            description: "Status akan berubah (Mock only)"
        })
        // In a real app we would mutate data here and re-fetch
    }

    const handlePrint = () => {
        setPrintOpen(false)
        toast.success("KTP Berhasil Dicetak!", {
            description: "Status update ke 'Printed' dan notifikasi SMS terkirim."
        })
    }

    return (
        <div className="flex flex-col gap-6 max-w-5xl mx-auto pb-20">
            {/* Header Actions */}
            <div className="flex items-center justify-between">
                <div className="flex items-center gap-4">
                    <Button variant="ghost" size="icon" onClick={() => router.back()}>
                        <ArrowLeft className="h-4 w-4" />
                    </Button>
                    <div>
                        <h2 className="text-xl font-bold tracking-tight">{app.namaLengkap}</h2>
                        <div className="flex items-center gap-2 text-sm text-muted-foreground">
                            <span>{app.applicationNumber}</span>
                            <span>•</span>
                            <span>{getStatusLabel(app.status)}</span>
                        </div>
                    </div>
                </div>
                <div className="flex items-center gap-2">
                    {app.status === 'pending' && (
                        <>
                            <Button variant="destructive" onClick={() => handleAction("Reject")}>
                                <XCircle className="mr-2 h-4 w-4" /> Tolak
                            </Button>
                            <Button onClick={() => handleAction("Verify")}>
                                <CheckCircle className="mr-2 h-4 w-4" /> Verifikasi
                            </Button>
                        </>
                    )}
                    {app.status === 'verified' && (
                        <Button className="bg-green-600 hover:bg-green-700" onClick={() => handleAction("Approve")}>
                            <CheckCircle className="mr-2 h-4 w-4" /> Setujui (Approve)
                        </Button>
                    )}
                    {app.status === 'approved' && (
                        <Button variant="outline" className="border-blue-500 text-blue-600 hover:bg-blue-50" onClick={() => setPrintOpen(true)}>
                            <Printer className="mr-2 h-4 w-4" /> Cetak KTP
                        </Button>
                    )}
                    {app.status === 'printed' && (
                        <Button disabled variant="outline">Sudah Dicetak</Button>
                    )}
                </div>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                {/* Left Column: Data Details */}
                <div className="lg:col-span-2 space-y-6">
                    <Card>
                        <CardHeader>
                            <CardTitle className="flex items-center gap-2">
                                <User className="h-5 w-5" /> Data Pribadi
                            </CardTitle>
                        </CardHeader>
                        <CardContent className="space-y-4">
                            <div className="grid grid-cols-2 gap-4">
                                <div>
                                    <label className="text-xs text-muted-foreground font-semibold uppercase">NIK</label>
                                    <p className="font-medium">{app.nik}</p>
                                </div>
                                <div>
                                    <label className="text-xs text-muted-foreground font-semibold uppercase">No KK</label>
                                    <p className="font-medium">{app.noKK}</p>
                                </div>
                                <div>
                                    <label className="text-xs text-muted-foreground font-semibold uppercase">Tempat / Tgl Lahir</label>
                                    <p className="font-medium">{app.tempatLahir}, {app.tanggalLahir}</p>
                                </div>
                                <div>
                                    <label className="text-xs text-muted-foreground font-semibold uppercase">Jenis Kelamin</label>
                                    <p className="font-medium">{app.jenisKelamin === 'L' ? 'LAKI-LAKI' : 'PEREMPUAN'}</p>
                                </div>
                                <div>
                                    <label className="text-xs text-muted-foreground font-semibold uppercase">Gol. Darah</label>
                                    <p className="font-medium">{app.golonganDarah}</p>
                                </div>
                                <div>
                                    <label className="text-xs text-muted-foreground font-semibold uppercase">Agama</label>
                                    <p className="font-medium">{app.agama}</p>
                                </div>
                                <div>
                                    <label className="text-xs text-muted-foreground font-semibold uppercase">Status Perkawinan</label>
                                    <p className="font-medium">{app.statusPerkawinan}</p>
                                </div>
                                <div>
                                    <label className="text-xs text-muted-foreground font-semibold uppercase">Pekerjaan</label>
                                    <p className="font-medium">{app.pekerjaan}</p>
                                </div>
                            </div>
                        </CardContent>
                    </Card>

                    <Card>
                        <CardHeader>
                            <CardTitle className="flex items-center gap-2">
                                <MapPin className="h-5 w-5" /> Alamat Domisili
                            </CardTitle>
                        </CardHeader>
                        <CardContent className="space-y-4">
                            <div>
                                <label className="text-xs text-muted-foreground font-semibold uppercase">Alamat</label>
                                <p className="font-medium">{app.alamat}</p>
                            </div>
                            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                                <div>
                                    <label className="text-xs text-muted-foreground font-semibold uppercase">RT / RW</label>
                                    <p className="font-medium">{app.rt} / {app.rw}</p>
                                </div>
                                <div>
                                    <label className="text-xs text-muted-foreground font-semibold uppercase">Kode Pos</label>
                                    <p className="font-medium">{app.kodePos}</p>
                                </div>
                            </div>
                            <div className="grid grid-cols-2 gap-4">
                                <div>
                                    <label className="text-xs text-muted-foreground font-semibold uppercase">Kelurahan</label>
                                    <p className="font-medium">{app.kelurahan}</p>
                                </div>
                                <div>
                                    <label className="text-xs text-muted-foreground font-semibold uppercase">Kecamatan</label>
                                    <p className="font-medium">{app.kecamatan}</p>
                                </div>
                                <div>
                                    <label className="text-xs text-muted-foreground font-semibold uppercase">Kota</label>
                                    <p className="font-medium">{app.kabupatenKota}</p>
                                </div>
                                <div>
                                    <label className="text-xs text-muted-foreground font-semibold uppercase">Provinsi</label>
                                    <p className="font-medium">{app.provinsi}</p>
                                </div>
                            </div>
                        </CardContent>
                    </Card>
                </div>

                {/* Right Column: Status & History */}
                <div className="space-y-6">
                    <Card>
                        <CardHeader>
                            <CardTitle className="flex items-center gap-2">
                                <FileText className="h-5 w-5" /> Status & Kontak
                            </CardTitle>
                        </CardHeader>
                        <CardContent className="space-y-4">
                            <div className="space-y-1">
                                <label className="text-xs text-muted-foreground font-semibold uppercase">Jenis Permohonan</label>
                                <div className="capitalize font-medium">{app.jenisPermohonan}</div>
                            </div>
                            <div className="space-y-1">
                                <label className="text-xs text-muted-foreground font-semibold uppercase">Status Saat Ini</label>
                                <div><StatusBadge status={app.status} /></div>
                            </div>
                            <Separator />
                            <div className="space-y-1">
                                <label className="text-xs text-muted-foreground font-semibold uppercase">No. HP / WA</label>
                                <div className="font-medium flex items-center gap-2">
                                    <Phone className="h-3 w-3" /> {app.nomorHP}
                                </div>
                            </div>
                            <div className="space-y-1">
                                <label className="text-xs text-muted-foreground font-semibold uppercase">Email</label>
                                <div className="font-medium">{app.email}</div>
                            </div>
                        </CardContent>
                    </Card>

                    <Card>
                        <CardHeader>
                            <CardTitle className="flex items-center gap-2">
                                <History className="h-5 w-5" /> Riwayat
                            </CardTitle>
                        </CardHeader>
                        <CardContent>
                            <div className="space-y-4">
                                {/* Simplified timeline */}
                                <div className="relative pl-4 border-l-2 border-muted space-y-6">
                                    <div className="relative">
                                        <div className="absolute -left-[21px] top-1 h-3 w-3 rounded-full bg-green-500 border-2 border-background" />
                                        <p className="text-sm font-medium">Permohonan Masuk</p>
                                        <p className="text-xs text-muted-foreground">{formatDateTime(app.createdAt)}</p>
                                        <p className="text-xs text-muted-foreground mt-0.5">Oleh: Staff Kelurahan</p>
                                    </div>
                                    {app.verifiedAt && (
                                        <div className="relative">
                                            <div className="absolute -left-[21px] top-1 h-3 w-3 rounded-full bg-blue-500 border-2 border-background" />
                                            <p className="text-sm font-medium">Terverifikasi</p>
                                            <p className="text-xs text-muted-foreground">{formatDateTime(app.verifiedAt)}</p>
                                            <p className="text-xs text-muted-foreground mt-0.5">Oleh: Admin Kecamatan</p>
                                        </div>
                                    )}
                                    {app.approvedAt && (
                                        <div className="relative">
                                            <div className="absolute -left-[21px] top-1 h-3 w-3 rounded-full bg-blue-500 border-2 border-background" />
                                            <p className="text-sm font-medium">Disetujui PUSAT</p>
                                            <p className="text-xs text-muted-foreground">{formatDateTime(app.approvedAt)}</p>
                                        </div>
                                    )}
                                    {app.printedAt && (
                                        <div className="relative">
                                            <div className="absolute -left-[21px] top-1 h-3 w-3 rounded-full bg-purple-500 border-2 border-background" />
                                            <p className="text-sm font-medium">Dicetak</p>
                                            <p className="text-xs text-muted-foreground">{formatDateTime(app.printedAt)}</p>
                                        </div>
                                    )}
                                </div>
                            </div>
                        </CardContent>
                    </Card>
                </div>
            </div>

            {printOpen && (
                <KTPPrintPreview
                    application={app}
                    open={printOpen}
                    onOpenChange={setPrintOpen}
                    onConfirmPrint={handlePrint}
                />
            )}
        </div>
    )
}
