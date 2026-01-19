"use client"

import { useState } from "react"
import { useForm } from "react-hook-form"
import { zodResolver } from "@hookform/resolvers/zod"
import * as z from "zod"
import { format } from "date-fns"
import { CalendarIcon, Loader2, Save, UploadCloud, Camera } from "lucide-react"

import { cn } from "@/lib/utils"
import { Button } from "@/components/ui/button"
import { Calendar } from "@/components/ui/calendar"
import {
    Form,
    FormControl,
    FormDescription,
    FormField,
    FormItem,
    FormLabel,
    FormMessage,
} from "@/components/ui/form"
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from "@/components/ui/select"
import { Input } from "@/components/ui/input"
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group"
import { Textarea } from "@/components/ui/textarea"
import {
    Popover,
    PopoverContent,
    PopoverTrigger,
} from "@/components/ui/popover"
import { FileUploadMock } from "@/components/file-upload-mock"
import { SelfieCapture } from "@/components/selfie-capture"
import { toast } from "sonner"
import { useRouter } from "next/navigation"
import { Separator } from "@/components/ui/separator"
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card"

// Validation Schema
const formSchema = z.object({
    jenisPermohonan: z.enum(["baru", "hilang", "rusak", "perubahan"]),

    // Data Pribadi
    namaLengkap: z.string().min(3, "Nama terlalu pendek"),
    nik: z.string().length(16, "NIK harus 16 digit").regex(/^\d+$/, "NIK harus angka"),
    noKK: z.string().length(16, "No KK harus 16 digit").regex(/^\d+$/, "No KK harus angka"),
    tempatLahir: z.string().min(2),
    tanggalLahir: z.date({ required_error: "Tanggal lahir wajib diisi" }),
    jenisKelamin: z.enum(["L", "P"], { required_error: "Pilih jenis kelamin" }),
    golonganDarah: z.string(),
    agama: z.string(),
    statusPerkawinan: z.string(),
    pekerjaan: z.string().min(2),
    kewarganegaraan: z.enum(["WNI", "WNA"]),

    // Alamat
    alamat: z.string().min(5),
    rt: z.string().min(1).max(3),
    rw: z.string().min(1).max(3),
    provinsi: z.string().min(1),
    kabupatenKota: z.string().min(1),
    kecamatan: z.string().min(1),
    kelurahan: z.string().min(1),
    kodePos: z.string().length(5),

    // Kontak
    nomorHP: z.string().min(10),
    email: z.string().email().optional().or(z.literal("")),
})

export function KTPForm() {
    const router = useRouter()
    const [loading, setLoading] = useState(false)
    const [files, setFiles] = useState<{
        fotoKK?: File | null
        fotoKTPLama?: File | null
        suratKehilangan?: File | null
        fotoSelfie?: File | null
    }>({})

    const form = useForm<z.infer<typeof formSchema>>({
        resolver: zodResolver(formSchema),
        defaultValues: {
            jenisPermohonan: "baru",
            kewarganegaraan: "WNI",
            provinsi: "DKI JAKARTA",
            kabupatenKota: "JAKARTA SELATAN",
            kecamatan: "CILANDAK",
            kelurahan: "CIPETE SELATAN",
        },
    })

    const watchJenisPermohonan = form.watch("jenisPermohonan")

    async function onSubmit(values: z.infer<typeof formSchema>) {
        if (!files.fotoKK) {
            toast.error("Foto Kartu Keluarga wajib diupload")
            return
        }
        if (!files.fotoSelfie) {
            toast.error("Foto Selfie wajib diambil untuk verifikasi")
            return
        }
        if (watchJenisPermohonan === "hilang" && !files.suratKehilangan) {
            toast.error("Surat Kehilangan Kepolisian wajib diupload")
            return
        }
        if (watchJenisPermohonan === "rusak" && !files.fotoKTPLama) {
            toast.error("Foto KTP Lama/Rusak wajib diupload")
            return
        }

        setLoading(true)

        setTimeout(() => {
            setLoading(false)
            console.log("Form Values:", values)
            console.log("Files:", files)

            toast.success("Permohonan Berhasil Dikirim", {
                description: `Nomor Registrasi: REG-${Math.floor(Math.random() * 10000)}`,
            })

            setTimeout(() => {
                router.push("/permohonan")
            }, 1500)
        }, 2000)
    }

    return (
        <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8 pb-8">

                {/* Section 1: Jenis Permohonan - COMPACT */}
                <Card className="border-l-4 border-l-blue-500 shadow-sm">
                    <CardHeader>
                        <CardTitle className="flex items-center gap-2">
                            Langkah 1: Jenis Permohonan
                        </CardTitle>
                        <CardDescription>
                            Pilih salah satu
                        </CardDescription>
                    </CardHeader>
                    <CardContent>
                        <FormField
                            control={form.control}
                            name="jenisPermohonan"
                            render={({ field }) => (
                                <FormItem>
                                    <FormControl>
                                        <RadioGroup
                                            onValueChange={field.onChange}
                                            defaultValue={field.value}
                                            className="grid grid-cols-2 md:grid-cols-4 gap-2"
                                        >
                                            {["baru", "hilang", "rusak", "perubahan"].map((type) => (
                                                <FormItem key={type}>
                                                    <FormControl>
                                                        <RadioGroupItem value={type} id={type} className="peer sr-only" />
                                                    </FormControl>
                                                    <FormLabel
                                                        htmlFor={type}
                                                        className="flex items-center justify-center rounded-md border bg-popover py-2 px-1 hover:bg-accent hover:text-accent-foreground peer-data-[state=checked]:border-blue-500 peer-data-[state=checked]:bg-blue-50 peer-data-[state=checked]:text-blue-700 cursor-pointer w-full text-center capitalize transition-all"
                                                    >
                                                        <span className="text-sm font-medium">{type.replace("perubahan", "Ubah Data").toUpperCase()}</span>
                                                    </FormLabel>
                                                </FormItem>
                                            ))}
                                        </RadioGroup>
                                    </FormControl>
                                    <FormMessage />
                                </FormItem>
                            )}
                        />
                    </CardContent>
                </Card>


                {/* Section 2: Dokumen (MOVED TO TOP) */}
                <Card className="border-l-4 border-l-purple-500 shadow-sm">
                    <CardHeader>
                        <CardTitle className="flex items-center gap-2">
                            Langkah 2: Verifikasi Identitas & Dokumen
                        </CardTitle>
                        <CardDescription>
                            Wajib melampirkan foto selfie terbaru dan dokumen pendukung
                        </CardDescription>
                    </CardHeader>
                    <CardContent className="space-y-6">
                        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
                            <div className="space-y-4">
                                <div className="flex items-center gap-2 mb-2">
                                    <div className="h-8 w-8 rounded-full bg-purple-100 flex items-center justify-center text-purple-600">
                                        <Camera className="h-4 w-4" />
                                    </div>
                                    <div>
                                        <h4 className="font-semibold">Foto Selfie Biometrik *</h4>
                                        <p className="text-xs text-muted-foreground">Wajah harus terlihat jelas, tanpa aksesoris</p>
                                    </div>
                                </div>
                                <div className="bg-muted/30 p-2 rounded-xl border-dashed border-2">
                                    <SelfieCapture
                                        onCapture={(file) => setFiles((prev) => ({ ...prev, fotoSelfie: file }))}
                                    />
                                </div>
                            </div>

                            <div className="space-y-6">
                                <div>
                                    <div className="flex items-center gap-2 mb-2">
                                        <div className="h-8 w-8 rounded-full bg-blue-100 flex items-center justify-center text-blue-600">
                                            <UploadCloud className="h-4 w-4" />
                                        </div>
                                        <div>
                                            <h4 className="font-semibold">Kartu Keluarga (KK) *</h4>
                                            <p className="text-xs text-muted-foreground">Scan/Foto asli KK terbaru</p>
                                        </div>
                                    </div>
                                    <FileUploadMock
                                        label="Upload Kartu Keluarga"
                                        onChange={(file) => setFiles((prev) => ({ ...prev, fotoKK: file }))}
                                    />
                                </div>

                                {watchJenisPermohonan === "hilang" && (
                                    <div className="animate-in fade-in slide-in-from-top-2">
                                        <div className="flex items-center gap-2 mb-2">
                                            <div className="h-8 w-8 rounded-full bg-amber-100 flex items-center justify-center text-amber-600">
                                                <UploadCloud className="h-4 w-4" />
                                            </div>
                                            <div>
                                                <h4 className="font-semibold">Surat Kehilangan Kepolisian *</h4>
                                                <p className="text-xs text-muted-foreground">Surat keterangan hilang yang masih berlaku</p>
                                            </div>
                                        </div>
                                        <FileUploadMock
                                            label="Upload Surat Polisi"
                                            onChange={(file) => setFiles((prev) => ({ ...prev, suratKehilangan: file }))}
                                        />
                                    </div>
                                )}

                                {(watchJenisPermohonan === "rusak" || watchJenisPermohonan === "perubahan") && (
                                    <div className="animate-in fade-in slide-in-from-top-2">
                                        <div className="flex items-center gap-2 mb-2">
                                            <div className="h-8 w-8 rounded-full bg-red-100 flex items-center justify-center text-red-600">
                                                <UploadCloud className="h-4 w-4" />
                                            </div>
                                            <div>
                                                <h4 className="font-semibold">KTP Lama / Rusak *</h4>
                                                <p className="text-xs text-muted-foreground">Fisik KTP lama yang dimiliki</p>
                                            </div>
                                        </div>
                                        <FileUploadMock
                                            label="Upload KTP Lama"
                                            onChange={(file) => setFiles((prev) => ({ ...prev, fotoKTPLama: file }))}
                                        />
                                    </div>
                                )}
                            </div>
                        </div>
                    </CardContent>
                </Card>

                {/* Section 3: Data Pribadi */}
                <Card className="shadow-sm">
                    <CardHeader>
                        <CardTitle>Langkah 3: Lengkapi Data Diri</CardTitle>
                        <CardDescription>Isi biodata sesuai dengan dokumen yang dilampirkan</CardDescription>
                    </CardHeader>
                    <CardContent className="space-y-6">
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                            <FormField control={form.control} name="namaLengkap" render={({ field }) => (
                                <FormItem>
                                    <FormLabel>Nama Lengkap (Sesuai Ijazah/Akta)</FormLabel>
                                    <FormControl><Input placeholder="CONTOH: BUDI SANTOSO" {...field} className="uppercase bg-muted/20" /></FormControl>
                                    <FormMessage />
                                </FormItem>
                            )} />

                            <div className="grid grid-cols-2 gap-4">
                                <FormField control={form.control} name="nik" render={({ field }) => (
                                    <FormItem>
                                        <FormLabel>NIK</FormLabel>
                                        <FormControl><Input placeholder="3174..." maxLength={16} {...field} className="bg-muted/20" /></FormControl>
                                        <FormMessage />
                                    </FormItem>
                                )} />
                                <FormField control={form.control} name="noKK" render={({ field }) => (
                                    <FormItem>
                                        <FormLabel>No. Kartu Keluarga</FormLabel>
                                        <FormControl><Input placeholder="3174..." maxLength={16} {...field} className="bg-muted/20" /></FormControl>
                                        <FormMessage />
                                    </FormItem>
                                )} />
                            </div>

                            <FormField control={form.control} name="tempatLahir" render={({ field }) => (
                                <FormItem>
                                    <FormLabel>Tempat Lahir</FormLabel>
                                    <FormControl><Input placeholder="JAKARTA" {...field} className="uppercase" /></FormControl>
                                    <FormMessage />
                                </FormItem>
                            )} />

                            <FormField control={form.control} name="tanggalLahir" render={({ field }) => (
                                <FormItem className="flex flex-col">
                                    <FormLabel>Tanggal Lahir</FormLabel>
                                    <Popover>
                                        <PopoverTrigger asChild>
                                            <FormControl>
                                                <Button variant={"outline"} className={cn("w-full pl-3 text-left font-normal", !field.value && "text-muted-foreground")}>
                                                    {field.value ? format(field.value, "PPP") : <span>Pilih tanggal</span>}
                                                    <CalendarIcon className="ml-auto h-4 w-4 opacity-50" />
                                                </Button>
                                            </FormControl>
                                        </PopoverTrigger>
                                        <PopoverContent className="w-auto p-0" align="start">
                                            <Calendar
                                                mode="single"
                                                selected={field.value}
                                                onSelect={field.onChange}
                                                disabled={(date) => date > new Date() || date < new Date("1900-01-01")}
                                                initialFocus
                                            />
                                        </PopoverContent>
                                    </Popover>
                                    <FormMessage />
                                </FormItem>
                            )} />

                            <FormField control={form.control} name="jenisKelamin" render={({ field }) => (
                                <FormItem>
                                    <FormLabel>Jenis Kelamin</FormLabel>
                                    <Select onValueChange={field.onChange} defaultValue={field.value}>
                                        <FormControl><SelectTrigger><SelectValue placeholder="Pilih..." /></SelectTrigger></FormControl>
                                        <SelectContent>
                                            <SelectItem value="L">Laki-laki</SelectItem>
                                            <SelectItem value="P">Perempuan</SelectItem>
                                        </SelectContent>
                                    </Select>
                                    <FormMessage />
                                </FormItem>
                            )} />

                            <FormField control={form.control} name="golonganDarah" render={({ field }) => (
                                <FormItem>
                                    <FormLabel>Golongan Darah</FormLabel>
                                    <Select onValueChange={field.onChange} defaultValue={field.value}>
                                        <FormControl><SelectTrigger><SelectValue placeholder="Pilih..." /></SelectTrigger></FormControl>
                                        <SelectContent>
                                            <SelectItem value="A">A</SelectItem>
                                            <SelectItem value="B">B</SelectItem>
                                            <SelectItem value="AB">AB</SelectItem>
                                            <SelectItem value="O">O</SelectItem>
                                            <SelectItem value="-">-</SelectItem>
                                        </SelectContent>
                                    </Select>
                                    <FormMessage />
                                </FormItem>
                            )} />

                            <FormField control={form.control} name="agama" render={({ field }) => (
                                <FormItem>
                                    <FormLabel>Agama</FormLabel>
                                    <Select onValueChange={field.onChange} defaultValue={field.value}>
                                        <FormControl><SelectTrigger><SelectValue placeholder="Pilih..." /></SelectTrigger></FormControl>
                                        <SelectContent>
                                            <SelectItem value="ISLAM">ISLAM</SelectItem>
                                            <SelectItem value="KRISTEN">KRISTEN</SelectItem>
                                            <SelectItem value="KATOLIK">KATOLIK</SelectItem>
                                            <SelectItem value="HINDU">HINDU</SelectItem>
                                            <SelectItem value="BUDDHA">BUDDHA</SelectItem>
                                            <SelectItem value="KONGHUCU">KONGHUCU</SelectItem>
                                        </SelectContent>
                                    </Select>
                                    <FormMessage />
                                </FormItem>
                            )} />

                            <FormField control={form.control} name="statusPerkawinan" render={({ field }) => (
                                <FormItem>
                                    <FormLabel>Status Perkawinan</FormLabel>
                                    <Select onValueChange={field.onChange} defaultValue={field.value}>
                                        <FormControl><SelectTrigger><SelectValue placeholder="Pilih..." /></SelectTrigger></FormControl>
                                        <SelectContent>
                                            <SelectItem value="BELUM KAWIN">BELUM KAWIN</SelectItem>
                                            <SelectItem value="KAWIN">KAWIN</SelectItem>
                                            <SelectItem value="CERAI HIDUP">CERAI HIDUP</SelectItem>
                                            <SelectItem value="CERAI MATI">CERAI MATI</SelectItem>
                                        </SelectContent>
                                    </Select>
                                    <FormMessage />
                                </FormItem>
                            )} />

                            <FormField control={form.control} name="pekerjaan" render={({ field }) => (
                                <FormItem>
                                    <FormLabel>Pekerjaan</FormLabel>
                                    <FormControl><Input placeholder="KARYAWAN SWASTA" {...field} className="uppercase" /></FormControl>
                                    <FormMessage />
                                </FormItem>
                            )} />
                        </div>
                    </CardContent>
                </Card>

                {/* Section 4: Alamat */}
                <Card className="shadow-sm">
                    <CardHeader>
                        <CardTitle>Alamat Domisili</CardTitle>
                    </CardHeader>
                    <CardContent className="space-y-6">
                        <FormField control={form.control} name="alamat" render={({ field }) => (
                            <FormItem>
                                <FormLabel>Alamat Lengkap (Jalan/Gang)</FormLabel>
                                <FormControl><Textarea placeholder="JL. MERDEKA NO. 45" className="uppercase resize-none bg-muted/20" {...field} /></FormControl>
                                <FormMessage />
                            </FormItem>
                        )} />

                        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                            <FormField control={form.control} name="rt" render={({ field }) => (
                                <FormItem>
                                    <FormLabel>RT</FormLabel>
                                    <FormControl><Input placeholder="001" maxLength={3} {...field} /></FormControl>
                                    <FormMessage />
                                </FormItem>
                            )} />
                            <FormField control={form.control} name="rw" render={({ field }) => (
                                <FormItem>
                                    <FormLabel>RW</FormLabel>
                                    <FormControl><Input placeholder="001" maxLength={3} {...field} /></FormControl>
                                    <FormMessage />
                                </FormItem>
                            )} />
                            <FormField control={form.control} name="kodePos" render={({ field }) => (
                                <FormItem>
                                    <FormLabel>Kode Pos</FormLabel>
                                    <FormControl><Input placeholder="12345" maxLength={5} {...field} /></FormControl>
                                    <FormMessage />
                                </FormItem>
                            )} />
                        </div>

                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                            <FormField control={form.control} name="provinsi" render={({ field }) => (
                                <FormItem>
                                    <FormLabel>Provinsi</FormLabel>
                                    <FormControl><Input {...field} className="uppercase bg-muted" readOnly /></FormControl>
                                    <FormMessage />
                                </FormItem>
                            )} />
                            <FormField control={form.control} name="kabupatenKota" render={({ field }) => (
                                <FormItem>
                                    <FormLabel>Kabupaten/Kota</FormLabel>
                                    <FormControl><Input placeholder="JAKARTA SELATAN" {...field} className="uppercase" /></FormControl>
                                    <FormMessage />
                                </FormItem>
                            )} />
                            <FormField control={form.control} name="kecamatan" render={({ field }) => (
                                <FormItem>
                                    <FormLabel>Kecamatan</FormLabel>
                                    <FormControl><Input placeholder="CILANDAK" {...field} className="uppercase" /></FormControl>
                                    <FormMessage />
                                </FormItem>
                            )} />
                            <FormField control={form.control} name="kelurahan" render={({ field }) => (
                                <FormItem>
                                    <FormLabel>Kelurahan/Desa</FormLabel>
                                    <FormControl><Input placeholder="CIPETE" {...field} className="uppercase" /></FormControl>
                                    <FormMessage />
                                </FormItem>
                            )} />
                        </div>
                    </CardContent>
                </Card>

                {/* Section 5: Kontak */}
                <Card className="shadow-sm">
                    <CardHeader>
                        <CardTitle>Kontak</CardTitle>
                    </CardHeader>
                    <CardContent className="space-y-6">
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                            <FormField control={form.control} name="nomorHP" render={({ field }) => (
                                <FormItem>
                                    <FormLabel>Nomor HP / WhatsApp</FormLabel>
                                    <FormControl><Input placeholder="08123456789" {...field} /></FormControl>
                                    <FormDescription>Untuk notifikasi status permohonan</FormDescription>
                                    <FormMessage />
                                </FormItem>
                            )} />
                            <FormField control={form.control} name="email" render={({ field }) => (
                                <FormItem>
                                    <FormLabel>Email (Opsional)</FormLabel>
                                    <FormControl><Input placeholder="email@contoh.com" {...field} /></FormControl>
                                    <FormMessage />
                                </FormItem>
                            )} />
                        </div>
                    </CardContent>
                </Card>

                <div className="flex items-center justify-between mt-12 mb-20 gap-4 border-t pt-6">
                    <div className="text-sm text-muted-foreground hidden md:block">
                        Pastikan semua data sudah benar sebelum mengirim.
                    </div>
                    <div className="flex gap-4">
                        <Button type="button" variant="outline" onClick={() => router.back()}>
                            Batal
                        </Button>
                        <Button type="submit" size="lg" className="min-w-[150px] font-bold" disabled={loading}>
                            {loading ? <Loader2 className="mr-2 h-4 w-4 animate-spin" /> : <Save className="mr-2 h-4 w-4" />}
                            {loading ? "Menyimpan..." : "Kirim Permohonan"}
                        </Button>
                    </div>
                </div>

            </form>
        </Form>
    )
}
