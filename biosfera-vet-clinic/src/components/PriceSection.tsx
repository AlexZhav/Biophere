import React from 'react'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { Button } from '@/components/ui/button'
import { Separator } from '@/components/ui/separator'
import { DollarSign, FileText, Phone } from 'lucide-react'

const priceCategories = [
  {
    id: 1,
    title: 'Консультации и осмотры',
    icon: '🩺',
    services: [
      { name: 'Первичный прием', price: 'от 800', description: 'Осмотр и консультация врача' },
      { name: 'Повторный прием', price: 'от 600', description: 'Контрольный осмотр' },
      { name: 'Консультация по телефону', price: '300', description: 'Телефонная консультация' },
    ],
  },
  {
    id: 2,
    title: 'Диагностика',
    icon: '🔬',
    services: [
      { name: 'УЗИ брюшной полости', price: 'от 1200', description: 'Ультразвуковое исследование' },
      { name: 'Рентгенография', price: 'от 1000', description: 'Рентгеновский снимок' },
      { name: 'Анализ крови общий', price: 'от 800', description: 'Клинический анализ' },
      { name: 'Биохимический анализ', price: 'от 1500', description: 'Расширенная диагностика' },
    ],
  },
  {
    id: 3,
    title: 'Лечебные процедуры',
    icon: '💉',
    services: [
      { name: 'Инъекция подкожная', price: '200', description: 'Введение лекарственного препарата' },
      { name: 'Инъекция внутримышечная', price: '250', description: 'Внутримышечное введение' },
      { name: 'Капельница', price: 'от 800', description: 'Внутривенное вливание' },
      { name: 'Обработка ран', price: 'от 500', description: 'Хирургическая обработка' },
    ],
  },
  {
    id: 4,
    title: 'Хирургия',
    icon: '🔪',
    services: [
      { name: 'Кастрация кота', price: 'от 2500', description: 'Плановая операция' },
      { name: 'Стерилизация кошки', price: 'от 4000', description: 'Полостная операция' },
      { name: 'Удаление новообразований', price: 'от 3000', description: 'В зависимости от сложности' },
      { name: 'Остеосинтез', price: 'от 15000', description: 'Операция при переломах' },
    ],
  },
  {
    id: 5,
    title: 'Профилактика',
    icon: '🛡️',
    services: [
      { name: 'Вакцинация комплексная', price: 'от 1200', description: 'Прививка от основных болезней' },
      { name: 'Обработка от паразитов', price: 'от 400', description: 'Антипаразитарная обработка' },
      { name: 'Чипирование', price: '1500', description: 'Электронная идентификация' },
      { name: 'Оформление паспорта', price: '300', description: 'Ветеринарный паспорт' },
    ],
  },
  {
    id: 6,
    title: 'Стоматология',
    icon: '🦷',
    services: [
      { name: 'Санация ротовой полости', price: 'от 2000', description: 'Чистка зубов' },
      { name: 'Удаление зуба', price: 'от 800', description: 'Экстракция зуба' },
      { name: 'Лечение пародонтита', price: 'от 1500', description: 'Лечение десен' },
      { name: 'Полировка зубов', price: 'от 1000', description: 'Профессиональная чистка' },
    ],
  },
]

export function PriceSection() {
  return (
    <section id="prices" className="py-16 bg-white dark:bg-gray-900">
      <div className="container mx-auto px-4">
        <div className="text-center mb-12">
          <div className="inline-flex items-center justify-center w-16 h-16 bg-biosfera-warm/10 rounded-full mb-4">
            <DollarSign className="h-8 w-8 text-biosfera-warm" />
          </div>
          <h2 className="text-3xl md:text-4xl font-bold text-gray-900 dark:text-white mb-4">
            Прейскурант услуг
          </h2>
          <p className="text-lg text-gray-600 dark:text-gray-300 max-w-2xl mx-auto">
            Прозрачные цены на все виды ветеринарных услуг. Окончательная стоимость определяется после осмотра
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-12">
          {priceCategories.map((category) => (
            <Card key={category.id} className="h-full hover:shadow-lg transition-shadow duration-300">
              <CardHeader className="text-center pb-4">
                <div className="text-4xl mb-2">{category.icon}</div>
                <CardTitle className="text-xl text-gray-900 dark:text-white">
                  {category.title}
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                {category.services.map((service, index) => (
                  <div key={index} className="space-y-2">
                    <div className="flex justify-between items-start">
                      <div className="flex-1">
                        <h4 className="font-medium text-gray-900 dark:text-white text-sm">
                          {service.name}
                        </h4>
                        <p className="text-xs text-gray-600 dark:text-gray-400">
                          {service.description}
                        </p>
                      </div>
                      <Badge variant="secondary" className="ml-2 font-mono text-biosfera-primary">
                        {service.price} ₽
                      </Badge>
                    </div>
                    {index < category.services.length - 1 && (
                      <Separator className="opacity-50" />
                    )}
                  </div>
                ))}
              </CardContent>
            </Card>
          ))}
        </div>
        <div className="text-center mt-8">
          <a href="/pricelist" className="inline-block px-8 py-4 bg-biosfera-primary text-white rounded-lg text-lg font-semibold shadow hover:bg-biosfera-primary/90 transition-colors">
            Полный прейскурант
          </a>
        </div>
      </div>
    </section>
  )
}
