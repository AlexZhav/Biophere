import React, { useState } from 'react'
import { Moon, Sun, MapPin, Menu, X } from 'lucide-react'
import { useTheme } from '@/contexts/ThemeContext'
import { Button } from '@/components/ui/button'
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu'
import { RegistrationModal } from './RegistrationModal'
import { BookingModal } from './BookingModal'
import { useNavigate, Link } from 'react-router-dom'
import { useAuth } from '@/contexts/AuthContext'
import { useToast } from '@/hooks/use-toast'

interface HeaderProps {
  onNavigateToSection: (section: string) => void
}

const branches = [
  'Россия, г. Киров, ул. Солнечная, 19Б',
  'ул. Московская, 4',
  'ул. Молодой Гвардии, 2Д, Нововятский район',
  'пр-т Строителей, 9, корпус 1',
  'ул. Чернышевского, 7',
  'ул. Украинская, 18',
]

export function Header({ onNavigateToSection }: HeaderProps) {
  const { theme, toggleTheme } = useTheme()
  const [isRegistrationOpen, setIsRegistrationOpen] = useState(false)
  const [isBookingOpen, setIsBookingOpen] = useState(false)
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false)
  const navigate = useNavigate()
  const { user, logout } = useAuth()
  const { toast } = useToast()

  const handleBranchClick = (branch: string) => {
    const encodedAddress = encodeURIComponent(branch)
    window.open(`https://maps.google.com/?q=${encodedAddress}`, '_blank')
  }

  // Универсальная функция для перехода и скролла вверх
  const handleNavScroll = (path: string) => {
    if (window.location.pathname === path) {
      window.scrollTo({ top: 0, behavior: 'smooth' })
    } else {
      navigate(path)
      setTimeout(() => {
        window.scrollTo({ top: 0, behavior: 'smooth' })
      }, 100) // небольшой таймаут для корректного скролла после перехода
    }
  }

  const navigationItems = [
    { label: 'Вопрос–Ответ', action: () => handleNavScroll('/faq') },
    { label: 'Прейскурант', action: () => handleNavScroll('/pricelist') },
    // { label: 'Специалисты', action: () => handleNavScroll('/specialists') },
    // { label: 'Отзывы', action: () => handleNavScroll('/testimonials') },
  ]

  const handleLogout = () => {
    logout()
    toast({
      title: 'Выход выполнен',
      description: 'Вы успешно вышли из аккаунта',
    })
  }

  return (
    <>
      <header className="sticky top-0 z-50 w-full border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
        <div className="container flex h-16 items-center justify-between">
          {/* Left side - Logo and Theme Toggle */}
          <div className="flex items-center space-x-4">
            <button
              onClick={() => handleNavScroll('/')}
              className="text-2xl font-bold text-biosfera-primary hover:text-biosfera-accent transition-colors"
            >
              Биосфера
            </button>
            <Button
              variant="ghost"
              size="sm"
              onClick={toggleTheme}
              className="h-8 w-8 p-0"
            >
              {theme === 'light' ? (
                <Moon className="h-4 w-4" />
              ) : (
                <Sun className="h-4 w-4" />
              )}
            </Button>
          </div>

          {/* Center - Booking Button */}
          <div className="hidden md:block">
            <Button
              onClick={() => setIsBookingOpen(true)}
              className="text-white px-6 py-2 font-medium rounded-lg shadow-md border-0"
              style={{ background: 'linear-gradient(to right, rgb(2, 133, 162), rgb(76, 175, 80))' }}
            >
              Записаться онлайн
            </Button>
          </div>

          {/* Right side - Navigation */}
          <nav className="hidden lg:flex items-center space-x-6">
            {user ? (
              <Button
                variant="ghost"
                onClick={handleLogout}
                className="text-sm font-medium hover:text-biosfera-primary"
              >
                Выйти
              </Button>
            ) : (
              <Button
                variant="ghost"
                onClick={() => setIsRegistrationOpen(true)}
                className="text-sm font-medium hover:text-biosfera-primary"
              >
                Регистрация
              </Button>
            )}
            
            {navigationItems.map((item) => (
              <button
                key={item.label}
                onClick={item.action}
                className="text-sm font-medium hover:text-biosfera-primary transition-colors"
              >
                {item.label}
              </button>
            ))}
            <Link
              to="/specialists-page"
              className="text-sm font-medium hover:text-biosfera-primary transition-colors"
            >
              Специалисты
            </Link>
            <Link
              to="/reviews-page"
              className="text-sm font-medium hover:text-biosfera-primary transition-colors"
            >
              Отзывы
            </Link>

            {/* Branches Dropdown */}
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button variant="ghost" className="text-sm font-medium hover:text-biosfera-primary">
                  <MapPin className="h-4 w-4 mr-1" />
                  Филиалы
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="end" className="w-80">
                {branches.map((branch, index) => (
                  <DropdownMenuItem
                    key={index}
                    onClick={() => handleBranchClick(branch)}
                    className="cursor-pointer py-3 text-sm"
                  >
                    <MapPin className="h-4 w-4 mr-2 text-biosfera-primary" />
                    {branch}
                  </DropdownMenuItem>
                ))}
              </DropdownMenuContent>
            </DropdownMenu>
          </nav>

          {/* Mobile menu button */}
          <Button
            variant="ghost"
            className="lg:hidden"
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
          >
            {isMobileMenuOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
          </Button>
        </div>

        {/* Mobile Navigation */}
        {isMobileMenuOpen && (
          <div className="border-t lg:hidden">
            <div className="container py-4 space-y-4">
              <Button
                onClick={() => {
                  setIsBookingOpen(true)
                  setIsMobileMenuOpen(false)
                }}
                className="w-full bg-biosfera-secondary hover:bg-biosfera-secondary/90 text-white"
              >
                Записаться онлайн
              </Button>
              
              <div className="space-y-2">
                <Button
                  variant="ghost"
                  className="w-full justify-start"
                  onClick={() => {
                    if (user) {
                      handleLogout()
                      setIsMobileMenuOpen(false)
                    } else {
                      setIsRegistrationOpen(true)
                      setIsMobileMenuOpen(false)
                    }
                  }}
                >
                  {user ? 'Выйти' : 'Регистрация'}
                </Button>
                
                {navigationItems.map((item) => (
                  <button
                    key={item.label}
                    onClick={() => {
                      item.action()
                      setIsMobileMenuOpen(false)
                    }}
                    className="block w-full text-left px-4 py-2 text-sm hover:bg-accent hover:text-accent-foreground rounded-md"
                  >
                    {item.label}
                  </button>
                ))}

                <div className="pt-2 border-t">
                  <div className="text-sm font-medium text-muted-foreground mb-2">Филиалы:</div>
                  {branches.map((branch, index) => (
                    <button
                      key={index}
                      onClick={() => {
                        handleBranchClick(branch)
                        setIsMobileMenuOpen(false)
                      }}
                      className="block w-full text-left px-4 py-2 text-sm hover:bg-accent hover:text-accent-foreground rounded-md"
                    >
                      <MapPin className="h-4 w-4 mr-2 inline text-biosfera-primary" />
                      {branch}
                    </button>
                  ))}
                </div>
              </div>
            </div>
          </div>
        )}
      </header>

      <RegistrationModal isOpen={isRegistrationOpen} onClose={() => setIsRegistrationOpen(false)} />
      <BookingModal isOpen={isBookingOpen} onClose={() => setIsBookingOpen(false)} />
    </>
  )
}
