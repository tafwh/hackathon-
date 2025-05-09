"use client"
import { useState } from "react"

export default function ContactModal({ open, onClose }: { open: boolean, onClose: () => void }) {
  const [form, setForm] = useState({ name: "", email: "", message: "" })
  const [submitted, setSubmitted] = useState(false)

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setForm({ ...form, [e.target.name]: e.target.value })
  }

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    setSubmitted(true)
    // 실제로 이메일 전송 로직을 넣으려면 여기에 fetch 등 추가
  }

  if (!open) return null

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40">
      <div className="bg-white rounded-2xl shadow-lg p-8 max-w-sm w-full relative">
        <button
          className="absolute top-4 right-4 text-gray-400 hover:text-gray-600"
          onClick={onClose}
        >
          닫기
        </button>
        <h2 className="text-2xl font-bold mb-4 text-center">문의하기</h2>
        {submitted ? (
          <div className="text-green-600 font-semibold text-center py-8">문의가 정상적으로 접수되었습니다.<br />감사합니다!</div>
        ) : (
          <form onSubmit={handleSubmit} className="space-y-4">
            <input
              name="name"
              placeholder="이름"
              value={form.name}
              onChange={handleChange}
              required
              className="w-full border rounded p-2"
            />
            <input
              name="email"
              type="email"
              placeholder="이메일"
              value={form.email}
              onChange={handleChange}
              required
              className="w-full border rounded p-2"
            />
            <textarea
              name="message"
              placeholder="문의 내용을 입력하세요"
              value={form.message}
              onChange={handleChange}
              required
              className="w-full border rounded p-2"
              rows={5}
            />
            <button
              type="submit"
              className="w-full bg-pink-500 text-white rounded-full py-3 font-bold"
            >
              문의 보내기
            </button>
          </form>
        )}
      </div>
    </div>
  )
}
