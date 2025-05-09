"use client"

import { useState } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"

export default function AboutPage() {
  const [form, setForm] = useState({ name: "", email: "", message: "" })
  const [submitted, setSubmitted] = useState(false)

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setForm({ ...form, [e.target.name]: e.target.value })
  }

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    setSubmitted(true)
    // 실제 문의 메일 전송 로직은 백엔드 연동 필요
  }

  return (
    <div className="container mx-auto px-4 py-12 max-w-3xl">
      <h1 className="text-3xl font-bold mb-6">소셜 큐 서비스 소개</h1>
      <section className="mb-10">
        <p className="text-lg text-gray-700 dark:text-gray-300 mb-4">
          소셜 큐는 안전한 환경에서 사회적 상호작용을 연습하고, 감정을 이해하며, 자신감을 키울 수 있도록 돕는 AI 기반 학습 플랫폼입니다.
        </p>
        <ul className="list-disc pl-6 text-gray-700 dark:text-gray-300">
          <li>실제 상황과 유사한 시나리오로 대화 연습</li>
          <li>AI 피드백을 통한 소통 능력 향상</li>
          <li>다양한 역할과 상황별 맞춤형 연습</li>
          <li>진행도 추적 및 맞춤형 학습</li>
        </ul>
      </section>

      <Card className="mb-10">
        <CardHeader>
          <CardTitle>자주 묻는 질문(FAQ)</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="mb-4">
            <strong>Q. 이 서비스는 무료인가요?</strong>
            <p>A. 기본 기능은 무료로 제공되며, 일부 고급 기능은 유료일 수 있습니다.</p>
          </div>
          <div className="mb-4">
            <strong>Q. 내 대화 데이터는 안전하게 보호되나요?</strong>
            <p>A. 네, 모든 데이터는 안전하게 암호화되어 저장됩니다.</p>
          </div>
          <div className="mb-4">
            <strong>Q. AI 답변이 마음에 들지 않으면 어떻게 하나요?</strong>
            <p>A. 언제든지 다시 시도하거나, 피드백을 통해 개선 요청이 가능합니다.</p>
          </div>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>문의하기</CardTitle>
        </CardHeader>
        <CardContent>
          {submitted ? (
            <div className="text-green-600 font-semibold">문의가 정상적으로 접수되었습니다. 감사합니다!</div>
          ) : (
            <form onSubmit={handleSubmit} className="space-y-4">
              <Input
                name="name"
                placeholder="이름"
                value={form.name}
                onChange={handleChange}
                required
                className="rounded-full"
              />
              <Input
                name="email"
                type="email"
                placeholder="이메일"
                value={form.email}
                onChange={handleChange}
                required
                className="rounded-full"
              />
              <Textarea
                name="message"
                placeholder="문의 내용을 입력하세요"
                value={form.message}
                onChange={handleChange}
                required
                className="rounded-2xl"
              />
              <Button type="submit" className="bg-pink-500 hover:bg-pink-600 rounded-full w-full">
                문의 보내기
              </Button>
            </form>
          )}
        </CardContent>
      </Card>
    </div>
  )
}
