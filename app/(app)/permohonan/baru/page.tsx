import { KTPForm } from "@/components/ktp-form"
import {
    Breadcrumb,
    BreadcrumbItem,
    BreadcrumbLink,
    BreadcrumbList,
    BreadcrumbPage,
    BreadcrumbSeparator,
} from "@/components/ui/breadcrumb"
import { FileText } from "lucide-react"

export default function NewPermohonanPage() {
    return (
        <div className="container max-w-7xl mx-auto p-4">
            <div className="flex flex-col gap-2 mb-4">
                <h1 className="text-xl font-bold tracking-tight text-foreground">Formulir Permohonan KTP</h1>
                <p className="text-muted-foreground">
                    Isi data diri Anda dengan lengkap dan benar. Pastikan dokumen yang diunggah jelas dan terbaca untuk mempercepat proses verifikasi.
                </p>
            </div>

            <KTPForm />
        </div>
    )
}
