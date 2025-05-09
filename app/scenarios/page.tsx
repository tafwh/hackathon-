import type React from "react"
import { Card, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import Link from "next/link"
import { Badge } from "@/components/ui/badge"
import { MessageSquare, Users, Coffee, ShoppingBag, Briefcase, School } from "lucide-react"

export default function ScenariosPage() {
  return (
    <div className="container mx-auto px-4 py-12">
      <div className="mb-8">
        <h1 className="text-3xl font-bold mb-4">역할극 시나리오</h1>
        <p className="text-lg text-gray-600 dark:text-gray-300 max-w-3xl">
          안전한 환경에서 사회적 상호작용을 연습해보세요. 시나리오를 선택하여 역할극을 시작하고 응답에 대한 AI 피드백을
          받아보세요.
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        <ScenarioCard
          icon={<MessageSquare className="h-8 w-8 text-pink-500" />}
          title="새로운 사람 만나기"
          description="다양한 환경에서 자신을 소개하고 가벼운 대화를 나누는 연습을 해보세요."
          difficulty="초급"
          category="사회적"
          href="/scenarios/meeting-new-people"
        />

        <ScenarioCard
          icon={<Users className="h-8 w-8 text-pink-500" />}
          title="갈등 해결하기"
          description="의견 불일치를 해결하고 평화로운 해결책을 찾는 방법을 배워보세요."
          difficulty="고급"
          category="관계"
          href="/scenarios/resolving-conflicts"
        />

        <ScenarioCard
          icon={<Coffee className="h-8 w-8 text-pink-500" />}
          title="일상 대화"
          description="친구 및 지인과의 일상적인 대화를 연습해보세요."
          difficulty="초급"
          category="사회적"
          href="/scenarios/casual-conversations"
        />

        <ScenarioCard
          icon={<ShoppingBag className="h-8 w-8 text-pink-500" />}
          title="쇼핑 상호작용"
          description="도움 요청, 구매, 반품 처리 등을 연습해보세요."
          difficulty="중급"
          category="일상생활"
          href="/scenarios/shopping-interactions"
        />

        <ScenarioCard
          icon={<Briefcase className="h-8 w-8 text-pink-500" />}
          title="취업 면접"
          description="연습 질문과 피드백으로 취업 면접을 준비해보세요."
          difficulty="고급"
          category="직업"
          href="/scenarios/job-interview"
        />

        <ScenarioCard
          icon={<School className="h-8 w-8 text-pink-500" />}
          title="수업 참여"
          description="질문하기와 그룹 토론 참여를 연습해보세요."
          difficulty="중급"
          category="교육"
          href="/scenarios/classroom-participation"
        />
      </div>
    </div>
  )
}

function ScenarioCard({
  icon,
  title,
  description,
  difficulty,
  category,
  href,
}: {
  icon: React.ReactNode
  title: string
  description: string
  difficulty: "초급" | "중급" | "고급"
  category: string
  href: string
}) {
  const difficultyColor = {
    초급: "bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-100",
    중급: "bg-yellow-100 text-yellow-800 dark:bg-yellow-900 dark:text-yellow-100",
    고급: "bg-red-100 text-red-800 dark:bg-red-900 dark:text-red-100",
  }[difficulty]

  return (
    <Card className="hover:shadow-md transition-shadow rounded-3xl overflow-hidden">
      <CardHeader>
        <div className="flex justify-between items-start">
          <div className="bg-pink-100 dark:bg-pink-900/20 p-3 rounded-full">{icon}</div>
          <div className="flex gap-2">
            <Badge variant="outline" className={`${difficultyColor} rounded-full`}>
              {difficulty}
            </Badge>
            <Badge variant="secondary" className="rounded-full">
              {category}
            </Badge>
          </div>
        </div>
        <CardTitle className="mt-4">{title}</CardTitle>
        <CardDescription>{description}</CardDescription>
      </CardHeader>
      <CardFooter>
        <Button asChild className="w-full bg-pink-500 hover:bg-pink-600 rounded-full">
          <Link href={href}>시나리오 시작하기</Link>
        </Button>
      </CardFooter>
    </Card>
  )
}
