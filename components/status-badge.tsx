"use client"

import { ApplicationStatus, getStatusColor, getStatusLabel } from "@/lib/mock-data"
import { cn } from "@/lib/utils"

interface StatusBadgeProps {
    status: ApplicationStatus
    className?: string
}

export function StatusBadge({ status, className }: StatusBadgeProps) {
    const colorClass = getStatusColor(status)
    const label = getStatusLabel(status)

    // Mapping our data color classes to Tailwind classes
    // The utilities provide strings like "bg-yellow-500", we need to ensure text contrast
    const styles: Record<string, string> = {
        "bg-gray-500": "bg-gray-100 text-gray-800 border-gray-200",
        "bg-yellow-500": "bg-yellow-100 text-yellow-800 border-yellow-200",
        "bg-blue-500": "bg-blue-100 text-blue-800 border-blue-200",
        "bg-green-500": "bg-green-100 text-green-800 border-green-200",
        "bg-purple-500": "bg-purple-100 text-purple-800 border-purple-200",
        "bg-red-500": "bg-red-100 text-red-800 border-red-200",
    }

    const badgeStyle = styles[colorClass] || "bg-gray-100 text-gray-800"

    return (
        <span
            className={cn(
                "inline-flex items-center rounded-full px-2.5 py-0.5 text-xs font-semibold border",
                badgeStyle,
                className
            )}
        >
            {label}
        </span>
    )
}
