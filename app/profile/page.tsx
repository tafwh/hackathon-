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

export default function ProfilePage() {
  const [isEditing, setIsEditing] = useState(false)

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="mb-6">
        <h1 className="text-3xl font-bold">내 프로필</h1>
        <p className="text-gray-600 dark:text-gray-300 mt-2">프로필을 관리하고 진행 상황을 추적하세요</p>
      </div>

      <Tabs defaultValue="profile" className="space-y-6">
        <TabsList className="grid grid-cols-4 max-w-md rounded-full">
          <TabsTrigger value="profile" className="rounded-full">
            <User className="h-4 w-4 mr-2" />
            <span className="hidden sm:inline">프로필</span>
          </TabsTrigger>
          <TabsTrigger value="progress" className="rounded-full">
            <BarChart className="h-4 w-4 mr-2" />
            <span className="hidden sm:inline">진행 상황</span>
          </TabsTrigger>
          <TabsTrigger value="achievements" className="rounded-full">
            <Award className="h-4 w-4 mr-2" />
            <span className="hidden sm:inline">업적</span>
          </TabsTrigger>
          <TabsTrigger value="settings" className="rounded-full">
            <Settings className="h-4 w-4 mr-2" />
            <span className="hidden sm:inline">설정</span>
          </TabsTrigger>
        </TabsList>

        {/* 프로필 탭 */}
        <TabsContent value="profile">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <Card className="md:col-span-1 rounded-3xl">
              <CardHeader>
                <CardTitle>프로필 정보</CardTitle>
              </CardHeader>
              <CardContent className="flex flex-col items-center text-center">
                <Avatar className="h-32 w-32 mb-4">
                  <AvatarImage src="/placeholder.svg?height=200&width=200" alt="사용자" />
                  <AvatarFallback>홍길동</AvatarFallback>
                </Avatar>
                <h3 className="text-xl font-semibold">홍길동</h3>
                <p className="text-gray-600 dark:text-gray-300">2023년 1월부터 회원</p>
                <div className="mt-4 flex gap-2">
                  <Badge className="rounded-full">레벨 3</Badge>
                  <Badge variant="outline" className="rounded-full">
                    1250 포인트
                  </Badge>
                </div>
              </CardContent>
            </Card>

            <Card className="md:col-span-2 rounded-3xl">
              <CardHeader>
                <div className="flex justify-between items-center">
                  <CardTitle>개인 정보</CardTitle>
                  <Button variant="outline" onClick={() => setIsEditing(!isEditing)} className="rounded-full">
                    {isEditing ? "취소" : "편집"}
                  </Button>
                </div>
              </CardHeader>
              <CardContent>
                {isEditing ? (
                  <form className="space-y-4">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <div className="space-y-2">
                        <Label htmlFor="name">이름</Label>
                        <Input id="name" defaultValue="홍길동" className="rounded-full" />
                      </div>
                      <div className="space-y-2">
                        <Label htmlFor="email">이메일</Label>
                        <Input id="email" type="email" defaultValue="hong@example.com" className="rounded-full" />
                      </div>
                      <div className="space-y-2">
                        <Label htmlFor="age">나이</Label>
                        <Input id="age" type="number" defaultValue="28" className="rounded-full" />
                      </div>
                      <div className="space-y-2">
                        <Label htmlFor="location">위치</Label>
                        <Input id="location" defaultValue="서울, 대한민국" className="rounded-full" />
                      </div>
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="bio">자기소개</Label>
                      <Textarea
                        id="bio"
                        defaultValue="저는 사회적 기술을 향상시키고 사회적 신호를 더 잘 이해하는 법을 배우고 있습니다."
                        rows={4}
                        className="rounded-2xl"
                      />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="goals">학습 목표</Label>
                      <Textarea
                        id="goals"
                        defaultValue="그룹 환경에서 더 편안함을 느끼고 감정을 인식하는 능력을 향상시키고 싶습니다."
                        rows={4}
                        className="rounded-2xl"
                      />
                    </div>
                  </form>
                ) : (
                  <div className="space-y-4">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <ProfileField label="이름" value="홍길동" />
                      <ProfileField label="이메일" value="hong@example.com" />
                      <ProfileField label="나이" value="28" />
                      <ProfileField label="위치" value="서울, 대한민국" />
                    </div>
                    <ProfileField
                      label="자기소개"
                      value="저는 사회적 기술을 향상시키고 사회적 신호를 더 잘 이해하는 법을 배우고 있습니다."
                    />
                    <ProfileField
                      label="학습 목표"
                      value="그룹 환경에서 더 편안함을 느끼고 감정을 인식하는 능력을 향상시키고 싶습니다."
                    />
                  </div>
                )}
              </CardContent>
              <CardFooter>
                {isEditing && (
                  <Button className="w-full bg-pink-500 hover:bg-pink-600 rounded-full">변경사항 저장</Button>
                )}
              </CardFooter>
            </Card>
          </div>
        </TabsContent>

        {/* 진행 상황 탭 */}
        <TabsContent value="progress">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <Card className="rounded-3xl">
              <CardHeader>
                <CardTitle>기술 진행 상황</CardTitle>
                <CardDescription>다양한 사회적 기술의 향상도를 추적하세요</CardDescription>
              </CardHeader>
              <CardContent className="space-y-6">
                <SkillProgress skill="감정 인식" progress={75} />
                <SkillProgress skill="대화 유지" progress={60} />
                <SkillProgress skill="갈등 해결" progress={45} />
                <SkillProgress skill="적극적 경청" progress={80} />
                <SkillProgress skill="공감 능력" progress={55} />
              </CardContent>
            </Card>

            <Card className="rounded-3xl">
              <CardHeader>
                <CardTitle>최근 활동</CardTitle>
                <CardDescription>최근 학습 활동</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <ActivityItem
                    icon={<MessageSquare className="h-5 w-5 text-pink-500" />}
                    title="역할극 시나리오 완료"
                    description="새로운 사람 만나기"
                    date="오늘"
                    points={50}
                  />
                  <ActivityItem
                    icon={<CheckCircle2 className="h-5 w-5 text-pink-500" />}
                    title="일일 챌린지 완료"
                    description="글로 3가지 감정 표현하기"
                    date="어제"
                    points={25}
                  />
                  <ActivityItem
                    icon={<Award className="h-5 w-5 text-pink-500" />}
                    title="업적 획득"
                    description="대화 시작자"
                    date="3일 전"
                    points={100}
                  />
                  <ActivityItem
                    icon={<MessageSquare className="h-5 w-5 text-pink-500" />}
                    title="역할극 시나리오 완료"
                    description="갈등 해결하기"
                    date="1주일 전"
                    points={50}
                  />
                  <ActivityItem
                    icon={<Calendar className="h-5 w-5 text-pink-500" />}
                    title="자원봉사자 세션"
                    description="소연님과 대화 연습"
                    date="2주일 전"
                    points={75}
                  />
                </div>
              </CardContent>
            </Card>
          </div>
        </TabsContent>

        {/* 업적 탭 */}
        <TabsContent value="achievements">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <AchievementCard
              title="대화 시작자"
              description="5개의 대화 시나리오 완료"
              progress={100}
              icon={<MessageSquare className="h-8 w-8 text-pink-500" />}
              completed
            />
            <AchievementCard
              title="감정 마스터"
              description="20가지 다른 감정을 올바르게 식별"
              progress={65}
              icon={<Award className="h-8 w-8 text-pink-500" />}
            />
            <AchievementCard
              title="갈등 해결사"
              description="3개의 갈등 시나리오 성공적으로 해결"
              progress={33}
              icon={<CheckCircle2 className="h-8 w-8 text-pink-500" />}
            />
            <AchievementCard
              title="적극적 청취자"
              description="10개의 적극적 경청 연습 완료"
              progress={80}
              icon={<Award className="h-8 w-8 text-pink-500" />}
            />
            <AchievementCard
              title="일일 챌린저"
              description="7일 연속 일일 챌린지 완료"
              progress={100}
              icon={<Calendar className="h-8 w-8 text-pink-500" />}
              completed
            />
            <AchievementCard
              title="소셜 버터플라이"
              description="5개의 그룹 채팅에 참여"
              progress={20}
              icon={<Users className="h-8 w-8 text-pink-500" />}
            />
          </div>
        </TabsContent>

        {/* 설정 탭 */}
        <TabsContent value="settings">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <Card className="rounded-3xl">
              <CardHeader>
                <CardTitle>계정 설정</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="space-y-2">
                  <Label htmlFor="password">비밀번호 변경</Label>
                  <Input id="password" type="password" placeholder="새 비밀번호" className="rounded-full" />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="confirm-password">비밀번호 확인</Label>
                  <Input
                    id="confirm-password"
                    type="password"
                    placeholder="새 비밀번호 확인"
                    className="rounded-full"
                  />
                </div>
                <Button className="w-full bg-pink-500 hover:bg-pink-600 rounded-full">비밀번호 업데이트</Button>
              </CardContent>
            </Card>

            <Card className="rounded-3xl">
              <CardHeader>
                <CardTitle>환경설정</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="space-y-2">
                  <Label htmlFor="language">언어</Label>
                  <Select defaultValue="ko">
                    <SelectTrigger id="language" className="rounded-full">
                      <SelectValue placeholder="언어 선택" />
                    </SelectTrigger>
                    <SelectContent className="rounded-2xl">
                      <SelectItem value="ko">한국어</SelectItem>
                      <SelectItem value="en">영어</SelectItem>
                      <SelectItem value="ja">일본어</SelectItem>
                      <SelectItem value="zh">중국어</SelectItem>
                      <SelectItem value="es">스페인어</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                <div className="space-y-2">
                  <Label htmlFor="notifications">알림 설정</Label>
                  <Select defaultValue="all">
                    <SelectTrigger id="notifications" className="rounded-full">
                      <SelectValue placeholder="알림 설정 선택" />
                    </SelectTrigger>
                    <SelectContent className="rounded-2xl">
                      <SelectItem value="all">모든 알림</SelectItem>
                      <SelectItem value="important">중요 알림만</SelectItem>
                      <SelectItem value="none">알림 없음</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                <div className="space-y-2">
                  <Label htmlFor="difficulty">난이도 수준</Label>
                  <Select defaultValue="medium">
                    <SelectTrigger id="difficulty" className="rounded-full">
                      <SelectValue placeholder="난이도 수준 선택" />
                    </SelectTrigger>
                    <SelectContent className="rounded-2xl">
                      <SelectItem value="easy">초급</SelectItem>
                      <SelectItem value="medium">중급</SelectItem>
                      <SelectItem value="hard">고급</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                <Button className="w-full bg-pink-500 hover:bg-pink-600 rounded-full">환경설정 저장</Button>
              </CardContent>
            </Card>
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
