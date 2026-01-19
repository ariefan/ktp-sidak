"use client"

import { cn } from "@/lib/utils"
import { Button } from "@/components/ui/button"
import {
    Card,
    CardContent,
    CardDescription,
    CardHeader,
    CardTitle,
} from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { useMockAuth } from "@/hooks/use-mock-auth"
import { useState } from "react"
import { useRouter } from "next/navigation"
import { AlertCircle } from "lucide-react"

export function LoginForm({
    className,
    ...props
}: React.ComponentPropsWithoutRef<"div">) {
    const { login } = useMockAuth()
    const router = useRouter()
    const [email, setEmail] = useState("budi@kel-sukamaju.go.id") // Default/demo credential
    const [password, setPassword] = useState("admin123")
    const [error, setError] = useState("")
    const [loading, setLoading] = useState(false)

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault()
        setLoading(true)
        setError("")

        // Simulate network delay
        setTimeout(() => {
            const success = login(email)
            if (success) {
                router.push("/dashboard")
            } else {
                setError("Email tidak ditemukan dalam sistem mock. Gunakan kredensial demo.")
                setLoading(false)
            }
        }, 800)
    }

    return (
        <div className={cn("flex flex-col gap-6", className)} {...props}>
            <Card>
                <CardHeader>
                    <CardTitle className="text-2xl">Login Petugas</CardTitle>
                    <CardDescription>
                        Masukkan email dinas untuk masuk ke sistem SIDAK.
                    </CardDescription>
                </CardHeader>
                <CardContent>
                    <form onSubmit={handleSubmit}>
                        <div className="flex flex-col gap-6">
                            <div className="grid gap-2">
                                <Label htmlFor="email">Email Dinas</Label>
                                <Input
                                    id="email"
                                    type="email"
                                    placeholder="nama@kel-sukamaju.go.id"
                                    required
                                    value={email}
                                    onChange={(e: React.ChangeEvent<HTMLInputElement>) => setEmail(e.target.value)}
                                />
                            </div>
                            <div className="grid gap-2">
                                <div className="flex items-center">
                                    <Label htmlFor="password">Password</Label>
                                    <a
                                        href="#"
                                        className="ml-auto inline-block text-sm underline-offset-4 hover:underline"
                                    >
                                        Lupa password?
                                    </a>
                                </div>
                                <Input
                                    id="password"
                                    type="password"
                                    required
                                    value={password}
                                    onChange={(e: React.ChangeEvent<HTMLInputElement>) => setPassword(e.target.value)}
                                />
                                <p className="text-xs text-muted-foreground">Password apapun bisa (Mock)</p>
                            </div>

                            {error && (
                                <div className="flex items-center gap-2 text-sm text-red-500 bg-red-50 p-2 rounded">
                                    <AlertCircle className="w-4 h-4" />
                                    {error}
                                </div>
                            )}

                            <Button type="submit" className="w-full" disabled={loading}>
                                {loading ? "Memproses..." : "Masuk Aplikasi"}
                            </Button>
                        </div>
                        <div className="mt-4 text-center text-sm">
                            Belum punya akun?{" "}
                            <a href="#" className="underline underline-offset-4">
                                Hubungi Admin PUSAT
                            </a>
                        </div>
                    </form>
                </CardContent>
            </Card>
            <div className="text-center text-xs text-muted-foreground">
                <p className="font-semibold mb-1">Demo Credentials (Klik Masuk):</p>
                <div className="grid gap-1">
                    <p>Admin: <code className="bg-muted px-1 rounded">budi@kel-sukamaju.go.id</code></p>
                    <p>Staff: <code className="bg-muted px-1 rounded">siti@kel-sukamaju.go.id</code></p>
                    <p>Password: <code className="bg-muted px-1 rounded">bebas</code></p>
                </div>
            </div>
        </div>
    )
}
