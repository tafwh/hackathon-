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
  const [activeTab, setActiveTab] = useState("overview")

  if (!user) {
    return (
      <div className="max-w-md mx-auto mt-12 text-center">
        <h1 className="text-2xl font-bold mb-4">로그인 필요</h1>
        <p>프로필을 보려면 먼저 로그인 해주세요.</p>
      </div>
    )
  }

  return (
    <div className="container mx-auto px-4 py-8">
      {/* 프로필 헤더 */}
      <div className="bg-white dark:bg-gray-800 rounded-3xl p-8 mb-8">
        <div className="flex items-center gap-6">
          <Avatar className="h-24 w-24">
            <AvatarImage src={user.avatar || "/default_profile.png"} alt={user.name} />
            <AvatarFallback>{user.name[0]}</AvatarFallback>
          </Avatar>
          <div>
            <h1 className="text-2xl font-bold">{user.name}</h1>
            <div className="flex items-center gap-2 mt-2">
              <Badge variant="outline" className="bg-pink-100 text-pink-600">
                Lv.{user.level}
              </Badge>
              <Badge variant="outline" className="bg-blue-100 text-blue-600">
                {user.socialPoints} 포인트
              </Badge>
            </div>
          </div>
        </div>
      </div>

      {/* 탭 메뉴 */}
      <Tabs value={activeTab} onValueChange={setActiveTab} className="mb-8">
        <TabsList className="grid w-full grid-cols-4">
          <TabsTrigger value="overview">개요</TabsTrigger>
          <TabsTrigger value="achievements">업적</TabsTrigger>
          <TabsTrigger value="challenges">챌린지</TabsTrigger>
          <TabsTrigger value="shop">상점</TabsTrigger>
        </TabsList>

        {/* 개요 탭 */}
        <TabsContent value="overview">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <Card>
              <CardHeader>
                <CardTitle>소셜 랭크</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div className="flex justify-between">
                    <span>전체 랭크</span>
                    <span className="font-bold">#{user.rank?.current ?? 0}</span>
                  </div>
                  <div className="flex justify-between">
                    <span>주간 랭크</span>
                    <span className="font-bold">#{user.rank?.weekly ?? 0}</span>
                  </div>
                  <div className="flex justify-between">
                    <span>월간 랭크</span>
                    <span className="font-bold">#{user.rank?.monthly ?? 0}</span>
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>오늘의 챌린지</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {(user.dailyChallenges ?? []).map((challenge) => (
                    <div key={challenge.id} className="flex items-center justify-between">
                      <div>
                        <p className="font-medium">{challenge.title}</p>
                        <p className="text-sm text-gray-500">{challenge.description}</p>
                      </div>
                      <Badge variant={challenge.completed ? "default" : "outline"}>
                        {challenge.completed ? "완료" : "+" + challenge.points + "포인트"}
                      </Badge>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </div>
        </TabsContent>

        {/* 업적 탭 */}
        <TabsContent value="achievements">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {(user.achievements ?? []).map((achievement) => (
              <AchievementCard
                key={achievement.id}
                title={achievement.title}
                description={achievement.description}
                progress={achievement.progress}
                icon={<Award className="h-6 w-6 text-pink-500" />}
                completed={achievement.completed}
              />
            ))}
          </div>
        </TabsContent>

        {/* 챌린지 탭 */}
        <TabsContent value="challenges">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {(user.dailyChallenges ?? []).map((challenge) => (
              <Card key={challenge.id}>
                <CardHeader>
                  <CardTitle>{challenge.title}</CardTitle>
                  <CardDescription>{challenge.description}</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="flex justify-between items-center">
                    <Badge variant={challenge.completed ? "default" : "outline"}>
                      {challenge.completed ? "완료" : "진행중"}
                    </Badge>
                    <span className="text-pink-500 font-medium">+{challenge.points} 포인트</span>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </TabsContent>

        {/* 상점 탭 */}
        <TabsContent value="shop">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {(user.inventory ?? []).map((item) => (
              <Card key={item.id}>
                <CardHeader>
                  <CardTitle>{item.name}</CardTitle>
                  <CardDescription>{item.type === 'avatar' ? '아바타' : item.type === 'theme' ? '테마' : '배지'}</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="flex justify-between items-center">
                    <Badge variant={item.equipped ? "default" : "outline"}>
                      {item.equipped ? "장착됨" : "미장착"}
                    </Badge>
                    <Button variant="outline" size="sm">
                      {item.equipped ? "해제" : "장착"}
                    </Button>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </TabsContent>
      </Tabs>
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
