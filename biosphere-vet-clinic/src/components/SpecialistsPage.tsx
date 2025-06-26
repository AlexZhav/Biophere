import React, { useState } from 'react'
import { Card, CardContent } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import specialists from './specialists-data'

const workplaces: string[] = Array.from(new Set(specialists.map(s => s.workplace).filter(Boolean)))

export default function SpecialistsPage() {
  const [search, setSearch] = useState('')
  const [specialization, setSpecialization] = useState('')
  const [workplace, setWorkplace] = useState('')
  const [position, setPosition] = useState('')

  const specializations: string[] = Array.from(new Set(specialists.map(s => s.specialization)))
  const positions: string[] = Array.from(new Set(specialists.map(s => s.position)))

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
            className="w-full px-6 py-3 border rounded-xl text-lg focus:outline-none focus:ring-2 focus:ring-biosphere-primary shadow-sm mb-4 bg-white dark:bg-gray-900 text-gray-900 dark:text-gray-100 placeholder-gray-400 dark:placeholder-gray-500 border-gray-300 dark:border-gray-700"
          />
          <div className="overflow-x-auto">
            <div className="flex flex-col sm:flex-row flex-wrap gap-3 items-stretch max-w-full min-w-[320px]">
              <select
                value={specialization}
                onChange={e => setSpecialization(e.target.value)}
                className="flex-1 min-w-[200px] px-4 py-2 border rounded-lg bg-white dark:bg-gray-900 text-gray-900 dark:text-gray-100 border-gray-300 dark:border-gray-700"
              >
                <option value="">Специализация</option>
                {specializations.map((spec: string) => (
                  <option key={spec} value={spec}>{spec}</option>
                ))}
              </select>
              <select
                value={position}
                onChange={e => setPosition(e.target.value)}
                className="flex-1 min-w-[200px] px-4 py-2 border rounded-lg bg-white dark:bg-gray-900 text-gray-900 dark:text-gray-100 border-gray-300 dark:border-gray-700"
              >
                <option value="">Должность</option>
                {positions.map((pos: string) => (
                  <option key={pos} value={pos}>{pos}</option>
                ))}
              </select>
              <select
                value={workplace}
                onChange={e => setWorkplace(e.target.value)}
                className="flex-1 min-w-[200px] px-4 py-2 border rounded-lg bg-white dark:bg-gray-900 text-gray-900 dark:text-gray-100 border-gray-300 dark:border-gray-700"
              >
                <option value="">Место работы</option>
                {workplaces.map((w: string) => (
                  <option key={w} value={w}>{w}</option>
                ))}
              </select>
              <button
                onClick={resetFilters}
                className="flex-1 min-w-[150px] px-4 py-2 rounded-lg border border-red-300 dark:border-red-600 text-red-600 dark:text-red-400 bg-red-50 dark:bg-red-900 hover:bg-red-100 dark:hover:bg-red-800 transition-colors text-sm font-medium"
                style={{ minWidth: 0 }}
              >
                Сбросить фильтры
              </button>
            </div>
          </div>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {filtered.map((specialist, idx) => (
            <Card key={specialist.name + String(idx)} className="group hover:shadow-xl transition-all duration-300 border-0 shadow-md">
              <CardContent className="p-6">
                <div className="text-center mb-6">
                  <div className="w-24 h-24 bg-gradient-to-br from-biosphere-primary to-biosphere-secondary rounded-full mx-auto mb-4 overflow-hidden">
                    <img 
                      src={specialist.photo.startsWith('/') ? specialist.photo : `/doctors/${specialist.photo}`}
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
                  <p className="text-sm text-biosphere-primary font-medium">
                    {specialist.specialization}
                  </p>
                </div>
                <div className="space-y-3 text-sm text-gray-600 dark:text-gray-300">
                  <div className="flex items-start">
                    <span className="font-semibold">Место работы:</span>
                    <span className="ml-2 leading-tight">{specialist.workplace}</span>
                  </div>
                  <div className="flex items-start">
                    <span className="font-semibold">Образование:</span>
                    <span className="ml-2 leading-tight">{specialist.education}</span>
                  </div>
                  {specialist.extra_qual && (
                    <div className="flex items-start">
                      <span className="font-semibold">Доп. квалификации:</span>
                      <span className="ml-2 leading-tight">{specialist.extra_qual}</span>
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
