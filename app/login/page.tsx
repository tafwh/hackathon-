"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import Link from "next/link"
import Image from "next/image"

export default function LoginPage() {
  const [isLoading, setIsLoading] = useState(false)
  const [formData, setFormData] = useState({
    email: "",
    password: ""
  })

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target
    setFormData(prev => ({
      ...prev,
      [name]: value
    }))
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsLoading(true)
    
    try {
      // 여기에 실제 로그인 로직이 들어갈 예정
      console.log("로그인 시도:", formData)
      
      // 로딩 시뮬레이션
      await new Promise(resolve => setTimeout(resolve, 1500))
      
      // 로그인 성공 후 리다이렉트
      // window.location.href = "/dashboard"
    } catch (error) {
      console.error("로그인 실패:", error)
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <div className="container mx-auto flex items-center justify-center min-h-[calc(100vh-160px)] px-4 py-12">
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
                value={formData.email}
                onChange={handleChange}
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
                value={formData.password}
                onChange={handleChange}
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
