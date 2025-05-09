"use client"

import Link from "next/link"
import { useState } from "react"
import { Button } from "@/components/ui/button"
import { ModeToggle } from "./mode-toggle"
import { Menu, X } from "lucide-react"
import Image from "next/image"
import { useUser } from "@/context/UserContext"
import { Avatar, AvatarImage, AvatarFallback } from "@/components/ui/avatar"

export default function Header() {
  const [isMenuOpen, setIsMenuOpen] = useState(false)
  const { user, setUser } = useUser()

  const handleLogout = () => {
    setUser(null)
    if (typeof window !== "undefined") {
      localStorage.removeItem("user")
      window.location.href = "/" // 홈으로 이동
    }
  }

  // 게스트 여부 판별: user?.id === "guest" 또는 user?.name === "게스트"
  const isGuest = user?.id === "guest"

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
            <span className="text-xl font-bold text-pink-500">소설큐</span>
          </Link>

          {/* Desktop Navigation */}
          <nav className="hidden md:flex items-center space-x-6">
            <NavLinks />
            <div className="flex items-center space-x-2">
              <ModeToggle />
              {!user && (
                <>
                  <Button asChild variant="outline" className="rounded-full">
                    <Link href="/login">로그인</Link>
                  </Button>
                  <Button asChild className="bg-pink-500 hover:bg-pink-600 rounded-full">
                    <Link href="/signup">회원가입</Link>
                  </Button>
                </>
              )}
              {user && (
                <>
                  <Button
                    onClick={handleLogout}
                    className="bg-red-500 hover:bg-red-600 text-white rounded-full"
                    variant="destructive"
                  >
                    로그아웃
                  </Button>
                  <Link href="/profile">
                    <Avatar className="h-10 w-10">
                      <AvatarImage
                        src={user.avatar ? user.avatar : "/default_profile.png?width=40&height=40"}
                        alt={user.name}
                      />
                      <AvatarFallback>
                        {isGuest ? "G" : user.name[0]}
                      </AvatarFallback>
                    </Avatar>
                  </Link>
                </>
              )}
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
                {!user && (
                  <>
                    <Button asChild variant="outline" className="rounded-full">
                      <Link href="/login">로그인</Link>
                    </Button>
                    <Button asChild className="bg-pink-500 hover:bg-pink-600 rounded-full">
                      <Link href="/signup">회원가입</Link>
                    </Button>
                  </>
                )}
                {user && (
                  <>
                    <Button
                      onClick={handleLogout}
                      className="bg-red-500 hover:bg-red-600 text-white rounded-full"
                      variant="destructive"
                    >
                      로그아웃
                    </Button>
                    <Link href="/profile">
                      <Avatar className="h-10 w-10">
                        <AvatarImage
                          src={user.avatar ? user.avatar : "/default_profile.png"}
                          alt={user.name}
                        />
                        <AvatarFallback>
                          {isGuest ? "G" : user.name[0]}
                        </AvatarFallback>
                      </Avatar>
                    </Link>
                  </>
                )}
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
        AI 채팅 /*여기 바뀜*/
      </Link>
      <Link href="/chat" className={linkClass}>
        채팅방
      </Link>
      <Link href="/community" className={linkClass}>
        커뮤니티
      </Link>
    </>
  )
}
