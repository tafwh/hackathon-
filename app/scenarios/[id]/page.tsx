"use client"

import { useState, useRef, useEffect } from "react"
import { Button } from "@/components/ui/button"
import { Textarea } from "@/components/ui/textarea"
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Badge } from "@/components/ui/badge"
import { ArrowLeft, Send, Mic, MicOff, Info } from "lucide-react"
import Link from "next/link"
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/components/ui/tooltip"

// 시나리오 데이터
const scenarioData = {
  "meeting-new-people": {
    title: "새로운 사람 만나기",
    description:
      "당신은 업계 네트워킹 이벤트에 참석했습니다. 새로운 사람에게 자신을 소개하고 대화를 시작하는 연습을 해보세요.",
    character: {
      name: "민지",
      role: "마케팅 매니저",
      avatar: "/placeholder.svg?height=100&width=100",
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
      avatar: "/placeholder.svg?height=100&width=100",
      greeting: "저한테 할 말이 있다고 했던 것 같은데요?",
    },
  },
  "casual-conversations": {
    title: "일상 대화",
    description: "당신은 친구와 커피를 마시러 만났습니다. 주말에 대한 가벼운 대화를 유지하는 연습을 해보세요.",
    character: {
      name: "소연",
      role: "친구",
      avatar: "/placeholder.svg?height=100&width=100",
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

  // 메시지가 변경될 때 스크롤 맨 아래로
  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" })
  }, [messages])

  const handleSendMessage = () => {
    if (!input.trim()) return

    // 사용자 메시지 추가
    const userMessage: Message = {
      id: Date.now().toString(),
      sender: "user",
      text: input,
    }
    setMessages((prev) => [...prev, userMessage])
    setInput("")
    setIsLoading(true)

    // AI 응답 시뮬레이션
    setTimeout(() => {
      // 모의 AI 응답 및 피드백 생성
      const responses = [
        "흥미롭네요! 그것에 대해 더 자세히 알려주세요.",
        "당신의 기분을 이해합니다. 다음에 무엇을 해야 할지 어떻게 생각하시나요?",
        "당신의 관점을 이해합니다. 이런 방식으로 생각해 보셨나요?",
        "좋은 지적이네요! 전에는 그렇게 생각해 본 적이 없었어요.",
      ]

      const feedbacks = [
        {
          tone: "positive" as const,
          message: "잘했어요! 당신의 응답은 명확하고 친절했습니다.",
        },
        {
          tone: "neutral" as const,
          message: "응답은 괜찮았지만, 대화를 계속 이어가기 위해 더 자세한 내용을 추가하는 것을 고려해보세요.",
        },
        {
          tone: "positive" as const,
          message: "대화를 계속하기 위해 열린 질문을 사용한 것이 훌륭했습니다.",
        },
      ]

      const aiMessage: Message = {
        id: (Date.now() + 1).toString(),
        sender: "ai",
        text: responses[Math.floor(Math.random() * responses.length)],
        feedback: feedbacks[Math.floor(Math.random() * feedbacks.length)],
      }

      setMessages((prev) => [...prev, aiMessage])
      setIsLoading(false)
    }, 1500)
  }

  const toggleRecording = () => {
    setIsRecording(!isRecording)
    // 실제 앱에서는 음성 인식 처리
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
        {/* 캐릭터 정보 카드 */}
        <Card className="lg:col-span-1 rounded-3xl">
          <CardHeader>
            <CardTitle>대화 상대</CardTitle>
          </CardHeader>
          <CardContent className="flex flex-col items-center text-center">
            <Avatar className="h-24 w-24 mb-4">
              <AvatarImage src={scenario.character.avatar || "/placeholder.svg"} alt={scenario.character.name} />
              <AvatarFallback>{scenario.character.name[0]}</AvatarFallback>
            </Avatar>
            <h3 className="text-xl font-semibold">{scenario.character.name}</h3>
            <p className="text-gray-600 dark:text-gray-300">{scenario.character.role}</p>
          </CardContent>
        </Card>

        {/* 채팅 인터페이스 */}
        <Card className="lg:col-span-2 rounded-3xl">
          <CardHeader>
            <div className="flex justify-between items-center">
              <CardTitle>대화</CardTitle>
              <TooltipProvider>
                <Tooltip>
                  <TooltipTrigger asChild>
                    <Button variant="outline" size="icon" className="rounded-full">
                      <Info className="h-4 w-4" />
                    </Button>
                  </TooltipTrigger>
                  <TooltipContent className="rounded-xl">
                    <p className="max-w-xs">
                      대화 기술을 연습해보세요. 응답에 대한 피드백을 받아 실력을 향상시킬 수 있습니다.
                    </p>
                  </TooltipContent>
                </Tooltip>
              </TooltipProvider>
            </div>
          </CardHeader>
          <CardContent>
            <div className="space-y-4 h-[400px] overflow-y-auto p-4 border rounded-2xl">
              {messages.map((message) => (
                <div
                  key={message.id}
                  className={`flex flex-col ${message.sender === "user" ? "items-end" : "items-start"}`}
                >
                  <div
                    className={`max-w-[80%] p-3 rounded-2xl ${
                      message.sender === "user" ? "bg-pink-500 text-white" : "bg-gray-100 dark:bg-gray-800"
                    }`}
                  >
                    <p>{message.text}</p>
                  </div>

                  {message.feedback && (
                    <div className="mt-2 p-3 bg-gray-50 dark:bg-gray-900 rounded-2xl border border-gray-200 dark:border-gray-700 max-w-[80%]">
                      <div className="flex items-center mb-1">
                        <Badge
                          variant={
                            message.feedback.tone === "positive"
                              ? "default"
                              : message.feedback.tone === "neutral"
                                ? "secondary"
                                : "destructive"
                          }
                          className="rounded-full"
                        >
                          피드백
                        </Badge>
                      </div>
                      <p className="text-sm">{message.feedback.message}</p>
                    </div>
                  )}
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
                className={`rounded-full ${isRecording ? "bg-red-100 text-red-600 dark:bg-red-900 dark:text-red-400" : ""}`}
              >
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
