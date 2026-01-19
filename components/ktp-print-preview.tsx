"use client"

import * as React from "react"
import { KTPApplication, formatDateTime } from "@/lib/mock-data"
import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogFooter,
    DialogHeader,
    DialogTitle,
    DialogTrigger,
} from "@/components/ui/dialog"
import { Button } from "@/components/ui/button"
import { Printer } from "lucide-react"

interface KTPPrintPreviewProps {
    application: KTPApplication
    open: boolean
    onOpenChange: (open: boolean) => void
    onConfirmPrint: () => void
}

export function KTPPrintPreview({ application, open, onOpenChange, onConfirmPrint }: KTPPrintPreviewProps) {
    return (
        <Dialog open={open} onOpenChange={onOpenChange}>
            <DialogContent className="max-w-[700px]">
                <DialogHeader>
                    <DialogTitle>Preview Cetak e-KTP</DialogTitle>
                    <DialogDescription>
                        Pastikan data sudah benar sebelum mencetak blanko KTP.
                    </DialogDescription>
                </DialogHeader>

                {/* KTP MOCK LAYOUT */}
                <div className="relative mx-auto w-[600px] h-[378px] bg-blue-100 rounded-[16px] shadow-lg overflow-hidden border border-blue-200 mt-4 my-6">
                    <div className="absolute inset-0 bg-[url('/images/ktp-bg.png')] bg-cover opacity-20 pointer-events-none" />

                    {/* Header */}
                    <div className="text-center pt-2">
                        <h2 className="text-sm font-bold uppercase tracking-wider">Provinsi {application.provinsi}</h2>
                        <h3 className="text-sm font-bold uppercase tracking-wider">{application.kabupatenKota}</h3>
                    </div>

                    {/* Content */}
                    <div className="px-6 py-2 flex gap-4">
                        {/* Left Column - Text */}
                        <div className="flex-1 text-[11px] font-bold leading-[1.6] space-y-0.5 uppercase">
                            <div className="grid grid-cols-[80px_1fr]">
                                <span className="text-[14px]">NIK</span>
                                <span className="text-[14px]">: {application.nik}</span>
                            </div>
                            <div className="grid grid-cols-[80px_1fr] mt-2">
                                <span>Nama</span>
                                <span>: {application.namaLengkap}</span>
                            </div>
                            <div className="grid grid-cols-[80px_1fr]">
                                <span>Tempat/Tgl Lahir</span>
                                <span>: {application.tempatLahir}, {application.tanggalLahir}</span>
                            </div>
                            <div className="grid grid-cols-[80px_1fr]">
                                <span>Jenis Kelamin</span>
                                <span>: {application.jenisKelamin === 'L' ? 'LAKI-LAKI' : 'PEREMPUAN'} <span className="ml-8">Gol. Darah : {application.golonganDarah}</span></span>
                            </div>
                            <div className="grid grid-cols-[80px_1fr]">
                                <span>Alamat</span>
                                <span>: {application.alamat.substring(0, 25)}</span>
                            </div>
                            <div className="grid grid-cols-[80px_1fr]">
                                <span className="pl-4">RT/RW</span>
                                <span>: {application.rt}/{application.rw}</span>
                            </div>
                            <div className="grid grid-cols-[80px_1fr]">
                                <span className="pl-4">Kel/Desa</span>
                                <span>: {application.kelurahan}</span>
                            </div>
                            <div className="grid grid-cols-[80px_1fr]">
                                <span className="pl-4">Kecamatan</span>
                                <span>: {application.kecamatan}</span>
                            </div>
                            <div className="grid grid-cols-[80px_1fr]">
                                <span>Agama</span>
                                <span>: {application.agama}</span>
                            </div>
                            <div className="grid grid-cols-[80px_1fr]">
                                <span>Status Perkawinan</span>
                                <span>: {application.statusPerkawinan}</span>
                            </div>
                            <div className="grid grid-cols-[80px_1fr]">
                                <span>Pekerjaan</span>
                                <span>: {application.pekerjaan}</span>
                            </div>
                            <div className="grid grid-cols-[80px_1fr]">
                                <span>Kewarganegaraan</span>
                                <span>: {application.kewarganegaraan}</span>
                            </div>
                            <div className="grid grid-cols-[80px_1fr]">
                                <span>Berlaku Hingga</span>
                                <span>: SEUMUR HIDUP</span>
                            </div>
                        </div>

                        {/* Right Column - Photo */}
                        <div className="w-[160px] flex flex-col items-center pt-8 gap-2">
                            <div className="w-[140px] h-[180px] bg-gray-300 rounded overflow-hidden">
                                {/* Using placeholder or actual photo if we had it stored */}
                                <div className="w-full h-full bg-gray-200 flex items-center justify-center text-muted-foreground text-xs text-center p-2">
                                    FOTO PEMOHON
                                </div>
                            </div>
                            <div className="w-full text-center text-[10px] uppercase font-bold mt-2">
                                {application.kabupatenKota}
                                <br />
                                {formatDateTime(new Date().toISOString()).split(',')[0]}
                            </div>
                            {/* Fake sign */}
                            <div className="w-[100px] h-[40px] border-b border-dashed border-gray-400 mt-2"></div>
                        </div>
                    </div>
                </div>

                <DialogFooter className="gap-2 sm:gap-0">
                    <Button variant="outline" onClick={() => onOpenChange(false)}>
                        Batal
                    </Button>
                    <Button onClick={onConfirmPrint}>
                        <Printer className="mr-2 h-4 w-4" />
                        Cetak Sekarang
                    </Button>
                </DialogFooter>
            </DialogContent>
        </Dialog>
    )
}
