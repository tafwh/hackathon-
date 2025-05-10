"use client"

import { useState, useRef, useEffect, use } from "react"
import { Button } from "@/components/ui/button"
import { Textarea } from "@/components/ui/textarea"
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Badge } from "@/components/ui/badge"
import { ArrowLeft, Send, Mic, MicOff, Info } from "lucide-react"
import Link from "next/link"
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/components/ui/tooltip"
import { useUser } from "@/context/UserContext"


// 시나리오 데이터
const scenarioData = {
  "shopping-interactions": {
    title: "쇼핑 상호작용",
    description: "도움 요청, 구매, 반품 처리 등을 연습해보세요.",
    character: {
      name: "유나",
      role: "점원",
      avatar: "/cat.png",
      greeting: "어서오세요! 무엇을 도와드릴까요?",
    },
  },
  "job-interview": {
    title: "취업 면접",
    description: "연습 질문과 피드백으로 취업 면접을 준비해보세요.",
    character: {
      name: "면접관",
      role: "면접관",
      avatar: "/dog.png",
      greeting: "자기소개 부탁드립니다.",
    },
  },
  "classroom-participation": {
    title: "수업 참여",
    description: "질문하기와 그룹 토론 참여를 연습해보세요.",
    character: {
      name: "선생님",
      role: "교사",
      avatar: "/mouse.png",
      greeting: "오늘 수업에 대해 궁금한 점이 있나요?",
    },
  },
  "meeting-new-people": {
    title: "새로운 사람 만나기",
    description:
      "당신은 업계 네트워킹 이벤트에 참석했습니다. 새로운 사람에게 자신을 소개하고 대화를 시작하는 연습을 해보세요.",
    character: {
      name: "민지",
      role: "마케팅 매니저",
      avatar: "/jimin.png",
      greeting: "안녕하세요! 전에 뵌 적이 없는 것 같네요. 저는 테크코프에서 마케팅을 담당하고 있는 민지라고 합니다.",
    },
  },

  "resolving-conflicts": {
    title: "갈등 해결하기",
    description:
      "당신의 동료가 팀 회의에 지속적으로 늦게 도착합니다. 이 문제에 대해 건설적인 대화를 나누는 연습을 해보세요.",
    character: {
      name: "준호",
      role: "팀원",
      avatar: "/friend.png",
      greeting: "저한테 할 말이 있다고 했던 것 같은데요?",
    },
  },
  "casual-conversations": {
    title: "일상 대화",
    description: "당신은 친구와 커피를 마시러 만났습니다. 주말에 대한 가벼운 대화를 유지하는 연습을 해보세요.",
    character: {
      name: "소연",
      role: "친구",
      avatar: "/soyeon.png",
      greeting: "안녕! 만나서 반가워. 주말 어떻게 보냈어?",
    },
  },

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


export default function ScenarioPage({ params }: { params: Promise<{ id: string }> }) {
  const { id: scenarioId } = use(params)

  const scenario = scenarioData[scenarioId as keyof typeof scenarioData] || {
    title: "시나리오",
    description: "설명이 없습니다",
    character: {
      name: "캐릭터",
      role: "역할",
      avatar: "/cat.png",
      greeting: "안녕하세요!",
    },
  }

  const { achieveChallenge } = useUser()

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
      achieveChallenge("scenario-once")
    }
  }

  const toggleRecording = () => {
    setIsRecording(!isRecording)
  }

  const handleScenarioComplete = () => {
    // 시나리오 완료 처리
    achieveChallenge("scenario-once")
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
