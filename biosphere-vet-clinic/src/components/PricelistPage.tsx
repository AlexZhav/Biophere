import { Card, CardContent } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { DollarSign } from 'lucide-react'
import { Footer } from './Footer'

const allServices = [
  { name: 'Первичный прием', price: 'от 800', description: 'Осмотр и консультация врача' },
  { name: 'УЗИ брюшной полости', price: 'от 1200', description: 'Ультразвуковое исследование' },
  { name: 'Вакцинация комплексная', price: 'от 1200', description: 'Прививка от основных болезней' },
  { name: 'Кастрация кота', price: 'от 2500', description: 'Плановая операция' },
  { name: 'Санация ротовой полости', price: 'от 2000', description: 'Чистка зубов' },
  { name: 'Анализ крови общий', price: 'от 800', description: 'Клинический анализ' },
  { name: 'Удаление новообразований', price: 'от 3000', description: 'В зависимости от сложности' },
  { name: 'Чипирование', price: '1500', description: 'Электронная идентификация' },
]

export default function PricelistPage() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-[#f8fafc] to-[#e6f9ef] dark:from-[#1f2937] dark:to-[#1f2937] text-foreground flex flex-col">
      <main className="flex-1 py-12">
        <div className="container mx-auto px-4">
          <div className="text-center mb-8">
            <div className="inline-flex items-center justify-center w-16 h-16 bg-biosphere-warm/10 rounded-full mb-4">
              <DollarSign className="h-8 w-8 text-biosphere-warm" />
            </div>
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 dark:text-white mb-4">Полный прейскурант услуг</h2>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-8">
            {allServices.map((service, idx) => (
              <Card key={idx} className="h-full hover:shadow-lg transition-shadow duration-300 border-0 shadow-md">
                <CardContent className="p-6">
                  <h4 className="font-medium text-gray-900 dark:text-white text-lg mb-2">{service.name}</h4>
                  <p className="text-sm text-gray-600 dark:text-gray-400 mb-2">{service.description}</p>
                  <Badge variant="secondary" className="font-mono text-biosphere-primary">{service.price} ₽</Badge>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </main>
      <Footer />
    </div>
  )
} 
