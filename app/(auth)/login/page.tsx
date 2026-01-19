"use client"

import { useEffect } from "react"
import { useRouter } from "next/navigation"
import { GalleryVerticalEnd } from "lucide-react"
import { LoginForm } from "@/components/login-form"
import { ModeToggle } from "@/components/mode-toggle"
import { useMockAuth } from "@/hooks/use-mock-auth"

export default function LoginPage() {
    const router = useRouter()
    const { isAuthenticated, isLoading } = useMockAuth()

    useEffect(() => {
        if (!isLoading && isAuthenticated) {
            router.push("/dashboard")
        }
    }, [isAuthenticated, isLoading, router])

    // Don't render anything if authenticated (will redirect)
    if (isLoading) {
        return (
            <div className="flex h-screen items-center justify-center">
                <div className="animate-pulse text-muted-foreground">Memuat...</div>
            </div>
        )
    }

    if (isAuthenticated) {
        return null
    }

    return (
        <div className="grid min-h-svh lg:grid-cols-2">
            <div className="flex flex-col gap-4 p-6 md:p-10 relative">
                <div className="absolute top-4 right-4 md:top-8 md:right-8">
                    <ModeToggle />
                </div>
                <div className="flex justify-center gap-2 md:justify-start">
                    <a href="#" className="flex items-center gap-2 font-medium">
                        <div className="flex h-6 w-6 items-center justify-center rounded-md bg-primary text-primary-foreground">
                            <GalleryVerticalEnd className="size-4" />
                        </div>
                        SIDAK Dispendukcapil
                    </a>
                </div>
                <div className="flex flex-1 items-center justify-center">
                    <div className="w-full max-w-md">
                        <LoginForm />
                    </div>
                </div>
            </div>
            <div className="relative hidden bg-muted lg:block">
                <img
                    src="https://picsum.photos/1920/1080"
                    alt="Background"
                    className="absolute inset-0 h-full w-full object-cover dark:brightness-[0.2] dark:grayscale"
                />
                <div className="absolute inset-0 bg-zinc-900/30 flex items-center justify-center p-10">
                    <div className="relative z-20 max-w-lg text-center">
                        <blockquote className="space-y-2">
                            <p className="text-xl font-medium text-white drop-shadow-md">
                                &ldquo;Melayani Sepenuh Hati, Walau Listrik Sering Mati.&rdquo;
                            </p>
                        </blockquote>
                    </div>
                </div>
            </div>
        </div>
    )
}
