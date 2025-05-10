"use client"

import { useState, useRef, useEffect } from "react"
import { Button } from "@/components/ui/button"
import { Textarea } from "@/components/ui/textarea"
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Badge } from "@/components/ui/badge"
import { ArrowLeft, Send, Mic, MicOff, Info } from "lucide-react"
import Link from "next/link"

// 시나리오 데이터
const scenarioData = {
  "meeting-new-people": {
    title: "새로운 사람 만나기",
    description:
      "당신은 업계 네트워킹 이벤트에 참석했습니다. 새로운 사람에게 자신을 소개하고 대화를 시작하는 연습을 해보세요.",
    character: {
      name: "민지",
      role: "마케팅 매니저",
      avatar: "/default_profile.png?height=100&width=100",
      greeting: "안녕하세요! 전에 뵌 적이 없는 것 같네요. 저는 테크코프에서 마케팅을 담당하고 있는 민지라고 합니다.",
    },
  },
  // ... 기타 시나리오
}

type Message = {
  id: string
  sender: "user" | "ai"
  text: string
  feedback?: {
    tone: "positive" | "neutral" | "negative"
    message: string
  }
}


export default function ScenarioPage({ params }: { params: { id: string } }) {
  const scenarioId = params.id
  const scenario = scenarioData[scenarioId as keyof typeof scenarioData] || {
    title: "시나리오",
    description: "설명이 없습니다",
    character: {
      name: "캐릭터",
      role: "역할",
      avatar: "/placeholder.svg?height=100&width=100",
      greeting: "안녕하세요!",
    },
  }

  const [messages, setMessages] = useState<Message[]>([
    {
      id: "1",
      sender: "ai",
      text: scenario.character.greeting,
    },
  ])
  const [input, setInput] = useState("")
  const [isRecording, setIsRecording] = useState(false)
  const [isLoading, setIsLoading] = useState(false)
  const messagesEndRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" })
  }, [messages])

  const handleSendMessage = async () => {
    if (!input.trim()) return

    const userMessage: Message = {
      id: Date.now().toString(),
      sender: "user",
      text: input,
    }
    setMessages((prev) => [...prev, userMessage])
    setInput("")
    setIsLoading(true)

    try {
      const response = await fetch('http://localhost:8000/chat', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          message: input,
          scenarioId,
          characterName: scenario.character.name,
          characterRole: scenario.character.role,
        }),
      })

      if (!response.ok) {
        throw new Error('API 요청 실패')
      }

      const data = await response.json()
      const aiMessage: Message = {
        id: (Date.now() + 1).toString(),
        sender: "ai",
        text: data.response,
      }

      setMessages((prev) => [...prev, aiMessage])
    } catch (error) {
      console.error('채팅 API 오류:', error)
      const errorMessage: Message = {
        id: (Date.now() + 1).toString(),
        sender: "ai",
        text: '죄송해요, 응답을 불러오지 못했어요. 다시 시도해주세요.',
      }
      setMessages((prev) => [...prev, errorMessage])
    } finally {
      setIsLoading(false)
    }
  }

  const toggleRecording = () => {
    setIsRecording(!isRecording)
  }

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="mb-6">
        <Link href="/scenarios" className="flex items-center text-pink-500 hover:text-pink-600 mb-4">
          <ArrowLeft className="mr-2 h-4 w-4" />
          시나리오로 돌아가기
        </Link>
        <h1 className="text-2xl font-bold">{scenario.title}</h1>
        <p className="text-gray-600 dark:text-gray-300 mt-2">{scenario.description}</p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <Card className="lg:col-span-1 rounded-3xl">
          <CardHeader>
            <CardTitle>대화 상대</CardTitle>
          </CardHeader>
          <CardContent className="flex flex-col items-center text-center">
            <Avatar className="h-24 w-24 mb-4">
              <AvatarImage src={scenario.character.avatar} alt={scenario.character.name} />
              <AvatarFallback>{scenario.character.name[0]}</AvatarFallback>
            </Avatar>
            <h3 className="text-xl font-semibold">{scenario.character.name}</h3>
            <p className="text-gray-600 dark:text-gray-300">{scenario.character.role}</p>
          </CardContent>
        </Card>

        <Card className="lg:col-span-2 rounded-3xl">
          <CardHeader>
            <div className="flex justify-between items-center">
              <CardTitle>대화</CardTitle>
            </div>
          </CardHeader>
          <CardContent>
            <div className="space-y-4 h-[400px] overflow-y-auto p-4 border rounded-2xl">
              {messages.map((message) => (
                <div
                  key={message.id}
                  className={`flex flex-col ${message.sender === "user" ? "items-end" : "items-start"}`}>
                  <div
                    className={`max-w-[80%] p-3 rounded-2xl ${
                      message.sender === "user"
                        ? "bg-pink-500 text-white"
                        : "bg-gray-100 dark:bg-gray-800"
                    }`}
                  >
                    <p>{message.text}</p>
                  </div>
                </div>
              ))}
              <div ref={messagesEndRef} />
            </div>
          </CardContent>
          <CardFooter>
            <div className="flex w-full items-center space-x-2">
              <Button
                variant="outline"
                size="icon"
                onClick={toggleRecording}
                className={`rounded-full ${isRecording ? "bg-red-100 text-red-600 dark:bg-red-900 dark:text-red-400" : ""}`}>
                {isRecording ? <MicOff className="h-4 w-4" /> : <Mic className="h-4 w-4" />}
              </Button>
              <Textarea
                placeholder="응답을 입력하세요..."
                value={input}
                onChange={(e) => setInput(e.target.value)}
                onKeyDown={(e) => {
                  if (e.key === "Enter" && !e.shiftKey) {
                    e.preventDefault()
                    handleSendMessage()
                  }
                }}
                className="flex-1 rounded-2xl"
              />
              <Button
                onClick={handleSendMessage}
                disabled={!input.trim() || isLoading}
                className="bg-pink-500 hover:bg-pink-600 rounded-full"
              >
                <Send className="h-4 w-4" />
              </Button>
            </div>
          </CardFooter>
        </Card>
      </div>
    </div>
  )
}
