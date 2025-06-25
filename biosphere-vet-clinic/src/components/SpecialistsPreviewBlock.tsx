import { Card, CardContent } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { Link } from 'react-router-dom'

const specialists = [
  {
    id: 1,
    name: 'Смирнова Анна Петровна',
    position: 'Главный ветеринарный врач',
    specialization: 'Терапия, диагностика',
    experience: '15 лет',
    education: 'КВИ, специальность "Ветеринария"',
    photo: '/images/specialists/doctor1.jpg',
    bio: 'Опытный специалист в области ветеринарной терапии и диагностики.',
  },
  {
    id: 2,
    name: 'Козлов Михаил Андреевич',
    position: 'Ветеринарный хирург',
    specialization: 'Хирургия, травматология',
    experience: '12 лет',
    education: 'МВА, кандидат ветеринарных наук',
    photo: '/images/specialists/doctor2.jpg',
    bio: 'Специализируется на сложных хирургических операциях.',
  },
  {
    id: 3,
    name: 'Волкова Елена Сергеевна',
    position: 'Ветеринарный дерматолог',
    specialization: 'Дерматология, аллергология',
    experience: '8 лет',
    education: 'СПбГВМ, специализация по дерматологии',
    photo: '/images/specialists/doctor3.webp',
    bio: 'Эксперт по кожным заболеваниям и аллергическим реакциям у животных.',
  },
  {
    id: 4,
    name: 'Петров Алексей Николаевич',
    position: 'Ветеринарный кардиолог',
    specialization: 'Кардиология, УЗИ диагностика',
    experience: '10 лет',
    education: 'МГАВМ, специализация по кардиологии',
    photo: '/images/specialists/doctor4.jpg',
    bio: 'Специалист по заболеваниям сердечно-сосудистой системы.',
  },
  {
    id: 5,
    name: 'Иванова Мария Викторовна',
    position: 'Ветеринарный офтальмолог',
    specialization: 'Офтальмология, микрохирургия глаза',
    experience: '7 лет',
    education: 'КазГВМ, постдипломное образование по офтальмологии',
    photo: '/images/specialists/doctor5.jpg',
    bio: 'Занимается лечением заболеваний глаз у животных.',
  },
  {
    id: 6,
    name: 'Соколов Дмитрий Павлович',
    position: 'Ветеринарный ортопед',
    specialization: 'Ортопедия, неврология',
    experience: '9 лет',
    education: 'УрГСХА, специализация по ортопедии',
    photo: '/images/specialists/doctor6.jpg',
    bio: 'Специализируется на лечении заболеваний опорно-двигательного аппарата.',
  },
]

export default function SpecialistsPreviewBlock() {
  return (
    <section id="main-specialists" className="py-16 bg-gradient-to-br from-white to-[#e3eaff] dark:bg-[#1f2937] dark:from-[#1f2937] dark:to-[#1f2937]">
      <div className="container mx-auto px-4">
        <h2 className="text-3xl md:text-4xl font-bold text-gray-900 dark:text-white mb-8 text-center">Наши лучшие специалисты</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {specialists.map((specialist) => (
            <Card key={specialist.id} className="group hover:shadow-xl transition-all duration-300 border-0 shadow-md">
              <CardContent className="p-6">
                <div className="text-center mb-6">
                  <div className="w-24 h-24 bg-gradient-to-br from-biosphere-primary to-biosphere-secondary rounded-full mx-auto mb-4 overflow-hidden">
                    <img 
                      src={specialist.photo} 
                      alt={specialist.name}
                      className="w-full h-full object-cover"
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
                  <div className="flex items-center">
                    <span className="font-semibold">Опыт:</span>
                    <span className="ml-2">{specialist.experience}</span>
                  </div>
                  <div className="flex items-start">
                    <span className="font-semibold">Место работы:</span>
                    <span className="ml-2 leading-tight">{specialist.education}</span>
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
        <div className="text-center mt-8">
          <Link to="/specialists-page" className="inline-block bg-biosphere-primary text-white px-6 py-3 rounded-lg font-medium shadow hover:bg-biosphere-secondary transition-colors">Смотреть всех специалистов</Link>
        </div>
      </div>
    </section>
  )
} 
