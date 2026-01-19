"use client"

import { useState, useEffect } from "react"
import { mockTeams, Team } from "@/lib/mock-data"

export function useTeam() {
    const [activeTeam, setActiveTeam] = useState<Team | null>(null)
    const [isLoading, setIsLoading] = useState(true)

    useEffect(() => {
        // Initialize with stored team or default to first team
        const storedTeamId = localStorage.getItem("sidak_active_team_id")
        if (storedTeamId) {
            const foundTeam = mockTeams.find((t) => t.id === storedTeamId)
            if (foundTeam) {
                setActiveTeam(foundTeam)
            } else {
                // Fallback to first team if stored ID is invalid
                setActiveTeam(mockTeams[0])
                localStorage.setItem("sidak_active_team_id", mockTeams[0].id)
            }
        } else {
            // Default to first team
            setActiveTeam(mockTeams[0])
            localStorage.setItem("sidak_active_team_id", mockTeams[0].id)
        }
        setIsLoading(false)
    }, [])

    const switchTeam = (teamId: string) => {
        const foundTeam = mockTeams.find((t) => t.id === teamId)
        if (foundTeam) {
            setActiveTeam(foundTeam)
            localStorage.setItem("sidak_active_team_id", teamId)
            // Force reload to refresh data context (simulating full app switch)
            window.location.reload()
        }
    }

    return {
        activeTeam,
        availableTeams: mockTeams,
        switchTeam,
        isLoading,
    }
}
