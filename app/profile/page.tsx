"use client"

import type React from "react"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Progress } from "@/components/ui/progress"
import { Badge } from "@/components/ui/badge"
import { Label } from "@/components/ui/label"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { BarChart, MessageSquare, Award, Settings, User, Calendar, CheckCircle2, Users } from "lucide-react"
import { useUser } from "@/context/UserContext"

export default function ProfilePage() {
  const { user } = useUser()

  const [isEditing, setIsEditing] = useState(false) // <-- 여기로 옮김 (중요)
  const isGuest = user?.id === "guest" // user가 없을 수도 있으니 ?. 사용

  if (!user) {
    return (
      <div className="max-w-md mx-auto mt-12 text-center">
        <h1 className="text-2xl font-bold mb-4">로그인 필요</h1>
        <p>프로필을 보려면 먼저 로그인 해주세요.</p>
      </div>
    )
  }

  return (
    <div className="max-w-md mx-auto mt-12 text-center">
      <img
        src={user.avatar ? user.avatar : "/default_profile.png"}
        alt={user.name}
        className="w-20 h-20 rounded-full mx-auto mb-4"
      />
      <h1 className="text-2xl font-bold mb-2">{user.name}님의 프로필</h1>
      <div className="text-gray-500">{user.email}</div>
      {isGuest && (
        <div className="mt-2 text-pink-500">게스트 계정은 데이터베이스에 저장되지 않습니다.</div>
      )}
    </div>
  )
}

function ProfileField({ label, value }: { label: string; value: string }) {
  return (
    <div>
      <h4 className="text-sm font-medium text-gray-500 dark:text-gray-400">{label}</h4>
      <p className="mt-1">{value}</p>
    </div>
  )
}

function SkillProgress({ skill, progress }: { skill: string; progress: number }) {
  return (
    <div className="space-y-2">
      <div className="flex justify-between">
        <Label>{skill}</Label>
        <span className="text-sm font-medium">{progress}%</span>
      </div>
      <Progress value={progress} className="h-2 rounded-full" />
    </div>
  )
}

function ActivityItem({
  icon,
  title,
  description,
  date,
  points,
}: {
  icon: React.ReactNode
  title: string
  description: string
  date: string
  points: number
}) {
  return (
    <div className="flex items-start">
      <div className="mr-3 mt-0.5">{icon}</div>
      <div className="flex-1">
        <p className="font-medium">{title}</p>
        <p className="text-sm text-gray-500 dark:text-gray-400">{description}</p>
        <div className="flex justify-between items-center mt-1">
          <span className="text-xs text-gray-500 dark:text-gray-400">{date}</span>
          <Badge variant="outline" className="text-pink-500 rounded-full">
            +{points} 포인트
          </Badge>
        </div>
      </div>
    </div>
  )
}

function AchievementCard({
  title,
  description,
  progress,
  icon,
  completed = false,
}: {
  title: string
  description: string
  progress: number
  icon: React.ReactNode
  completed?: boolean
}) {
  return (
    <Card className={`rounded-3xl ${completed ? "border-pink-500 dark:border-pink-700" : ""}`}>
      <CardHeader>
        <div className="flex justify-between items-start">
          <div className="bg-pink-100 dark:bg-pink-900/20 p-3 rounded-full">{icon}</div>
          {completed && <Badge className="bg-pink-500 rounded-full">완료</Badge>}
        </div>
        <CardTitle className="mt-4">{title}</CardTitle>
        <CardDescription>{description}</CardDescription>
      </CardHeader>
      <CardContent>
        <div className="space-y-2">
          <div className="flex justify-between">
            <span className="text-sm font-medium">진행 상황</span>
            <span className="text-sm font-medium">{progress}%</span>
          </div>
          <Progress value={progress} className="h-2 rounded-full" />
        </div>
      </CardContent>
    </Card>
  )
}
