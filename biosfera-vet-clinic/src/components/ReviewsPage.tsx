import React, { useState } from 'react'
import { Card, CardContent } from '@/components/ui/card'
import { Avatar, AvatarFallback } from '@/components/ui/avatar'
import { Star, Quote } from 'lucide-react'

const reviews = [
  {
    id: 1,
    name: 'Анна Петрова',
    avatar: 'АП',
    rating: 5,
    date: '15 мая 2024',
    text: 'Прекрасная клиника! Врачи очень внимательные и профессиональные. Мой кот выздоровел благодаря качественному лечению.',
    pet: 'кот Мурзик',
  },
  {
    id: 2,
    name: 'Михаил Козлов',
    avatar: 'МК',
    rating: 4,
    date: '8 мая 2024',
    text: 'Отличный сервис и современное оборудование. Провели операцию моей собаке на высшем уровне.',
    pet: 'собака Рекс',
  },
  {
    id: 3,
    name: 'Елена Волкова',
    avatar: 'ЕВ',
    rating: 5,
    date: '2 мая 2024',
    text: 'Замечательная клиника с квалифицированными специалистами. Быстро поставили диагноз и назначили эффективное лечение.',
    pet: 'кошка Мася',
  },
  {
    id: 4,
    name: 'Александр Иванов',
    avatar: 'АИ',
    rating: 3,
    date: '28 апреля 2024',
    text: 'Врачи действительно любят животных, это видно сразу. Провели качественную диагностику и помогли моему попугаю.',
    pet: 'попугай Кеша',
  },
  {
    id: 5,
    name: 'Мария Сидорова',
    avatar: 'МС',
    rating: 4,
    date: '20 апреля 2024',
    text: 'Спасибо огромное за спасение нашего хомячка! Профессионализм на высшем уровне, рекомендую всем!',
    pet: 'хомяк Пушок',
  },
  {
    id: 6,
    name: 'Дмитрий Новиков',
    avatar: 'ДН',
    rating: 5,
    date: '15 апреля 2024',
    text: 'Отличная ветклиника! Удобная запись онлайн, вежливый персонал, чистые кабинеты.',
    pet: 'кролик Снежок',
  },
]

export default function ReviewsPage() {
  const [search, setSearch] = useState('')
  const [rating, setRating] = useState('')

  const filtered = reviews.filter(r =>
    r.text.toLowerCase().includes(search.toLowerCase()) &&
    (rating === '' || r.rating === Number(rating))
  )

  const renderStars = (rating: number) => {
    return [...Array(5)].map((_, index) => (
      <Star
        key={index}
        className={`h-4 w-4 ${index < rating ? 'text-biosfera-warm fill-biosfera-warm' : 'text-gray-300'}`}
      />
    ))
  }

  return (
    <section className="py-16 bg-gradient-to-br from-green-50 to-blue-50 dark:from-gray-800 dark:to-gray-900 min-h-screen">
      <div className="container mx-auto px-4">
        <div className="mb-8 flex flex-col md:flex-row gap-4 items-end">
          <input
            type="text"
            placeholder="Поиск по тексту отзыва..."
            value={search}
            onChange={e => setSearch(e.target.value)}
            className="w-full md:w-1/2 px-6 py-3 border rounded-xl text-lg focus:outline-none focus:ring-2 focus:ring-biosfera-primary shadow-sm mb-4 bg-white dark:bg-gray-900 text-gray-900 dark:text-gray-100 placeholder-gray-400 dark:placeholder-gray-500 border-gray-300 dark:border-gray-700"
          />
          <select
            value={rating}
            onChange={e => setRating(e.target.value)}
            className="w-full md:w-48 px-4 py-3 border rounded-xl text-lg focus:outline-none focus:ring-2 focus:ring-biosfera-primary shadow-sm mb-4 bg-white dark:bg-gray-900 text-gray-900 dark:text-gray-100 border-gray-300 dark:border-gray-700"
          >
            <option value="">Все рейтинги</option>
            <option value="5">5 звёзд</option>
            <option value="4">4 звезды</option>
            <option value="3">3 звезды</option>
            <option value="2">2 звезды</option>
            <option value="1">1 звезда</option>
          </select>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filtered.map((review) => (
            <Card key={review.id} className="h-full hover:shadow-lg transition-shadow duration-300 border-0 shadow-md">
              <CardContent className="p-6 h-full flex flex-col">
                <div className="flex items-start justify-between mb-4">
                  <div className="flex items-center space-x-3">
                    <Avatar className="h-12 w-12">
                      <AvatarFallback className="bg-biosfera-primary text-white font-medium">
                        {review.avatar}
                      </AvatarFallback>
                    </Avatar>
                    <div>
                      <h4 className="font-medium text-gray-900 dark:text-white">
                        {review.name}
                      </h4>
                      <p className="text-sm text-gray-500 dark:text-gray-400">
                        {review.pet}
                      </p>
                    </div>
                  </div>
                  <div className="flex items-center space-x-1">
                    {renderStars(review.rating)}
                  </div>
                </div>
                <div className="flex-1">
                  <Quote className="h-6 w-6 text-biosfera-primary/30 mb-2" />
                  <p className="text-gray-600 dark:text-gray-300 leading-relaxed mb-4">
                    {review.text}
                  </p>
                </div>
                <div className="text-sm text-gray-500 dark:text-gray-400 text-right">
                  {review.date}
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </section>
  )
} 