"use client"

import { useState, useEffect } from "react"
import { mockApplications, KTPApplication, getApplicationStats } from "@/lib/mock-data"
import { useTeam } from "./use-team"

export function useApplications() {
    const { activeTeam } = useTeam()
    const [applications, setApplications] = useState<KTPApplication[]>([])
    const [isLoading, setIsLoading] = useState(true)

    useEffect(() => {
        if (activeTeam) {
            setIsLoading(true)
            // Simulate API delay
            setTimeout(() => {
                // Filter applications by team (mock logic)
                // For parent teams (pusat/provinsi/kota/kecamatan), we might want to see children's data
                // But for this mockup simple equality check is enough or maybe "contains" logic if we want to be fancy
                // Let's stick to direct teamId match for now for simplicity, or show all if PUSAT

                let filtered: KTPApplication[] = []
                if (activeTeam.type === 'pusat') {
                    filtered = mockApplications
                } else {
                    // For now just show applications belonging to this team
                    // In a real app we'd query by hierarchy
                    filtered = mockApplications.filter(app => app.teamId === activeTeam.id)

                    // If we want to demonstrate hierarchy, we could add logic here
                    // e.g. if kecamatan, show kelurahan data too
                }

                setApplications(filtered)
                setIsLoading(false)
            }, 500)
        }
    }, [activeTeam])

    const stats = getApplicationStats(applications)

    return {
        applications,
        stats,
        isLoading,
    }
}
