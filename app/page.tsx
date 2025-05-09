import type React from "react"
import { Button } from "@/components/ui/button"
import Link from "next/link"
import { ArrowRight, MessageSquare, Award, Users, Brain } from "lucide-react"
import Image from "next/image"

export default function Home() {
  return (
    <div className="container mx-auto px-4 py-12">
      {/* Hero Section */}
      <section className="flex flex-col items-center text-center mb-16">
        <div className="mb-8">
          <Image
            src="/placeholder.svg?height=200&width=200"
            alt="소셜 큐 로고"
            width={200}
            height={200}
            className="rounded-full"
          />
        </div>
        <h1 className="text-4xl md:text-5xl font-bold mb-6">
          나만의 방식으로 <span className="text-pink-500">소통 능력</span> 키우기
        </h1>
        <p className="text-lg md:text-xl text-gray-600 dark:text-gray-300 max-w-2xl mb-8">
          안전한 환경에서 사회적 상호작용을 연습하고, 감정을 이해하며, 자신감을 키워보세요.
        </p>
        <div className="flex flex-col sm:flex-row gap-4">
          <Button asChild size="lg" className="bg-pink-500 hover:bg-pink-600 rounded-full">
            <Link href="/signup">
              시작하기 <ArrowRight className="ml-2 h-5 w-5" />
            </Link>
          </Button>
          <Button asChild variant="outline" size="lg" className="rounded-full">
            <Link href="/about">더 알아보기</Link>
          </Button>
        </div>
      </section>

      {/* Features Section */}
      <section className="mb-16">
        <h2 className="text-2xl font-bold text-center mb-12">주요 기능</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          <FeatureCard
            icon={<MessageSquare className="h-10 w-10 text-pink-500" />}
            title="역할극 시뮬레이터"
            description="다양한 사회적 상황을 AI 피드백과 함께 연습하여 대응 능력을 향상시켜요."
          />
          <FeatureCard
            icon={<Brain className="h-10 w-10 text-pink-500" />}
            title="감정 분석"
            description="메시지의 감정적 톤에 대한 피드백을 받고 사회적 신호를 인식하는 법을 배워요."
          />
          <FeatureCard
            icon={<Users className="h-10 w-10 text-pink-500" />}
            title="커뮤니티 지원"
            description="자원봉사자와 또래들과 연결하여 지원적인 환경에서 실제 연습을 해보세요."
          />
          <FeatureCard
            icon={<Award className="h-10 w-10 text-pink-500" />}
            title="게임화된 학습"
            description="포인트를 얻고, 업적을 달성하며, 재미있는 일일 챌린지로 진행 상황을 추적해요."
          />
        </div>
      </section>

      {/* How It Works Section */}
      <section className="mb-16">
        <h2 className="text-2xl font-bold text-center mb-12">이용 방법</h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          <StepCard
            number="1"
            title="프로필 만들기"
            description="가입하고 특정 요구와 목표에 맞게 학습 경험을 맞춤 설정하세요."
          />
          <StepCard
            number="2"
            title="시나리오 연습하기"
            description="역할극 시뮬레이션에 참여하거나 AI 캐릭터와 채팅하여 사회적 상호작용을 연습해보세요."
          />
          <StepCard
            number="3"
            title="맞춤형 피드백 받기"
            description="의사소통 스타일에 대한 자세한 피드백을 받고 시간이 지남에 따라 향상도를 추적하세요."
          />
        </div>
      </section>

      {/* CTA Section */}
      <section className="bg-pink-50 dark:bg-pink-900/10 rounded-3xl p-8 text-center">
        <h2 className="text-2xl font-bold mb-4">소통 능력을 향상시킬 준비가 되셨나요?</h2>
        <p className="text-lg text-gray-600 dark:text-gray-300 mb-6 max-w-2xl mx-auto">
          오늘 우리 커뮤니티에 가입하고 더 자신감 있는 사회적 상호작용을 향한 여정을 시작하세요.
        </p>
        <Button asChild size="lg" className="bg-pink-500 hover:bg-pink-600 rounded-full">
          <Link href="/signup">무료 체험 시작하기</Link>
        </Button>
      </section>
    </div>
  )
}

function FeatureCard({ icon, title, description }: { icon: React.ReactNode; title: string; description: string }) {
  return (
    <div className="bg-white dark:bg-gray-800 p-6 rounded-3xl shadow-sm border border-gray-100 dark:border-gray-700 hover:shadow-md transition-shadow">
      <div className="mb-4 bg-pink-100 dark:bg-pink-900/20 p-4 rounded-full inline-block">{icon}</div>
      <h3 className="text-xl font-semibold mb-2">{title}</h3>
      <p className="text-gray-600 dark:text-gray-300">{description}</p>
    </div>
  )
}

function StepCard({ number, title, description }: { number: string; title: string; description: string }) {
  return (
    <div className="bg-white dark:bg-gray-800 p-6 rounded-3xl shadow-sm border border-gray-100 dark:border-gray-700 relative">
      <div className="absolute -top-5 -left-5 bg-pink-500 text-white w-10 h-10 rounded-full flex items-center justify-center text-xl font-bold">
        {number}
      </div>
      <h3 className="text-xl font-semibold mb-2 mt-4">{title}</h3>
      <p className="text-gray-600 dark:text-gray-300">{description}</p>
    </div>
  )
}
