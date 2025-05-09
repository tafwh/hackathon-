"use client"
import { ReactNode } from "react"

export default function InfoModal({ open, onClose, children }: { open: boolean, onClose: () => void, children: ReactNode }) {
  if (!open) return null
  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40">
      <div className="bg-white rounded-2xl shadow-lg p-8 max-w-lg w-full relative">
        <button
          className="absolute top-4 right-4 text-gray-400 hover:text-gray-600"
          onClick={onClose}
        >
          닫기
        </button>
        {children}
      </div>
    </div>
  )
}
