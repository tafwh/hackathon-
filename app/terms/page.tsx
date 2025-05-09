"use client"

export default function TermsPage() {
  return (
    <div className="min-h-[70vh] flex items-center justify-center bg-gradient-to-b from-pink-50 to-white dark:from-gray-900 dark:to-gray-950">
      <div className="bg-white dark:bg-gray-900 rounded-3xl shadow-xl p-10 max-w-2xl w-full border border-pink-100 dark:border-gray-800">
        <h1 className="text-4xl font-bold text-pink-500 mb-6 text-center">이용약관</h1>
        <div className="space-y-6 text-gray-700 dark:text-gray-300 text-lg leading-relaxed">
          <p>
            본 서비스의 이용약관 예시입니다.
          </p>
          <ol className="list-decimal pl-6 space-y-2">
            <li>본 서비스는 회원가입 후 이용할 수 있습니다.</li>
            <li>사용자는 타인의 권리를 침해하거나 불법적인 행위를 해서는 안 됩니다.</li>
            <li>서비스 내 모든 데이터는 안전하게 보호됩니다.</li>
            <li>기타 자세한 내용은 운영정책을 따릅니다.</li>
          </ol>
          <p className="text-sm text-gray-400 mt-8 text-center">
            자세한 약관 내용은 실제 서비스 정책에 맞게 작성해 주세요.
          </p>
        </div>
      </div>
    </div>
  )
}
