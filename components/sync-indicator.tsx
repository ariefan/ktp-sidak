"use client"

import * as React from "react"
import { Cloud, CheckCircle2, AlertCircle, RefreshCw } from "lucide-react"
import { Button } from "@/components/ui/button"
import {
    Tooltip,
    TooltipContent,
    TooltipProvider,
    TooltipTrigger,
} from "@/components/ui/tooltip"

export function SyncIndicator() {
    const [status, setStatus] = React.useState<"synced" | "syncing" | "pending" | "error">("synced")
    const [pendingCount, setPendingCount] = React.useState(0)

    // Simulate random status changes for liveliness
    React.useEffect(() => {
        const interval = setInterval(() => {
            const rand = Math.random()
            if (rand > 0.8) {
                setPendingCount(prev => prev + 1)
                setStatus("pending")
            }
        }, 15000)
        return () => clearInterval(interval)
    }, [])

    const handleSync = () => {
        setStatus("syncing")
        setTimeout(() => {
            setStatus("synced")
            setPendingCount(0)
        }, 2000)
    }

    return (
        <div className="flex items-center gap-2 px-4 py-2">
            <TooltipProvider>
                <Tooltip>
                    <TooltipTrigger asChild>
                        <Button variant="ghost" size="sm" className="h-8 gap-2" onClick={handleSync} disabled={status === "syncing"}>
                            {status === "syncing" && <RefreshCw className="h-4 w-4 animate-spin text-blue-500" />}
                            {status === "synced" && <CheckCircle2 className="h-4 w-4 text-green-500" />}
                            {status === "pending" && <Cloud className="h-4 w-4 text-yellow-500" />}
                            {status === "error" && <AlertCircle className="h-4 w-4 text-red-500" />}

                            <span className="text-xs font-medium">
                                {status === "syncing" && "Syncing..."}
                                {status === "synced" && "Terhubung ke PUSAT"}
                                {status === "pending" && `${pendingCount} Data Tertunda`}
                                {status === "error" && "Gagal Terhubung"}
                            </span>
                        </Button>
                    </TooltipTrigger>
                    <TooltipContent>
                        <p>Klik untuk sinkronisasi manual</p>
                    </TooltipContent>
                </Tooltip>
            </TooltipProvider>
        </div>
    )
}
