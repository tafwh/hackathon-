"use client"

import Link from "next/link"
import { useState } from "react"
import { Button } from "@/components/ui/button"
import { ModeToggle } from "./mode-toggle"
import { Menu, X } from "lucide-react"
import Image from "next/image"

export default function Header() {
  const [isMenuOpen, setIsMenuOpen] = useState(false)

  return (
    <header className="border-b border-gray-100 dark:border-gray-800">
      <div className="container mx-auto px-4 py-4">
        <div className="flex items-center justify-between">
          <Link href="/" className="flex items-center">
            <Image
              src="/placeholder.svg?height=40&width=40"
              alt="소셜 큐 로고"
              width={40}
              height={40}
              className="rounded-full mr-2"
            />
            <span className="text-xl font-bold text-pink-500">소셜큐</span>
          </Link>

          {/* Desktop Navigation */}
          <nav className="hidden md:flex items-center space-x-6">
            <NavLinks />
            <div className="flex items-center space-x-2">
              <ModeToggle />
              <Button asChild variant="outline" className="rounded-full">
                <Link href="/login">로그인</Link>
              </Button>
              <Button asChild className="bg-pink-500 hover:bg-pink-600 rounded-full">
                <Link href="/signup">회원가입</Link>
              </Button>
            </div>
          </nav>

          {/* Mobile Menu Button */}
          <div className="flex items-center md:hidden">
            <ModeToggle />
            <Button variant="ghost" onClick={() => setIsMenuOpen(!isMenuOpen)} className="rounded-full">
              {isMenuOpen ? <X /> : <Menu />}
            </Button>
          </div>
        </div>

        {/* Mobile Navigation */}
        {isMenuOpen && (
          <nav className="md:hidden py-4">
            <div className="flex flex-col space-y-4">
              <NavLinks mobile />
              <div className="flex flex-col space-y-2 pt-4 border-t border-gray-100 dark:border-gray-700">
                <Button asChild variant="outline" className="rounded-full">
                  <Link href="/login">로그인</Link>
                </Button>
                <Button asChild className="bg-pink-500 hover:bg-pink-600 rounded-full">
                  <Link href="/signup">회원가입</Link>
                </Button>
              </div>
            </div>
          </nav>
        )}
      </div>
    </header>
  )
}

function NavLinks({ mobile = false }: { mobile?: boolean }) {
  const linkClass = mobile
    ? "text-gray-700 dark:text-gray-200 hover:text-pink-500 dark:hover:text-pink-400 transition-colors"
    : "text-gray-700 dark:text-gray-200 hover:text-pink-500 dark:hover:text-pink-400 transition-colors"

  return (
    <>
      <Link href="/scenarios" className={linkClass}>
        시나리오
      </Link>
      <Link href="/chat" className={linkClass}>
        AI 채팅
      </Link>
      <Link href="/chat" className={linkClass}>
        채팅방
      </Link>
      <Link href="/community" className={linkClass}>
        커뮤니티
      </Link>
      <Link href="/resources" className={linkClass}>
        자료실
      </Link>
    </>
  )
}
