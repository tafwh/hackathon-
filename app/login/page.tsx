"use client"

import { useState } from "react"
import { useRouter } from "next/navigation"
import { useUser } from "@/context/UserContext"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import Link from "next/link"
import Image from "next/image"

export default function LoginPage() {
  const { setUser } = useUser()
  const router = useRouter()
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")
  const [isLoading, setIsLoading] = useState(false)
  const [justLoggedIn, setJustLoggedIn] = useState(false)

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    setIsLoading(true)
    setTimeout(() => {
      setUser({
        id: "user1",
        name: email.split("@")[0] || "사용자",
        email,
        avatar: "/de_profile.png",
        socialPoints: 0,
        level: 1,
        achievements: [],
        dailyChallenges: [],
        rank: {
          current: 0,
          weekly: 0,
          monthly: 0
        },
        inventory: []
      })
      setIsLoading(false)         // 1. 로딩 끝
      setJustLoggedIn(true)       // 2. 안내 메시지 표시
      setTimeout(() => {
        setJustLoggedIn(false)
        router.push("/")
      }, 2000)
    }, 1000)
  }

  return (
    <div className="container mx-auto flex items-center justify-center min-h-[calc(100vh-160px)] px-4 py-12">
      {/* 안내 메시지 */}
      {justLoggedIn && (
        <div className="fixed top-4 left-1/2 -translate-x-1/2 bg-green-500 text-white px-4 py-2 rounded-full shadow z-50">
          로그인되었습니다!
        </div>
      )}

      <Card className="w-full max-w-md rounded-3xl">
        <CardHeader className="flex flex-col items-center">
          <Image
            src="/placeholder.svg?height=80&width=80"
            alt="소셜 큐 로고"
            width={80}
            height={80}
            className="rounded-full mb-4"
          />
          <CardTitle className="text-2xl">로그인</CardTitle>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleSubmit} className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="email">이메일</Label>
              <Input 
                id="email" 
                name="email"
                type="email" 
                placeholder="your@email.com" 
                required 
                className="rounded-full"
                value={email}
                onChange={e => setEmail(e.target.value)}
              />
            </div>
            <div className="space-y-2">
              <div className="flex items-center justify-between">
                <Label htmlFor="password">비밀번호</Label>
                <Link 
                  href="/forgot-password" 
                  className="text-sm text-pink-500 hover:underline"
                >
                  비밀번호 찾기
                </Link>
              </div>
              <Input 
                id="password" 
                name="password"
                type="password" 
                required 
                className="rounded-full"
                value={password}
                onChange={e => setPassword(e.target.value)}
              />
            </div>
            <Button 
              type="submit" 
              className="w-full bg-pink-500 hover:bg-pink-600 rounded-full" 
              disabled={isLoading}
            >
              {isLoading ? "로그인 중..." : "로그인"}
            </Button>
            <p className="text-center text-sm text-gray-500">
              계정이 없으신가요?{" "}
              <Link href="/signup" className="text-pink-500 hover:underline">
                회원가입
              </Link>
            </p>
          </form>
        </CardContent>
      </Card>
    </div>
  )
}
