import Link from "next/link"

export default function Footer() {
  return (
    <footer className="border-t border-gray-100 dark:border-gray-800 py-8">
      <div className="container mx-auto px-4">
        <div className="flex flex-col md:flex-row justify-between items-center">
          <div className="mb-4 md:mb-0">
            <p className="text-sm text-gray-500 dark:text-gray-400">© 2023 소셜큐. 모든 권리 보유.</p>
          </div>
          <div className="flex space-x-6">
            <Link
              href="/terms"
              className="text-sm text-gray-500 dark:text-gray-400 hover:text-pink-500 dark:hover:text-pink-400"
            >
              이용약관
            </Link>
            <Link
              href="/privacy"
              className="text-sm text-gray-500 dark:text-gray-400 hover:text-pink-500 dark:hover:text-pink-400"
            >
              개인정보처리방침
            </Link>
            <Link
              href="/contact"
              className="text-sm text-gray-500 dark:text-gray-400 hover:text-pink-500 dark:hover:text-pink-400"
            >
              문의하기
            </Link>
          </div>
        </div>
      </div>
    </footer>
  )
}
