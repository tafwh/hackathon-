"use client"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Badge } from "@/components/ui/badge"
import Link from "next/link"
import { Users, Calendar, UserPlus } from "lucide-react"
import { useUser } from "@/context/UserContext"

export default function CommunityPage() {
  const { achieveChallenge } = useUser()

  const handlePostSubmit = () => {
    // 글 작성 처리
    achieveChallenge("community-post")
  }

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="mb-8">
        <h1 className="text-3xl font-bold mb-4">커뮤니티</h1>
        <p className="text-lg text-gray-600 dark:text-gray-300 max-w-3xl">
          자원봉사자와 또래들과 연결하여 지원적인 환경에서 사회적 기술을 연습해보세요.
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-12">
        <Card className="rounded-3xl">
          <CardHeader className="pb-2">
            <CardTitle className="flex items-center">
              <Users className="mr-2 h-5 w-5 text-pink-500" />
              그룹 채팅
            </CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-gray-600 dark:text-gray-300">
              주제별 그룹 채팅에 참여하여 지원적인 그룹 환경에서 대화를 연습해보세요.
            </p>
          </CardContent>
          <CardFooter>
            <Button asChild className="w-full bg-pink-500 hover:bg-pink-600 rounded-full">
              <Link href="/community/groups">그룹 찾아보기</Link>
            </Button>
          </CardFooter>
        </Card>

        <Card className="rounded-3xl">
          <CardHeader className="pb-2">
            <CardTitle className="flex items-center">
              <UserPlus className="mr-2 h-5 w-5 text-pink-500" />
              자원봉사자 연결
            </CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-gray-600 dark:text-gray-300">
              일대일로 사회적 상호작용을 연습할 수 있도록 도와주는 훈련된 자원봉사자와 연결하세요.
            </p>
          </CardContent>
          <CardFooter>
            <Button asChild className="w-full bg-pink-500 hover:bg-pink-600 rounded-full">
              <Link href="/community/volunteers">자원봉사자 찾기</Link>
            </Button>
          </CardFooter>
        </Card>

        <Card className="rounded-3xl">
          <CardHeader className="pb-2">
            <CardTitle className="flex items-center">
              <Calendar className="mr-2 h-5 w-5 text-pink-500" />
              이벤트
            </CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-gray-600 dark:text-gray-300">
              특정 사회적 기술 개발에 중점을 둔 가상 이벤트와 워크샵에 참여하세요.
            </p>
          </CardContent>
          <CardFooter>
            <Button asChild className="w-full bg-pink-500 hover:bg-pink-600 rounded-full">
              <Link href="/community/events">이벤트 보기</Link>
            </Button>
          </CardFooter>
        </Card>
      </div>

      <h2 className="text-2xl font-bold mb-6">추천 그룹</h2>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-12">
        <GroupCard
          name="대화 시작하기"
          description="대화를 시작하고 유지하는 방법을 연습하는 그룹입니다."
          members={24}
          activity="활발함"
          href="/community/groups/conversation-starters"
        />
        <GroupCard
          name="감정 인식"
          description="다양한 감정을 식별하고 대응하는 연습을 합니다."
          members={18}
          activity="매우 활발함"
          href="/community/groups/emotion-recognition"
        />
        <GroupCard
          name="직장 상호작용"
          description="전문적인 사회적 기술과 사무실 예절에 중점을 둡니다."
          members={32}
          activity="보통"
          href="/community/groups/workplace-interactions"
        />
      </div>

      <h2 className="text-2xl font-bold mb-6">다가오는 이벤트</h2>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-12">
        <EventCard
          title="가상 소셜 믹서"
          description="편안한 환경에서 사회적 기술을 연습할 수 있는 캐주얼한 온라인 모임입니다."
          date="2023년 5월 15일"
          time="오후 7:00 - 8:30"
          attendees={12}
          href="/community/events/virtual-social-mixer"
        />
        <EventCard
          title="감정 인식 워크샵"
          description="대화에서 감정을 더 잘 식별하고 대응하는 기술을 배웁니다."
          date="2023년 5월 22일"
          time="오후 6:00 - 7:30"
          attendees={8}
          href="/community/events/emotion-workshop"
        />
      </div>

      <h2 className="text-2xl font-bold mb-6">추천 자원봉사자</h2>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        <VolunteerCard
          name="김소연"
          role="의사소통 코치"
          bio="대화 기술을 향상시키고 사회적 환경에서 자신감을 키우는 데 도움을 주는 전문가입니다."
          availability="저녁 & 주말"
          href="/community/volunteers/sarah-johnson"
        />
        <VolunteerCard
          name="이민우"
          role="사회적 기술 멘토"
          bio="자폐 스펙트럼 개인들과 함께 일한 5년의 경험을 가지고 있으며, 실용적인 사회적 기술에 중점을 둡니다."
          availability="평일 오후"
          href="/community/volunteers/michael-chen"
        />
        <VolunteerCard
          name="박지은"
          role="감정 인식 전문가"
          bio="대화와 사회적 상호작용에서 감정적 신호를 이해하고 해석하는 데 도움을 줍니다."
          availability="유연한 일정"
          href="/community/volunteers/emma-rodriguez"
        />
      </div>
    </div>
  )
}

function GroupCard({
  name,
  description,
  members,
  activity,
  href,
}: {
  name: string
  description: string
  members: number
  activity: "매우 활발함" | "활발함" | "보통" | "낮음"
  href: string
}) {
  const activityColor = {
    "매우 활발함": "bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-100",
    활발함: "bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-100",
    보통: "bg-yellow-100 text-yellow-800 dark:bg-yellow-900 dark:text-yellow-100",
    낮음: "bg-gray-100 text-gray-800 dark:bg-gray-900 dark:text-gray-100",
  }[activity]

  return (
    <Card className="hover:shadow-md transition-shadow rounded-3xl">
      <CardHeader>
        <div className="flex justify-between items-start">
          <CardTitle>{name}</CardTitle>
          <Badge className={`${activityColor} rounded-full`}>{activity}</Badge>
        </div>
        <CardDescription>{description}</CardDescription>
      </CardHeader>
      <CardContent>
        <div className="flex items-center text-sm text-gray-500 dark:text-gray-400">
          <Users className="mr-2 h-4 w-4" />
          {members}명의 회원
        </div>
      </CardContent>
      <CardFooter>
        <Button asChild className="w-full bg-pink-500 hover:bg-pink-600 rounded-full">
          <Link href={href}>그룹 가입하기</Link>
        </Button>
      </CardFooter>
    </Card>
  )
}

function EventCard({
  title,
  description,
  date,
  time,
  attendees,
  href,
}: {
  title: string
  description: string
  date: string
  time: string
  attendees: number
  href: string
}) {
  return (
    <Card className="hover:shadow-md transition-shadow rounded-3xl">
      <CardHeader>
        <CardTitle>{title}</CardTitle>
        <CardDescription>{description}</CardDescription>
      </CardHeader>
      <CardContent className="space-y-2">
        <div className="flex items-center text-sm">
          <Calendar className="mr-2 h-4 w-4 text-pink-500" />
          {date} • {time}
        </div>
        <div className="flex items-center text-sm text-gray-500 dark:text-gray-400">
          <Users className="mr-2 h-4 w-4" />
          {attendees}명 참석 예정
        </div>
      </CardContent>
      <CardFooter>
        <Button asChild className="w-full bg-pink-500 hover:bg-pink-600 rounded-full">
          <Link href={href}>등록하기</Link>
        </Button>
      </CardFooter>
    </Card>
  )
}

function VolunteerCard({
  name,
  role,
  bio,
  availability,
  href,
}: {
  name: string
  role: string
  bio: string
  availability: string
  href: string
}) {
  return (
    <Card className="hover:shadow-md transition-shadow rounded-3xl">
      <CardHeader>
        <div className="flex items-center gap-4">
          <Avatar className="h-12 w-12">
            <AvatarImage src={`/placeholder.svg?height=100&width=100`} alt={name} />
            <AvatarFallback>
              {name
                .split(" ")
                .map((n) => n[0])
                .join("")}
            </AvatarFallback>
          </Avatar>
          <div>
            <CardTitle className="text-xl">{name}</CardTitle>
            <CardDescription>{role}</CardDescription>
          </div>
        </div>
      </CardHeader>
      <CardContent className="space-y-2">
        <p className="text-sm">{bio}</p>
        <div className="flex items-center text-sm text-gray-500 dark:text-gray-400">
          <Calendar className="mr-2 h-4 w-4" />
          가능 시간: {availability}
        </div>
      </CardContent>
      <CardFooter>
        <Button asChild className="w-full bg-pink-500 hover:bg-pink-600 rounded-full">
          <Link href={href}>연결하기</Link>
        </Button>
      </CardFooter>
    </Card>
  )
}
