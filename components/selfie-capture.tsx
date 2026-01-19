"use client"

import { useState, useRef, useCallback } from "react"
import { Camera, RefreshCw, Check, X } from "lucide-react"
import { Button } from "@/components/ui/button"
import { cn } from "@/lib/utils"

interface SelfieCaptureProps {
    onCapture?: (file: File | null) => void
    error?: string
}

export function SelfieCapture({ onCapture, error }: SelfieCaptureProps) {
    const [stream, setStream] = useState<MediaStream | null>(null)
    const [image, setImage] = useState<string | null>(null)
    const [isCameraOpen, setIsCameraOpen] = useState(false)
    const videoRef = useRef<HTMLVideoElement>(null)
    const canvasRef = useRef<HTMLCanvasElement>(null)

    const startCamera = async () => {
        try {
            const mediaStream = await navigator.mediaDevices.getUserMedia({
                video: { facingMode: "user" },
                audio: false,
            })
            setStream(mediaStream)
            setIsCameraOpen(true)
            if (videoRef.current) {
                videoRef.current.srcObject = mediaStream
            }
        } catch (err) {
            console.error("Error accessing camera:", err)
            alert("Gagal akses kamera. Pastikan izin kamera diberikan.")
        }
    }

    const stopCamera = useCallback(() => {
        if (stream) {
            stream.getTracks().forEach((track) => track.stop())
            setStream(null)
        }
        setIsCameraOpen(false)
    }, [stream])

    const capturePhoto = () => {
        if (videoRef.current && canvasRef.current) {
            const video = videoRef.current
            const canvas = canvasRef.current
            const context = canvas.getContext("2d")

            if (context) {
                canvas.width = video.videoWidth
                canvas.height = video.videoHeight
                context.drawImage(video, 0, 0, canvas.width, canvas.height)

                const dataUrl = canvas.toDataURL("image/jpeg")
                setImage(dataUrl)

                // Convert to File object for consistency
                canvas.toBlob((blob) => {
                    if (blob) {
                        const file = new File([blob], "selfie.jpg", { type: "image/jpeg" })
                        onCapture?.(file)
                    }
                }, "image/jpeg")

                stopCamera()
            }
        }
    }

    const retake = () => {
        setImage(null)
        onCapture?.(null)
        startCamera()
    }

    return (
        <div className="w-full">
            <div
                className={cn(
                    "relative overflow-hidden rounded-xl border-2 bg-black/5",
                    !image && !isCameraOpen ? "border-dashed border-muted-foreground/25" : "border-solid border-muted",
                    "aspect-[3/4] max-w-[300px] mx-auto flex flex-col items-center justify-center",
                    error && "border-red-500"
                )}
            >
                {!isCameraOpen && !image && (
                    <div className="text-center p-6">
                        <div className="bg-primary/10 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
                            <Camera className="w-8 h-8 text-primary" />
                        </div>
                        <h3 className="font-semibold mb-2">Ambil Foto Selfie</h3>
                        <p className="text-xs text-muted-foreground mb-4">
                            Wajib untuk verifikasi biometrik. Pastikan wajah terlihat jelas.
                        </p>
                        <Button onClick={startCamera}>Buka Kamera</Button>
                    </div>
                )}

                {isCameraOpen && (
                    <div className="relative w-full h-full bg-black">
                        <video
                            ref={videoRef}
                            autoPlay
                            playsInline
                            className="w-full h-full object-cover -scale-x-100" // Mirror effect
                            onLoadedMetadata={() => videoRef.current?.play()}
                        />
                        <div className="absolute bottom-4 left-0 right-0 flex justify-center pb-2">
                            <Button
                                size="icon"
                                className="h-14 w-14 rounded-full border-4 border-white bg-primary/80 hover:bg-primary"
                                onClick={capturePhoto}
                            />
                        </div>
                        <Button
                            variant="ghost"
                            size="icon"
                            className="absolute top-2 right-2 text-white hover:bg-black/20"
                            onClick={stopCamera}
                        >
                            <X className="w-6 h-6" />
                        </Button>
                    </div>
                )}

                {image && (
                    <div className="relative w-full h-full">
                        {/* eslint-disable-next-line @next/next/no-img-element */}
                        <img src={image} alt="Selfie" className="w-full h-full object-cover" />
                        <div className="absolute inset-0 bg-black/40 flex flex-col items-center justify-center opacity-0 hover:opacity-100 transition-opacity">
                            <Button onClick={retake} variant="secondary" className="gap-2">
                                <RefreshCw className="w-4 h-4" /> Foto Ulang
                            </Button>
                        </div>
                        <div className="absolute top-2 right-2 bg-green-500 text-white p-1 rounded-full shadow-lg">
                            <Check className="w-4 h-4" />
                        </div>
                    </div>
                )}

                {/* Hidden canvas for capture */}
                <canvas ref={canvasRef} className="hidden" />
            </div>
            {error && <p className="mt-2 text-center text-xs text-red-500">{error}</p>}
        </div>
    )
}
