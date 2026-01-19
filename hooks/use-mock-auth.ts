"use client"

import { useState, useEffect } from "react"
import { useRouter } from "next/navigation"
import { mockUsers, User } from "@/lib/mock-data"

export function useMockAuth() {
    const router = useRouter()
    const [user, setUser] = useState<User | null>(null)
    const [isLoading, setIsLoading] = useState(true)

    useEffect(() => {
        // Check localStorage on mount
        const storedUserId = localStorage.getItem("sidak_user_id")
        if (storedUserId) {
            const foundUser = mockUsers.find((u) => u.id === storedUserId)
            if (foundUser) {
                setUser(foundUser)
            } else {
                localStorage.removeItem("sidak_user_id")
            }
        }
        setIsLoading(false)
    }, [])

    const login = (email: string) => {
        // Simple mock login - just find user by email
        // In a real app this would be an API call
        const foundUser = mockUsers.find((u) => u.email === email)
        if (foundUser) {
            localStorage.setItem("sidak_user_id", foundUser.id)
            setUser(foundUser)
            return true
        }
        return false
    }

    const logout = () => {
        localStorage.removeItem("sidak_user_id")
        setUser(null)
        router.push("/login")
    }

    return {
        user,
        isLoading,
        login,
        logout,
        isAuthenticated: !!user,
    }
}
