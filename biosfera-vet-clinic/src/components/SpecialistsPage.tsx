import React, { useState } from 'react'
import { Card, CardContent } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'

const specialists = [
  {
    id: 1,
    name: 'Смирнова Анна Петровна',
    position: 'Главный ветеринарный врач',
    specialization: 'Терапия, диагностика',
    experience: '15 лет',
    workplace: 'ул. Солнечная, 19Б',
    photo: '/images/specialists/doctor1.jpg',
    bio: 'Опытный специалист в области ветеринарной терапии и диагностики.',
  },
  {
    id: 2,
    name: 'Козлов Михаил Андреевич',
    position: 'Ветеринарный хирург',
    specialization: 'Хирургия, травматология',
    experience: '12 лет',
    workplace: 'ул. Московская, 4',
    photo: '/images/specialists/doctor2.jpg',
    bio: 'Специализируется на сложных хирургических операциях.',
  },
  {
    id: 3,
    name: 'Волкова Елена Сергеевна',
    position: 'Ветеринарный дерматолог',
    specialization: 'Дерматология, аллергология',
    experience: '8 лет',
    workplace: 'ул. Молодой Гвардии, 2Д, Нововятский район',
    photo: '/images/specialists/doctor3.webp',
    bio: 'Эксперт по кожным заболеваниям и аллергическим реакциям у животных.',
  },
  {
    id: 4,
    name: 'Петров Алексей Николаевич',
    position: 'Ветеринарный кардиолог',
    specialization: 'Кардиология, УЗИ диагностика',
    experience: '10 лет',
    workplace: 'пр-т Строителей, 9, корпус 1',
    photo: '/images/specialists/doctor4.jpg',
    bio: 'Специалист по заболеваниям сердечно-сосудистой системы.',
  },
  {
    id: 5,
    name: 'Иванова Мария Викторовна',
    position: 'Ветеринарный офтальмолог',
    specialization: 'Офтальмология, микрохирургия глаза',
    experience: '7 лет',
    workplace: 'ул. Чернышевского, 7',
    photo: '/images/specialists/doctor5.jpg',
    bio: 'Занимается лечением заболеваний глаз у животных.',
  },
  {
    id: 6,
    name: 'Соколов Дмитрий Павлович',
    position: 'Ветеринарный ортопед',
    specialization: 'Ортопедия, неврология',
    experience: '9 лет',
    workplace: 'ул. Украинская, 18',
    photo: '/images/specialists/doctor6.jpg',
    bio: 'Специализируется на лечении заболеваний опорно-двигательного аппарата.',
  },
]

const workplaces = [
  'ул. Солнечная, 19Б',
  'ул. Московская, 4',
  'ул. Молодой Гвардии, 2Д, Нововятский район',
  'пр-т Строителей, 9, корпус 1',
  'ул. Чернышевского, 7',
  'ул. Украинская, 18',
]

export default function SpecialistsPage() {
  const [search, setSearch] = useState('')
  const [specialization, setSpecialization] = useState('')
  const [workplace, setWorkplace] = useState('')
  const [position, setPosition] = useState('')

  const specializations = Array.from(new Set(specialists.map(s => s.specialization)))
  const positions = Array.from(new Set(specialists.map(s => s.position)))

  const filtered = specialists.filter(s => {
    const matchesSearch =
      s.name.toLowerCase().includes(search.toLowerCase()) ||
      s.specialization.toLowerCase().includes(search.toLowerCase()) ||
      s.position.toLowerCase().includes(search.toLowerCase())
    const matchesSpec = !specialization || s.specialization === specialization
    const matchesPos = !position || s.position === position
    const matchesWork = !workplace || s.workplace === workplace
    return matchesSearch && matchesSpec && matchesPos && matchesWork
  })

  const resetFilters = () => {
    setSpecialization('')
    setWorkplace('')
    setPosition('')
  }

  return (
    <section className="py-16 bg-gradient-to-br from-white to-[#e3eaff] dark:bg-[#1f2937] dark:from-[#1f2937] dark:to-[#1f2937] min-h-screen">
      <div className="container mx-auto px-4">
        <div className="mb-8">
          <input
            type="text"
            placeholder="Поиск по имени, специализации, должности, месту работы..."
            value={search}
            onChange={e => setSearch(e.target.value)}
            className="w-full px-6 py-3 border rounded-xl text-lg focus:outline-none focus:ring-2 focus:ring-biosfera-primary shadow-sm mb-4 bg-white dark:bg-gray-900 text-gray-900 dark:text-gray-100 placeholder-gray-400 dark:placeholder-gray-500 border-gray-300 dark:border-gray-700"
          />
          <div className="flex flex-col md:flex-row gap-3 items-stretch">
            <select
              value={specialization}
              onChange={e => setSpecialization(e.target.value)}
              className="flex-1 px-4 py-2 border rounded-lg bg-white dark:bg-gray-900 text-gray-900 dark:text-gray-100 border-gray-300 dark:border-gray-700"
            >
              <option value="">Специализация</option>
              {specializations.map(spec => (
                <option key={spec} value={spec}>{spec}</option>
              ))}
            </select>
            <select
              value={position}
              onChange={e => setPosition(e.target.value)}
              className="flex-1 px-4 py-2 border rounded-lg bg-white dark:bg-gray-900 text-gray-900 dark:text-gray-100 border-gray-300 dark:border-gray-700"
            >
              <option value="">Должность</option>
              {positions.map(pos => (
                <option key={pos} value={pos}>{pos}</option>
              ))}
            </select>
            <select
              value={workplace}
              onChange={e => setWorkplace(e.target.value)}
              className="flex-1 px-4 py-2 border rounded-lg bg-white dark:bg-gray-900 text-gray-900 dark:text-gray-100 border-gray-300 dark:border-gray-700"
            >
              <option value="">Место работы</option>
              {workplaces.map(w => (
                <option key={w} value={w}>{w}</option>
              ))}
            </select>
            <button
              onClick={resetFilters}
              className="flex-1 px-4 py-2 rounded-lg border border-red-300 dark:border-red-600 text-red-600 dark:text-red-400 bg-red-50 dark:bg-red-900 hover:bg-red-100 dark:hover:bg-red-800 transition-colors text-sm font-medium"
              style={{ minWidth: 0 }}
            >
              Сбросить фильтры
            </button>
          </div>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {filtered.map((specialist) => (
            <Card key={specialist.id} className="group hover:shadow-xl transition-all duration-300 border-0 shadow-md">
              <CardContent className="p-6">
                <div className="text-center mb-6">
                  <div className="w-24 h-24 bg-gradient-to-br from-biosfera-primary to-biosfera-secondary rounded-full mx-auto mb-4 overflow-hidden">
                    <img 
                      src={specialist.photo} 
                      alt={specialist.name}
                      className="w-full h-full object-cover"
                      onError={(e) => {
                        e.currentTarget.style.display = 'none'
                        e.currentTarget.parentElement?.classList.add('flex', 'items-center', 'justify-center')
                        const fallback = document.createElement('div')
                        fallback.innerHTML = `<svg class=\"h-12 w-12 text-white\" fill=\"currentColor\" viewBox=\"0 0 24 24\"><path d=\"M19 3H5c-1.1 0-2 .9-2 2v14c0 1.1.9 2 2 2h14c1.1 0 2-.9 2-2V5c0-1.1-.9-2-2-2zM9 17H7v-7h2v7zm4 0h-2V7h2v10zm4 0h-2v-4h2v4z\"/></svg>`
                        e.currentTarget.parentElement?.appendChild(fallback)
                      }}
                    />
                  </div>
                  <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-2">
                    {specialist.name}
                  </h3>
                  <Badge variant="secondary" className="mb-2">
                    {specialist.position}
                  </Badge>
                  <p className="text-sm text-biosfera-primary font-medium">
                    {specialist.specialization}
                  </p>
                </div>
                <div className="space-y-3 text-sm text-gray-600 dark:text-gray-300">
                  <div className="flex items-center">
                    <span className="font-semibold">Опыт:</span>
                    <span className="ml-2">{specialist.experience}</span>
                  </div>
                  <div className="flex items-start">
                    <span className="font-semibold">Место работы:</span>
                    <span className="ml-2 leading-tight">{specialist.workplace}</span>
                  </div>
                </div>
                <div className="mt-4 pt-4 border-t border-gray-200 dark:border-gray-700">
                  <p className="text-sm text-gray-600 dark:text-gray-300 leading-relaxed">
                    {specialist.bio}
                  </p>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </section>
  )
} 