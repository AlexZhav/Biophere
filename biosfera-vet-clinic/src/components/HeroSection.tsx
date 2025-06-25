import React, { useState } from 'react'
import { Button } from '@/components/ui/button'
import { Card, CardContent } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { 
  Heart, 
  Shield, 
  Clock, 
  MapPin, 
  Phone, 
  Stethoscope,
  Award,
  Users,
  Calendar,
  Star,
  FlaskConical
} from 'lucide-react'
import { BookingModal } from './BookingModal'

export function HeroSection() {
  const [isBookingOpen, setIsBookingOpen] = useState(false)

  const features = [
    {
      icon: <Clock className="h-6 w-6" />,
      title: 'Работаем 24/7',
      description: 'Круглосуточная помощь вашим питомцам',
    },
    {
      icon: <Shield className="h-6 w-6" />,
      title: 'Современное оборудование',
      description: 'Новейшие технологии диагностики',
    },
    {
      icon: <Heart className="h-6 w-6" />,
      title: 'Опытные врачи',
      description: 'Более 50 специалистов',
    },
    {
      icon: <MapPin className="h-6 w-6" />,
      title: '6 филиалов',
      description: 'Удобное расположение по городу',
    },
  ]

  const stats = [
    { number: '20+', label: 'лет работы', icon: <Award className="h-5 w-5" /> },
    { number: '4.9', label: 'Рейтинг', icon: <Star className="h-5 w-5" /> },
    { number: '50+', label: 'специалистов', icon: <Stethoscope className="h-5 w-5" /> },
    { number: '20+', label: 'видов анализов', icon: <FlaskConical className="h-5 w-5" /> },
  ]

  return (
    <>
      <section id="home" className="relative min-h-screen flex items-center bg-gradient-to-br from-blue-50 via-white to-green-50 dark:from-gray-900 dark:via-gray-800 dark:to-gray-900 overflow-hidden">
        {/* Background decoration */}
        <div className="absolute inset-0 opacity-5">
          <div className="absolute top-10 left-10 w-72 h-72 bg-biosfera-primary rounded-full mix-blend-multiply filter blur-xl animate-blob"></div>
          <div className="absolute top-10 right-10 w-72 h-72 bg-biosfera-secondary rounded-full mix-blend-multiply filter blur-xl animate-blob animation-delay-2000"></div>
          <div className="absolute -bottom-8 left-20 w-72 h-72 bg-biosfera-accent rounded-full mix-blend-multiply filter blur-xl animate-blob animation-delay-4000"></div>
        </div>

        <div className="container mx-auto px-4 py-20 relative z-10">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            {/* Left column - Text content */}
            <div className="space-y-8">
              <div className="space-y-6">
                <Badge variant="secondary" className="w-fit bg-biosfera-primary/10 text-biosfera-primary border-biosfera-primary/20">
                  <Heart className="h-3 w-3 mr-1" />
                  Ветеринарная клиника №1 в Кирове
                </Badge>
                
                <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold leading-tight">
                  <span className="text-transparent bg-clip-text" style={{ background: 'linear-gradient(to right, rgb(2, 133, 162), rgb(76, 175, 80))', WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent' }}>
                    Биосфера
                  </span>
                </h1>
                <div className="text-2xl md:text-3xl font-semibold text-gray-800 dark:text-gray-200">
                  Ветеринарная клиника, которой доверяют
                </div>
              </div>

              <div className="flex flex-col sm:flex-row gap-4">
                <Button
                  size="lg"
                  onClick={() => setIsBookingOpen(true)}
                  className="bg-gradient-to-r from-biosfera-primary to-biosfera-secondary hover:shadow-lg transition-all duration-300 text-white px-8 py-6 text-lg"
                >
                  <Calendar className="h-5 w-5 mr-2" />
                  Записаться онлайн
                </Button>
              </div>

              {/* Stats */}
              <div className="grid grid-cols-2 md:grid-cols-4 gap-4 pt-8">
                {stats.map((stat, index) => (
                  <div key={index} className="text-center p-4 rounded-lg bg-white/50 dark:bg-gray-800/50 backdrop-blur-sm">
                    <div className="flex items-center justify-center mb-2 text-biosfera-primary">
                      {stat.icon}
                    </div>
                    <div className="font-bold text-2xl text-gray-900 dark:text-white">
                      {stat.number}
                    </div>
                    <div className="text-sm text-gray-600 dark:text-gray-300">
                      {stat.label}
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Right column - Features cards */}
            <div className="space-y-6">
              {features.map((feature, index) => (
                <Card key={index} className="group hover:shadow-xl transition-all duration-300 border-0 shadow-md bg-white/80 dark:bg-gray-800/80 backdrop-blur-sm">
                  <CardContent className="p-6">
                    <div className="flex items-start space-x-4">
                      <div className="flex-shrink-0 w-12 h-12 bg-gradient-to-br from-biosfera-primary to-biosfera-secondary rounded-lg flex items-center justify-center text-white group-hover:scale-110 transition-transform duration-300">
                        {feature.icon}
                      </div>
                      <div className="flex-1">
                        <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-2">
                          {feature.title}
                        </h3>
                        <p className="text-gray-600 dark:text-gray-300">
                          {feature.description}
                        </p>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              ))}

              {/* Emergency Contact Card */}
              <Card className="bg-gradient-to-r from-red-500 to-red-600 text-white border-0">
                <CardContent className="p-6">
                  <div className="flex items-center space-x-4">
                    <div className="flex-shrink-0">
                      <Phone className="h-8 w-8" />
                    </div>
                    <div>
                      <div className="text-2xl font-bold mb-1">Работаем круглосуточно</div>
                      <div className="text-lg mb-1">пр-т Строителей, 9, корпус 1</div>
                      <div className="text-xl font-bold">44-37-97</div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>
          </div>
        </div>
      </section>

      <BookingModal isOpen={isBookingOpen} onClose={() => setIsBookingOpen(false)} />
    </>
  )
}
