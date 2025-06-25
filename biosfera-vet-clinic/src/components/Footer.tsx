import React from 'react'
import { Separator } from '@/components/ui/separator'
import { Button } from '@/components/ui/button'
import { 
  MapPin, 
  Phone, 
  Mail, 
  Clock, 
  Heart,
  Instagram,
  MessageCircle
} from 'lucide-react'

const branches = [
  'Россия, г. Киров, ул. Солнечная, 19Б',
  'ул. Московская, 4',
  'ул. Молодой Гвардии, 2Д, Нововятский район',
  'пр-т Строителей, 9, корпус 1',
  'ул. Чернышевского, 7',
  'ул. Украинская, 18',
]

export function Footer() {
  const currentYear = new Date().getFullYear()

  const handleBranchClick = (branch: string) => {
    const encodedAddress = encodeURIComponent(branch)
    window.open(`https://maps.google.com/?q=${encodedAddress}`, '_blank')
  }

  return (
    <footer className="bg-white dark:bg-gray-900 text-black dark:text-white">
      <div className="container mx-auto px-4 py-12">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {/* Company Info */}
          <div className="space-y-4">
            <div className="flex items-center space-x-2">
              <Heart className="h-6 w-6 text-biosfera-secondary" />
              <h3 className="text-2xl font-bold text-black dark:text-white">Биосфера</h3>
            </div>
            <p className="text-gray-700 dark:text-gray-300 leading-relaxed">
              Современная ветеринарная клиника, обеспечивающая качественную медицинскую помощь домашним животным с 2009 года.
            </p>
            <div className="flex space-x-4">
              <a 
                href="https://vk.com/biosre" 
                target="_blank" 
                rel="noopener noreferrer"
                className="w-10 h-10 bg-[#4680C2] rounded-lg flex items-center justify-center hover:bg-[#4680C2]/80 transition-colors"
                aria-label="ВКонтакте"
              >
                <svg className="w-5 h-5 text-white" viewBox="0 0 24 24" fill="currentColor">
                  <path d="M15.684 0H8.316C1.592 0 0 1.592 0 8.316v7.368C0 22.408 1.592 24 8.316 24h7.368C22.408 24 24 22.408 24 15.684V8.316C24 1.592 22.408 0 15.684 0zm3.692 17.123h-1.744c-.66 0-.864-.525-2.05-1.723-1.033-1.01-1.49-.864-1.49.525v1.09c0 .295-.095.525-.936.525-1.876 0-3.965-1.132-5.427-3.243-2.214-3.154-2.82-5.532-2.82-6.024 0-.525.17-.76.695-.76h1.744c.52 0 .717.227.918.76.99 2.395 2.681 4.49 3.369 4.49.263 0 .379-.12.379-.78V9.806c-.09-1.433-.84-1.55-.84-2.063 0-.43.346-.863 1.11-.863h2.745c.46 0 .627.25.627.745v4.436c0 .456.205.658.53.658.263 0 .718-.202 1.745-1.76 1.033-1.558 1.795-3.532 1.795-3.532.133-.295.34-.525.863-.525h1.744c.695 0 .84.357.695.863-.315 1.183-2.05 3.925-2.05 3.925-.24.338-.33.506 0 .863 1.26 1.342 2.708 2.397 2.708 3.183 0 .525-.43.863-1.18.863z"/>
                </svg>
              </a>
              <Button
                variant="outline"
                size="sm"
                className="w-10 h-10 p-0 border-gray-300 dark:border-gray-600 hover:bg-gray-100 dark:hover:bg-gray-800"
                asChild
              >
                <a href="https://instagram.com" target="_blank" rel="noopener noreferrer" aria-label="Instagram">
                  <Instagram className="h-5 w-5 text-[#E4405F] dark:text-white" />
                </a>
              </Button>
              <Button
                variant="outline"
                size="sm"
                className="w-10 h-10 p-0 border-gray-300 dark:border-gray-600 hover:bg-gray-100 dark:hover:bg-gray-800"
                asChild
              >
                <a href="https://t.me/biosfera_vet" target="_blank" rel="noopener noreferrer" aria-label="Telegram">
                  <MessageCircle className="h-5 w-5 text-[#229ED9] dark:text-white" />
                </a>
              </Button>
            </div>
          </div>

          {/* Contact Info */}
          <div className="space-y-4">
            <h4 className="text-lg font-semibold text-black dark:text-white">Контакты</h4>
            <div className="space-y-3">
              <div className="flex items-start space-x-3">
                <Phone className="h-5 w-5 text-biosfera-secondary mt-0.5 flex-shrink-0" />
                <div>
                  <p className="text-gray-700 dark:text-gray-300">Главный офис:</p>
                  <a href="tel:+78332123456" className="text-black dark:text-white hover:text-biosfera-secondary transition-colors">
                    +7 (8332) 12-34-56
                  </a>
                </div>
              </div>
              <div className="flex items-start space-x-3">
                <Phone className="h-5 w-5 text-biosfera-secondary mt-0.5 flex-shrink-0" />
                <div>
                  <p className="text-gray-700 dark:text-gray-300">Экстренная помощь 24/7:</p>
                  <a href="tel:+78332654321" className="text-black dark:text-white hover:text-biosfera-secondary transition-colors">
                    +7 (8332) 65-43-21
                  </a>
                </div>
              </div>
              <div className="flex items-start space-x-3">
                <Mail className="h-5 w-5 text-biosfera-secondary mt-0.5 flex-shrink-0" />
                <div>
                  <a href="mailto:info@biosfera-kirov.ru" className="text-black dark:text-white hover:text-biosfera-secondary transition-colors">
                    info@biosfera-kirov.ru
                  </a>
                </div>
              </div>
              <div className="flex items-start space-x-3">
                <Clock className="h-5 w-5 text-biosfera-secondary mt-0.5 flex-shrink-0" />
                <div>
                  <p className="text-gray-700 dark:text-gray-300">Режим работы:</p>
                  <p className="text-black dark:text-white">Ежедневно 8:00 - 22:00</p>
                  <p className="text-biosfera-secondary text-sm">Экстренная помощь 24/7</p>
                </div>
              </div>
            </div>
          </div>

          {/* Branches */}
          <div className="space-y-4">
            <h4 className="text-lg font-semibold text-black dark:text-white">Наши филиалы</h4>
            <div className="space-y-2">
              {branches.slice(0, 4).map((branch, index) => (
                <button
                  key={index}
                  onClick={() => handleBranchClick(branch)}
                  className="flex items-start space-x-2 text-left hover:text-biosfera-secondary transition-colors group"
                >
                  <MapPin className="h-4 w-4 text-biosfera-secondary mt-0.5 flex-shrink-0 group-hover:scale-110 transition-transform" />
                  <span className="text-sm text-gray-700 dark:text-gray-300 group-hover:text-black dark:group-hover:text-white">{branch}</span>
                </button>
              ))}
              <button
                onClick={() => branches.slice(4).forEach(branch => handleBranchClick(branch))}
                className="text-sm text-biosfera-secondary hover:text-biosfera-accent transition-colors"
              >
                + еще {branches.length - 4} филиала
              </button>
            </div>
          </div>

          {/* Services */}
          <div className="space-y-4">
            <h4 className="text-lg font-semibold text-black dark:text-white">Услуги</h4>
            <div className="space-y-2 text-sm text-gray-700 dark:text-gray-300">
              <div className="hover:text-biosfera-secondary dark:hover:text-white transition-colors cursor-pointer">Терапия</div>
              <div className="hover:text-biosfera-secondary dark:hover:text-white transition-colors cursor-pointer">Хирургия</div>
              <div className="hover:text-biosfera-secondary dark:hover:text-white transition-colors cursor-pointer">Диагностика</div>
              <div className="hover:text-biosfera-secondary dark:hover:text-white transition-colors cursor-pointer">Профилактика</div>
              <div className="hover:text-biosfera-secondary dark:hover:text-white transition-colors cursor-pointer">Стоматология</div>
              <div className="hover:text-biosfera-secondary dark:hover:text-white transition-colors cursor-pointer">Экстренная помощь</div>
            </div>
          </div>
        </div>

        <Separator className="my-8 bg-gray-200 dark:bg-gray-700" />

        {/* Bottom section */}
        <div className="flex flex-col md:flex-row justify-between items-center space-y-4 md:space-y-0">
          <div className="text-sm text-gray-700 dark:text-gray-400">
            <p>© {currentYear} Ветеринарная клиника "Биосфера". Все права защищены.</p>
            <p className="mt-1">Лицензия на ветеринарную деятельность № ВЕТ-43-001234 от 15.03.2020</p>
          </div>
          <div className="flex space-x-6 text-sm">
            <a href="#" className="text-gray-700 dark:text-gray-400 hover:text-biosfera-secondary dark:hover:text-white transition-colors">
              Политика конфиденциальности
            </a>
            <a href="#" className="text-gray-700 dark:text-gray-400 hover:text-biosfera-secondary dark:hover:text-white transition-colors">
              Пользовательское соглашение
            </a>
          </div>
        </div>

        {/* Additional info */}
        <div className="mt-6 p-4 bg-[#f3f6f4] dark:bg-gray-800 rounded-lg">
          <p className="text-xs text-gray-600 dark:text-gray-400 text-center">
            Имеются противопоказания. Необходима консультация специалиста. 
            Информация на сайте не является публичной офертой.
          </p>
        </div>
      </div>
    </footer>
  )
}
