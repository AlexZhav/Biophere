import React, { useState, useEffect } from 'react'
import { Card, CardContent } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import specialists from './specialists-data'
import {
  DropdownMenu,
  DropdownMenuTrigger,
  DropdownMenuContent,
  DropdownMenuCheckboxItem,
} from '@/components/ui/dropdown-menu'
import { Button } from '@/components/ui/button'
import { ChevronDown } from 'lucide-react'

// Получаем уникальные специализации (разбиваем по запятым)
const allSpecs = Array.from(
  new Set(
    specialists
      .flatMap(s => s.specialization.split(',').map(x => x.trim()))
      .filter(Boolean)
  )
)
// Получаем уникальные места работы (разбиваем по запятым и по адресам)
const allWorkplaces = Array.from(
  new Set(
    specialists
      .flatMap(s => s.workplace.split(',').map(x => x.trim()))
      .filter(Boolean)
      .filter(w => !/^д\s*\d+$/i.test(w) && !/^у д \d+$/i.test(w) && w.length > 5)
  )
)
const positions = Array.from(new Set(specialists.map(s => s.position)))

export default function SpecialistsPage() {
  const [search, setSearch] = useState('')
  const [selectedSpecs, setSelectedSpecs] = useState<string[]>([])
  const [selectedWorkplaces, setSelectedWorkplaces] = useState<string[]>([])
  const [selectedPosition, setSelectedPosition] = useState<string>('')
  const [showScrollTop, setShowScrollTop] = useState(false)

  const handleSpecChange = (spec: string) => {
    setSelectedSpecs(prev =>
      prev.includes(spec) ? prev.filter(s => s !== spec) : [...prev, spec]
    )
  }
  const handleWorkplaceChange = (work: string) => {
    setSelectedWorkplaces(prev =>
      prev.includes(work) ? prev.filter(w => w !== work) : [...prev, work]
    )
  }
  const handlePositionChange = (pos: string) => {
    setSelectedPosition(prev => (prev === pos ? '' : pos))
  }

  const filtered = specialists.filter(s => {
    const matchesSearch =
      s.name.toLowerCase().includes(search.toLowerCase()) ||
      s.specialization.toLowerCase().includes(search.toLowerCase()) ||
      s.position.toLowerCase().includes(search.toLowerCase())
    const specArr = s.specialization.split(',').map(x => x.trim())
    const workArr = s.workplace.split(',').map(x => x.trim())
    const matchesSpec =
      selectedSpecs.length === 0 || selectedSpecs.some(spec => specArr.includes(spec))
    const matchesWork =
      selectedWorkplaces.length === 0 || selectedWorkplaces.some(w => workArr.includes(w))
    const matchesPos = !selectedPosition || s.position === selectedPosition
    return matchesSearch && matchesSpec && matchesWork && matchesPos
  })

  const resetFilters = () => {
    setSelectedSpecs([])
    setSelectedWorkplaces([])
    setSelectedPosition('')
  }

  const filterBtnClass =
    'inline-flex items-center justify-center gap-2 whitespace-nowrap text-sm font-medium transition-colors focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-zinc-950 disabled:pointer-events-none disabled:opacity-50 [&_svg]:pointer-events-none [&_svg]:size-4 [&_svg]:shrink-0 dark:focus-visible:ring-zinc-300 shadow-sm hover:bg-zinc-100 hover:text-zinc-900 dark:hover:bg-zinc-800 dark:hover:text-zinc-50 h-9 flex-1 min-w-[200px] px-4 py-2 border rounded-lg bg-white dark:bg-gray-900 text-gray-900 dark:text-gray-100 border-gray-300 dark:border-gray-700'

  useEffect(() => {
    const onScroll = () => setShowScrollTop(window.scrollY > 100)
    window.addEventListener('scroll', onScroll)
    return () => window.removeEventListener('scroll', onScroll)
  }, [])
  const scrollToTop = () => window.scrollTo({ top: 0, behavior: 'smooth' })

  return (
    <>
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
                {/* Фильтр по специализациям */}
                <DropdownMenu>
                  <DropdownMenuTrigger asChild>
                    <Button variant="outline" className={filterBtnClass}>
                      {selectedSpecs.length > 0
                        ? `Специализация: ${selectedSpecs.join(', ')}`
                        : 'Специализация'}
                      <ChevronDown className="h-4 w-4 opacity-50 ml-2" />
                    </Button>
                  </DropdownMenuTrigger>
                  <DropdownMenuContent className="max-h-72 overflow-y-auto">
                    {allSpecs.map((spec: string) => (
                      <DropdownMenuCheckboxItem
                        key={spec}
                        checked={selectedSpecs.includes(spec)}
                        onCheckedChange={() => handleSpecChange(spec)}
                        onSelect={e => e.preventDefault()}
                      >
                        {spec}
                      </DropdownMenuCheckboxItem>
                    ))}
                  </DropdownMenuContent>
                </DropdownMenu>
                {/* Фильтр по должности (одиночный выбор, современный стиль) */}
                <DropdownMenu>
                  <DropdownMenuTrigger asChild>
                    <Button variant="outline" className={filterBtnClass}>
                      {selectedPosition
                        ? `Должность: ${selectedPosition}`
                        : 'Должность'}
                      <ChevronDown className="h-4 w-4 opacity-50 ml-2" />
                    </Button>
                  </DropdownMenuTrigger>
                  <DropdownMenuContent className="max-h-72 overflow-y-auto">
                    {positions.map((pos: string) => (
                      <DropdownMenuCheckboxItem
                        key={pos}
                        checked={selectedPosition === pos}
                        onCheckedChange={() => handlePositionChange(pos)}
                        onSelect={e => e.preventDefault()}
                      >
                        {pos}
                      </DropdownMenuCheckboxItem>
                    ))}
                  </DropdownMenuContent>
                </DropdownMenu>
                {/* Фильтр по месту работы */}
                <DropdownMenu>
                  <DropdownMenuTrigger asChild>
                    <Button variant="outline" className={filterBtnClass}>
                      {selectedWorkplaces.length > 0
                        ? `Место работы: ${selectedWorkplaces.join(', ')}`
                        : 'Место работы'}
                      <ChevronDown className="h-4 w-4 opacity-50 ml-2" />
                    </Button>
                  </DropdownMenuTrigger>
                  <DropdownMenuContent className="max-h-72 overflow-y-auto">
                    {allWorkplaces.map((work: string) => (
                      <DropdownMenuCheckboxItem
                        key={work}
                        checked={selectedWorkplaces.includes(work)}
                        onCheckedChange={() => handleWorkplaceChange(work)}
                        onSelect={e => e.preventDefault()}
                      >
                        {work}
                      </DropdownMenuCheckboxItem>
                    ))}
                  </DropdownMenuContent>
                </DropdownMenu>
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
      {/* Кнопка "Вверх" */}
      {showScrollTop && (
        <button
          className="fixed z-50 right-6 bottom-24 md:bottom-32 w-12 h-12 rounded-full flex items-center justify-center shadow-lg transition-colors bg-white dark:bg-gray-800 text-biosphere-primary dark:text-biosphere-secondary border border-gray-200 dark:border-gray-700 hover:bg-biosphere-primary hover:text-white dark:hover:bg-biosphere-secondary dark:hover:text-white"
          title="Вверх"
          onClick={scrollToTop}
        >
          <svg className="w-6 h-6" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" d="M5 15l7-7 7 7"></path></svg>
        </button>
      )}
    </>
  )
} 
