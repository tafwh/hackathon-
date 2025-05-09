"use client"

import { useEffect, useState, useRef } from 'react'
import { useUser } from '@/context/UserContext'
import { io, Socket } from 'socket.io-client'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Card } from '@/components/ui/card'
import { ScrollArea } from '@/components/ui/scroll-area'
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar'
import type { JSX } from 'react'

interface Message {
  _id: string
  user_id: string
  username: string
  content: string
  timestamp: string
}

export default function ChatPage() {
  const { user } = useUser()
  const [socket, setSocket] = useState<Socket | null>(null)
  const [messages, setMessages] = useState<Message[]>([])
  const [message, setMessage] = useState('')
  const messagesEndRef = useRef<HTMLDivElement>(null)

  // Socket connection
  useEffect(() => {
    const newSocket = io('http://localhost:8000', {
      transports: ['websocket'],
      reconnection: true,
      reconnectionAttempts: 5,
      reconnectionDelay: 1000,
      timeout: 20000,
      autoConnect: true,
      forceNew: true,
      withCredentials: true,
      path: '/socket.io/',
      extraHeaders: {
        'Access-Control-Allow-Origin': 'http://localhost:3000'
      },
      secure: true,
      rejectUnauthorized: false
    })

    newSocket.on('connect', () => {
      console.log('Connected to socket server')
      setSocket(newSocket)
    })

    newSocket.on('disconnect', () => {
      console.log('Disconnected from socket server')
    })

    newSocket.on('connect_error', (error) => {
      console.error('Socket connection error:', error)
    })

    newSocket.on('error', (error) => {
      console.error('Socket error:', error)
    })

    return () => {
      if (newSocket) {
        newSocket.disconnect()
      }
    }
  }, [])

  // Join chat and fetch messages
  useEffect(() => {
    if (socket && user) {
      try {
        // Join the group chat
        socket.emit('join', {
          room: 'group-chat',
          username: user.name || 'Anonymous'
        })

        // Fetch existing messages
        fetch('http://localhost:8000/api/chat/group-chat/messages', {
          method: 'GET',
          headers: {
            'Content-Type': 'application/json',
            'Accept': 'application/json'
          },
          credentials: 'include'
        })
          .then(res => {
            if (!res.ok) {
              throw new Error(`HTTP error! status: ${res.status}`)
            }
            return res.json()
          })
          .then(data => {
            console.log('Fetched messages:', data)
            if (Array.isArray(data)) {
              setMessages(data.reverse())
            } else {
              console.error('Invalid message data format:', data)
            }
          })
          .catch(error => {
            console.error('Error fetching messages:', error)
          })

        // Listen for new messages
        socket.on('message', (msg: Message) => {
          console.log('New message received:', msg)
          setMessages(prev => [...prev, msg])
        })

        // Listen for status messages
        socket.on('status', (msg: { msg: string }) => {
          console.log('Status message:', msg.msg)
        })
      } catch (error) {
        console.error('Error in chat setup:', error)
      }
    }
  }, [socket, user])

  // Scroll to bottom when messages change
  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' })
  }, [messages])

  const formatTime = (timestamp: string) => {
    const date = new Date(timestamp)
    return date.toLocaleTimeString('ko-KR', {
      hour: '2-digit',
      minute: '2-digit',
      hour12: true
    })
  }

  const sendMessage = (e: React.FormEvent) => {
    e.preventDefault()
    if (message.trim() && socket && user) {
      const messageData = {
        room: 'group-chat',
        user_id: user.id || 'anonymous',
        username: user.name || 'Anonymous',
        message: message.trim()
      }
      console.log('Sending message:', messageData)
      socket.emit('message', messageData)
      setMessage('')
    }
  }

  return (
    <div className="container mx-auto p-4 h-screen">
      <Card className="h-full flex flex-col">
        <div className="p-4 border-b">
          <h2 className="text-xl font-bold">그룹 채팅</h2>
        </div>

        <ScrollArea className="flex-1 p-4">
          <div className="space-y-4">
            {messages.map(msg => (
              <div
                key={msg._id}
                className={`w-full flex ${
                  msg.username === user?.name ? 'justify-end' : 'justify-start'
                }`}
              >
                <div className="flex items-start gap-2 max-w-[70%]">
                  {msg.username !== user?.name && (
                    <Avatar>
                      <AvatarImage src={user?.avatar} />
                      <AvatarFallback>{msg.username[0]}</AvatarFallback>
                    </Avatar>
                  )}
                  <div
                    className={`rounded-lg p-3 ${
                      msg.username === user?.name
                        ? 'bg-pink-500 text-white'
                        : 'bg-gray-100'
                    }`}
                  >
                    <p className="text-sm font-semibold mb-1">{msg.username}</p>
                    <p>{msg.content}</p>
                    <p className="text-xs mt-1 opacity-70">
                      {formatTime(msg.timestamp)}
                    </p>
                  </div>
                  {msg.username === user?.name && (
                    <Avatar>
                      <AvatarImage src={user?.avatar} />
                      <AvatarFallback>{msg.username[0]}</AvatarFallback>
                    </Avatar>
                  )}
                </div>
              </div>
            ))}
            <div ref={messagesEndRef} />
          </div>
        </ScrollArea>

        <form onSubmit={sendMessage} className="p-4 border-t">
          <div className="flex gap-2">
            <Input
              value={message}
              onChange={(e) => setMessage(e.target.value)}
              placeholder="메시지를 입력하세요..."
              className="flex-1"
            />
            <Button type="submit" className="bg-pink-500 hover:bg-pink-600">
              전송
            </Button>
          </div>
        </form>
      </Card>
    </div>
  )
}