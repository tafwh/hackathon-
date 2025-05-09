"use client"

export default function PrivacyPage() {
  return (
    <div className="min-h-[70vh] flex items-center justify-center bg-gradient-to-b from-pink-50 to-white dark:from-gray-900 dark:to-gray-950">
      <div className="bg-white dark:bg-gray-900 rounded-3xl shadow-xl p-10 max-w-2xl w-full border border-pink-100 dark:border-gray-800">
        <h1 className="text-4xl font-bold text-pink-500 mb-6 text-center">개인정보처리방침</h1>
        <div className="space-y-6 text-gray-700 dark:text-gray-300 text-lg leading-relaxed">
          <p>
            본 서비스의 개인정보처리방침 예시입니다.
          </p>
          <ol className="list-decimal pl-6 space-y-2">
            <li>수집하는 개인정보 항목: 이름, 이메일 등</li>
            <li>개인정보의 수집 및 이용 목적: 서비스 제공, 문의 응대 등</li>
            <li>개인정보의 보유 및 이용 기간: 회원 탈퇴 시까지</li>
            <li>기타 자세한 내용은 운영정책을 따릅니다.</li>
          </ol>
          <p className="text-sm text-gray-400 mt-8 text-center">
            자세한 방침 내용은 실제 서비스 정책에 맞게 작성해 주세요.
          </p>
        </div>
      </div>
    </div>
  )
}
