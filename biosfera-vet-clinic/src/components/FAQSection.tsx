import React, { useState, useEffect } from 'react'
import { Card, CardContent } from '@/components/ui/card'
import { useAuth } from '@/contexts/AuthContext'
import { useToast } from '@/hooks/use-toast'

interface Question {
  id: number
  user_id: number
  text: string
  created_at: string
  user?: { name: string }
  admin_reply?: string | null
}

const API_URL = import.meta.env.VITE_API_URL || 'http://localhost:8000';

export default function FAQSection() {
  const { user, token } = useAuth()
  const { toast } = useToast()
  const [questions, setQuestions] = useState<Question[]>([])
  const [form, setForm] = useState<{ text: string }>({ text: '' })
  const [editingId, setEditingId] = useState<number | null>(null)
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)
  const [replyingId, setReplyingId] = useState<number | null>(null)
  const [replyText, setReplyText] = useState<string>('')

  const fetchQuestions = async () => {
    setLoading(true)
    try {
      const res = await fetch(`${API_URL}/questions/`)
      const data = await res.json()
      setQuestions(data)
    } catch {
      setError('Ошибка загрузки вопросов')
    } finally {
      setLoading(false)
    }
  }

  useEffect(() => {
    fetchQuestions()
  }, [])

  const handleChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    setForm({ ...form, [e.target.name]: e.target.value })
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setError(null)
    if (!token) return
    try {
      const res = await fetch(`${API_URL}/questions/${editingId ? editingId : ''}`, {
        method: editingId ? 'PUT' : 'POST',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify(form),
      })
      if (!res.ok) throw new Error('Ошибка сохранения')
      setForm({ text: '' })
      setEditingId(null)
      fetchQuestions()
    } catch {
      setError('Ошибка сохранения')
    }
  }

  const handleEdit = (question: Question) => {
    setForm({ text: question.text })
    setEditingId(question.id)
  }

  const handleDelete = async (id: number) => {
    if (!token) return
    if (!window.confirm('Удалить вопрос?')) return
    try {
      const res = await fetch(`${API_URL}/questions/${id}`, {
        method: 'DELETE',
        headers: { Authorization: `Bearer ${token}` },
      })
      if (!res.ok) throw new Error('Ошибка удаления')
      fetchQuestions()
    } catch {
      setError('Ошибка удаления')
    }
  }

  const handleReply = async (id: number) => {
    if (!token) return
    try {
      const res = await fetch(`${API_URL}/questions/${id}/reply`, {
        method: 'PATCH',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify(replyText),
      })
      if (!res.ok) throw new Error('Ошибка ответа')
      setReplyingId(null)
      setReplyText('')
      fetchQuestions()
    } catch {
      setError('Ошибка ответа')
    }
  }

  return (
    <section className="py-16 bg-gradient-to-br from-green-50 to-blue-50 dark:from-gray-800 dark:to-gray-900 min-h-screen">
      <div className="container mx-auto px-4">
        <h2 className="text-3xl md:text-4xl font-bold text-gray-900 dark:text-white mb-8 text-center">Вопрос-Ответ</h2>
        {user && (
          <form onSubmit={handleSubmit} className="mb-8 bg-white dark:bg-gray-900 rounded-xl shadow p-6 max-w-xl mx-auto">
            <textarea
              name="text"
              value={form.text}
              onChange={handleChange}
              required
              minLength={5}
              maxLength={500}
              placeholder="Ваш вопрос..."
              className="w-full px-4 py-3 border rounded-xl text-lg focus:outline-none focus:ring-2 focus:ring-biosfera-primary shadow-sm bg-white dark:bg-gray-900 text-gray-900 dark:text-gray-100 border-gray-300 dark:border-gray-700 mb-4"
            />
            <button
              type="submit"
              className="bg-biosfera-primary hover:bg-biosfera-secondary text-white font-medium px-6 py-2 rounded-xl shadow"
              disabled={loading}
            >
              {editingId ? 'Сохранить изменения' : 'Задать вопрос'}
            </button>
            {editingId && (
              <button
                type="button"
                className="ml-4 text-gray-500 hover:text-gray-900 dark:hover:text-white"
                onClick={() => { setEditingId(null); setForm({ text: '' }) }}
              >
                Отмена
              </button>
            )}
            {error && <div className="text-red-500 mt-2">{error}</div>}
          </form>
        )}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-2 gap-6">
          {questions.map((question) => (
            <Card key={question.id} className="h-full hover:shadow-lg transition-shadow duration-300 border-0 shadow-md">
              <CardContent className="p-6 h-full flex flex-col">
                <div className="flex items-start justify-between mb-4">
                  <div>
                    <h4 className="font-medium text-gray-900 dark:text-white">
                      {question.user?.name || 'Пользователь'}
                    </h4>
                    <div className="text-sm text-gray-500 dark:text-gray-400">
                      {new Date(question.created_at).toLocaleString('ru-RU', { day: '2-digit', month: 'long', year: 'numeric', hour: '2-digit', minute: '2-digit' })}
                    </div>
                  </div>
                  {user && user.id === question.user_id && (
                    <div className="flex gap-2">
                      <button
                        className="flex items-center gap-1 text-biosfera-primary hover:text-biosfera-secondary"
                        onClick={() => handleEdit(question)}
                      >
                        Редактировать
                      </button>
                      <button
                        className="flex items-center gap-1 text-red-500 hover:text-red-700"
                        onClick={() => handleDelete(question.id)}
                      >
                        Удалить
                      </button>
                    </div>
                  )}
                  {user && user.is_admin && user.id !== question.user_id && (
                    <div className="flex gap-2">
                      <button
                        className="flex items-center gap-1 text-red-500 hover:text-red-700"
                        onClick={() => handleDelete(question.id)}
                      >
                        Удалить
                      </button>
                    </div>
                  )}
                </div>
                <div className="flex-1">
                  <p className="text-gray-600 dark:text-gray-300 leading-relaxed mb-4">
                    {question.text}
                  </p>
                  {question.admin_reply && (
                    <div className="mt-2 p-3 bg-blue-50 dark:bg-blue-900 rounded text-black dark:text-white text-sm">
                      <b>Ответ администратора:</b> {question.admin_reply}
                    </div>
                  )}
                  {user && user.is_admin && (
                    <div className="mt-2">
                      {replyingId === question.id ? (
                        <div className="flex flex-col gap-2">
                          <textarea
                            className="w-full border rounded p-2"
                            value={replyText}
                            onChange={e => setReplyText(e.target.value)}
                            placeholder="Ответ администратора..."
                          />
                          <div className="flex gap-2">
                            <button className="bg-biosfera-primary text-white px-4 py-1 rounded" onClick={() => handleReply(question.id)} type="button">Сохранить</button>
                            <button className="text-gray-500" onClick={() => { setReplyingId(null); setReplyText('') }} type="button">Отмена</button>
                          </div>
                        </div>
                      ) : (
                        <button className="text-biosfera-primary hover:underline" onClick={() => { setReplyingId(question.id); setReplyText(question.admin_reply || '') }}>Ответить</button>
                      )}
                    </div>
                  )}
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </section>
  )
}
