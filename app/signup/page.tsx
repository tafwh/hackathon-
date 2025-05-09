"use client"

import type React from "react"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Card, CardContent, CardHeader } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import Link from "next/link"
import Image from "next/image"


import { useUser } from "@/context/UserContext"

import { useRouter } from "next/navigation"

export default function AuthPage() {
  return (
    <div className="container mx-auto flex items-center justify-center min-h-[calc(100vh-160px)] px-4 py-12">
      <Card className="w-full max-w-md rounded-3xl">
        <Tabs defaultValue="signup">
          <CardHeader className="flex flex-col items-center">
            <Image
              src="/de_profile.png"
              alt="소셜 큐 로고"
              width={90}
              height={90}
              className="rounded-full mb-4"
            />
            <TabsList className="grid w-full grid-cols-2 rounded-full">
              <TabsTrigger value="login" className="rounded-full">
                로그인
              </TabsTrigger>
              <TabsTrigger value="signup" className="rounded-full">
                회원가입
              </TabsTrigger>
            </TabsList>
          </CardHeader>
          <CardContent>
            <TabsContent value="login">
              <LoginForm />
            </TabsContent>
            <TabsContent value="signup">
              <SignupForm />
            </TabsContent>
          </CardContent>
        </Tabs>
      </Card>
    </div>
  )
}

function LoginForm() {
  const [isLoading, setIsLoading] = useState(false)

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    setIsLoading(true)
    // Simulate API call
    setTimeout(() => {
      setIsLoading(false)
      // Redirect would happen here
    }, 1500)
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-4 pt-4">
      <div className="space-y-2">
        <Label htmlFor="email">이메일</Label>
        <Input id="email" type="email" placeholder="your@email.com" required className="rounded-full" />
      </div>
      <div className="space-y-2">
        <div className="flex items-center justify-between">
          <Label htmlFor="password">비밀번호</Label>
          <Link href="/forgot-password" className="text-sm text-pink-500 hover:underline">
            비밀번호 찾기
          </Link>
        </div>
        <Input id="password" type="password" required className="rounded-full" />
      </div>
      <Button type="submit" className="w-full bg-pink-500 hover:bg-pink-600 rounded-full" disabled={isLoading}>
        {isLoading ? "로그인 중..." : "로그인"}
      </Button>
    </form>
  )
}

function SignupForm() {
  const { setUser } = useUser()
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")
  const [name, setName] = useState("")
  const [isLoading, setIsLoading] = useState(false)

  const [error, setError] = useState('')
  const router = useRouter()

  const [justSignedUp, setJustSignedUp] = useState(false)


  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsLoading(true)
    setError('')

    const form = e.target as HTMLFormElement
    const formData = {
      name: (form.elements.namedItem('name') as HTMLInputElement).value,
      email: (form.elements.namedItem('email') as HTMLInputElement).value,
      password: (form.elements.namedItem('password') as HTMLInputElement).value,
      confirmPassword: (form.elements.namedItem('confirm-password') as HTMLInputElement).value
    }

    if (formData.password !== formData.confirmPassword) {
      setError('Passwords do not match')
      setIsLoading(false)
      return
    }

    try {
      const response = await fetch('http://172.16.12.38:8000/api/auth/register', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          email: formData.email,
          password: formData.password,
          name: formData.name
        })
      })

      const data = await response.json()

      if (!response.ok) {
        throw new Error(data.error || 'Registration failed')
      }

      // Registration successful
      router.push('/login')
    } catch (err) {
      console.error('Registration error:', err)
      setError(err instanceof Error ? err.message : 'Failed to connect to server. Please try again.')
    } finally {
      setIsLoading(false)
    }
    setTimeout(() => {
      setUser({
        id: "user1",
        name: name || email.split("@")[0] || "사용자",
        email,
        avatar: "/de_profile.png",
        // 게임화 필드 추가
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
      setIsLoading(false)
      setJustSignedUp(true)
      setTimeout(() => {
        setJustSignedUp(false)
        router.push("/")
      }, 2000)
    }, 1000)

  }

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <div className="space-y-2">
        <Label htmlFor="name">이름</Label>
        <Input
          id="name"
          type="text"
          placeholder="이름을 입력하세요"
          value={name}
          onChange={(e) => setName(e.target.value)}
          required
        />
      </div>
      <div className="space-y-2">
        <Label htmlFor="email">이메일</Label>
        <Input
          id="email"
          name="email"
          type="email"
          placeholder="이메일을 입력하세요"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
        />
      </div>
      <div className="space-y-2">
        <Label htmlFor="password">비밀번호</Label>
        <Input
          id="password"
          name="password"
          type="password"
          placeholder="비밀번호를 입력하세요"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          required
        />
      </div>
      <div className="space-y-2">
        <Label htmlFor="confirm-password">비밀번호 확인</Label>
        <Input
          id="confirm-password"
          name="confirm-password"
          type="password"
          placeholder="비밀번호를 한 번 더 입력하세요"
          required
        />
      </div>
      <Button type="submit" className="w-full bg-pink-500 hover:bg-pink-600 rounded-full" disabled={isLoading}>
        {isLoading ? "가입 중..." : "회원가입"}
      </Button>
      {justSignedUp && (
        <div className="text-center text-green-500">
          회원가입이 완료되었습니다!
        </div>
      )}
    </form>
  )
}
