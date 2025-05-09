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

export default function AuthPage() {
  return (
    <div className="container mx-auto flex items-center justify-center min-h-[calc(100vh-160px)] px-4 py-12">
      <Card className="w-full max-w-md rounded-3xl">
        <Tabs defaultValue="signup">
          <CardHeader className="flex flex-col items-center">
            <Image
              src="/placeholder.svg?height=80&width=80"
              alt="소셜 큐 로고"
              width={80}
              height={80}
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
        <Label htmlFor="name">이름</Label>
        <Input id="name" placeholder="홍길동" required className="rounded-full" />
      </div>
      <div className="space-y-2">
        <Label htmlFor="signup-email">이메일</Label>
        <Input id="signup-email" type="email" placeholder="your@email.com" required className="rounded-full" />
      </div>
      <div className="space-y-2">
        <Label htmlFor="signup-password">비밀번호</Label>
        <Input id="signup-password" type="password" required className="rounded-full" />
      </div>
      <div className="space-y-2">
        <Label htmlFor="confirm-password">비밀번호 확인</Label>
        <Input id="confirm-password" type="password" required className="rounded-full" />
      </div>
      <Button type="submit" className="w-full bg-pink-500 hover:bg-pink-600 rounded-full" disabled={isLoading}>
        {isLoading ? "계정 생성 중..." : "계정 생성하기"}
      </Button>
      <p className="text-center text-sm text-gray-500">
        가입함으로써 귀하는 당사의{" "}
        <Link href="/terms" className="text-pink-500 hover:underline">
          이용약관
        </Link>{" "}
        및{" "}
        <Link href="/privacy" className="text-pink-500 hover:underline">
          개인정보처리방침
        </Link>
        에 동의하게 됩니다.
      </p>
    </form>
  )
}
