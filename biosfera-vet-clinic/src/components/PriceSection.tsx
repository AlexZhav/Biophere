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

        {/* Important Information */}
        <div className="bg-gradient-to-r from-biosfera-primary/5 to-biosfera-secondary/5 rounded-xl p-8 mb-8">
          <div className="text-center mb-6">
            <h3 className="text-2xl font-semibold text-gray-900 dark:text-white mb-4">
              Важная информация
            </h3>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 text-sm text-gray-600 dark:text-gray-300">
            <div className="space-y-3">
              <div className="flex items-start">
                <div className="w-2 h-2 bg-biosfera-primary rounded-full mt-2 mr-3 flex-shrink-0"></div>
                <p>Указанные цены являются базовыми и могут изменяться в зависимости от сложности случая</p>
              </div>
              <div className="flex items-start">
                <div className="w-2 h-2 bg-biosfera-primary rounded-full mt-2 mr-3 flex-shrink-0"></div>
                <p>Окончательная стоимость определяется после осмотра животного врачом</p>
              </div>
              <div className="flex items-start">
                <div className="w-2 h-2 bg-biosfera-primary rounded-full mt-2 mr-3 flex-shrink-0"></div>
                <p>Цены на лекарственные препараты рассчитываются отдельно</p>
              </div>
            </div>
            <div className="space-y-3">
              <div className="flex items-start">
                <div className="w-2 h-2 bg-biosfera-secondary rounded-full mt-2 mr-3 flex-shrink-0"></div>
                <p>Действуют скидки для постоянных клиентов и владельцев нескольких животных</p>
              </div>
              <div className="flex items-start">
                <div className="w-2 h-2 bg-biosfera-secondary rounded-full mt-2 mr-3 flex-shrink-0"></div>
                <p>Возможна оплата наличными и банковскими картами</p>
              </div>
              <div className="flex items-start">
                <div className="w-2 h-2 bg-biosfera-secondary rounded-full mt-2 mr-3 flex-shrink-0"></div>
                <p>Предоставляется рассрочка на дорогостоящие операции</p>
              </div>
            </div>
          </div>
        </div>

        {/* Contact for Pricing */}
        <div className="text-center">
          <div className="bg-white dark:bg-gray-800 rounded-lg p-8 max-w-2xl mx-auto shadow-sm border">
            <FileText className="h-12 w-12 text-biosfera-primary mx-auto mb-4" />
            <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-4">
              Нужна точная стоимость?
            </h3>
            <p className="text-gray-600 dark:text-gray-300 mb-6">
              Для получения точной стоимости услуг свяжитесь с нашими администраторами или запишитесь на консультацию
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button className="bg-biosfera-primary hover:bg-biosfera-primary/90">
                <Phone className="h-4 w-4 mr-2" />
                Позвонить
              </Button>
              <Button variant="outline" className="border-biosfera-secondary text-biosfera-secondary hover:bg-biosfera-secondary/10">
                Записаться на прием
              </Button>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
