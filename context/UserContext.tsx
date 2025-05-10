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

type Challenge = {
  id: string
  title: string
  description: string
  achieved: boolean
  claimed: boolean
  points: number
}

const initialChallenges: Challenge[] = [
  {
    id: "chat-once",
    title: "AI 채팅 첫 이용",
    description: "AI 채팅을 1회 이용해보세요.",
    achieved: false,
    claimed: false,
    points: 10,
  },
  {
    id: "scenario-once",
    title: "시나리오 첫 완료",
    description: "시나리오를 1회 완료해보세요.",
    achieved: false,
    claimed: false,
    points: 10,
  },
  {
    id: "community-post",
    title: "커뮤니티 첫 글 작성",
    description: "커뮤니티에 글을 1회 작성해보세요.",
    achieved: false,
    claimed: false,
    points: 10,
  },
]

const UserContext = createContext<{
  user: User
  setUser: (user: User) => void
  challenges: Challenge[]
  achieveChallenge: (id: string) => void
  claimChallenge: (id: string) => void
}>({
  user: null,
  setUser: () => {},
  challenges: initialChallenges,
  achieveChallenge: () => {},
  claimChallenge: () => {},
})

export function UserProvider({ children }: { children: React.ReactNode }) {
  const [user, setUserState] = useState<User>(null)
  const [challenges, setChallenges] = useState<Challenge[]>(initialChallenges)
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

  // 챌린지 달성 함수
  const achieveChallenge = (id: string) => {
    setChallenges((prev) =>
      prev.map((c) => (c.id === id ? { ...c, achieved: true } : c))
    )
  }

  // 포인트 적립 함수
  const claimChallenge = (id: string) => {
    setChallenges((prev) =>
      prev.map((c) => (c.id === id ? { ...c, claimed: true } : c))
    )
    const challenge = challenges.find((c) => c.id === id)
    if (user && challenge && !challenge.claimed) {
      setUser({ ...user, socialPoints: user.socialPoints + challenge.points })
    }
  }

  return (
    <UserContext.Provider value={{ user, setUser, challenges, achieveChallenge, claimChallenge }}>
      {children}
    </UserContext.Provider>
  )
}

export function useUser() {
  return useContext(UserContext)
}
