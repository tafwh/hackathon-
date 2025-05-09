"use client"

import { createContext, useContext, useState, useEffect } from "react"
import { useRouter } from "next/navigation"

type User = {
  id: string
  name: string
  email: string
  avatar?: string
  socialPoints: number
  level: number
  achievements: {
    id: string
    title: string
    description: string
    progress: number
    completed: boolean
  }[]
  dailyChallenges: {
    id: string
    title: string
    description: string
    completed: boolean
    points: number
  }[]
  rank: {
    current: number
    weekly: number
    monthly: number
  }
  inventory: {
    id: string
    type: 'avatar' | 'theme' | 'badge'
    name: string
    equipped: boolean
  }[]
} | null

const UserContext = createContext<{
  user: User
  setUser: (user: User) => void
}>({
  user: null,
  setUser: () => {},
})

export function UserProvider({ children }: { children: React.ReactNode }) {
  const [user, setUserState] = useState<User>(null)
  const router = useRouter()

  // user를 localStorage에 저장
  const setUser = (user: User) => {
    setUserState(user)
    if (typeof window !== "undefined") {
      if (user) {
        localStorage.setItem("user", JSON.stringify(user))
      } else {
        localStorage.removeItem("user")
      }
    }
  }

  // 앱 시작 시 localStorage에서 user 불러오기
  useEffect(() => {
    if (typeof window !== "undefined") {
      const stored = localStorage.getItem("user")
      if (stored) {
        setUserState(JSON.parse(stored))
      }
    }
  }, [])

  const handleLogout = () => {
    setUser(null)
    if (typeof window !== "undefined") {
      localStorage.removeItem("user")
    }
    router.push("/") // 홈으로 이동
  }

  return (
    <UserContext.Provider value={{ user, setUser }}>
      {children}
    </UserContext.Provider>
  )
}

export function useUser() {
  return useContext(UserContext)
}
