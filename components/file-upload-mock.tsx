"use client"

import { useState, useRef } from "react"
import { UploadCloud, X, File as FileIcon, Check } from "lucide-react"
import { Button } from "@/components/ui/button"
import { cn } from "@/lib/utils"

interface FileUploadMockProps {
    label: string
    accept?: string
    onChange?: (file: File | null) => void
    onRemove?: () => void
    error?: string
    preview?: boolean // If true, try to show image preview
    maxSizeMB?: number
}

export function FileUploadMock({
    label,
    accept = "image/*,.pdf",
    onChange,
    onRemove,
    error,
    preview = true,
    maxSizeMB = 5,
}: FileUploadMockProps) {
    const [file, setFile] = useState<File | null>(null)
    const [previewUrl, setPreviewUrl] = useState<string | null>(null)
    const [isDragging, setIsDragging] = useState(false)
    const inputRef = useRef<HTMLInputElement>(null)

    const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        if (e.target.files && e.target.files[0]) {
            processFile(e.target.files[0])
        }
    }

    const processFile = (selectedFile: File) => {
        // Check size
        if (selectedFile.size > maxSizeMB * 1024 * 1024) {
            alert(`File terlalu besar. Maksimal ${maxSizeMB}MB`)
            return
        }

        setFile(selectedFile)

        if (preview && selectedFile.type.startsWith("image/")) {
            const url = URL.createObjectURL(selectedFile)
            setPreviewUrl(url)
        }

        onChange?.(selectedFile)
    }

    const handleDragOver = (e: React.DragEvent) => {
        e.preventDefault()
        setIsDragging(true)
    }

    const handleDragLeave = () => {
        setIsDragging(false)
    }

    const handleDrop = (e: React.DragEvent) => {
        e.preventDefault()
        setIsDragging(false)
        if (e.dataTransfer.files && e.dataTransfer.files[0]) {
            processFile(e.dataTransfer.files[0])
        }
    }

    const handleRemove = () => {
        setFile(null)
        setPreviewUrl(null)
        if (inputRef.current) inputRef.current.value = ""
        onRemove?.()
        onChange?.(null)
    }

    return (
        <div className="w-full">
            {!file ? (
                <div
                    className={cn(
                        "relative flex flex-col items-center justify-center w-full h-32 rounded-lg border-2 border-dashed transition-colors cursor-pointer",
                        isDragging ? "border-primary bg-primary/10" : "border-muted-foreground/25 hover:bg-muted/50",
                        error && "border-red-500 bg-red-50"
                    )}
                    onDragOver={handleDragOver}
                    onDragLeave={handleDragLeave}
                    onDrop={handleDrop}
                    onClick={() => inputRef.current?.click()}
                >
                    <div className="flex flex-col items-center justify-center pt-5 pb-6">
                        <UploadCloud className="w-8 h-8 mb-2 text-muted-foreground" />
                        <p className="mb-2 text-sm text-muted-foreground font-semibold">
                            <span className="text-primary">{label}</span>
                        </p>
                        <p className="text-xs text-muted-foreground">
                            Klik atau drag file disini (Max {maxSizeMB}MB)
                        </p>
                    </div>
                    <input
                        ref={inputRef}
                        type="file"
                        className="hidden"
                        accept={accept}
                        onChange={handleFileChange}
                    />
                </div>
            ) : (
                <div className="relative w-full rounded-lg border p-4 bg-background">
                    <div className="flex items-center gap-4">
                        {previewUrl ? (
                            <div className="h-16 w-16 shrink-0 rounded-md overflow-hidden bg-muted border">
                                {/* eslint-disable-next-line @next/next/no-img-element */}
                                <img src={previewUrl} alt="Preview" className="h-full w-full object-cover" />
                            </div>
                        ) : (
                            <div className="h-16 w-16 shrink-0 flex items-center justify-center rounded-md bg-muted border">
                                <FileIcon className="h-8 w-8 text-muted-foreground" />
                            </div>
                        )}

                        <div className="flex-1 min-w-0">
                            <p className="text-sm font-medium truncate">{file.name}</p>
                            <p className="text-xs text-muted-foreground">{(file.size / 1024 / 1024).toFixed(2)} MB</p>
                            <div className="flex items-center mt-1 text-xs text-green-600">
                                <Check className="w-3 h-3 mr-1" /> Ready to upload
                            </div>
                        </div>

                        <Button variant="ghost" size="icon" onClick={handleRemove} className="text-muted-foreground hover:text-destructive">
                            <X className="w-4 h-4" />
                        </Button>
                    </div>
                </div>
            )}
            {error && <p className="mt-1 text-xs text-red-500">{error}</p>}
        </div>
    )
}
