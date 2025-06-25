import React, { useState, useEffect } from 'react'
import { Button } from '@/components/ui/button'
import { Card, CardContent } from '@/components/ui/card'
import { Cookie, X } from 'lucide-react'

export function CookieConsent() {
  const [isVisible, setIsVisible] = useState(false)

  useEffect(() => {
    const consent = localStorage.getItem('cookie-consent')
    if (!consent) {
      // Show banner after a short delay
      const timer = setTimeout(() => setIsVisible(true), 2000)
      return () => clearTimeout(timer)
    }
  }, [])

  const handleAccept = () => {
    localStorage.setItem('cookie-consent', 'accepted')
    setIsVisible(false)
  }

  const handleDecline = () => {
    localStorage.setItem('cookie-consent', 'declined')
    setIsVisible(false)
  }

  const handleClose = () => {
    setIsVisible(false)
  }

  if (!isVisible) return null

  return (
    <div className="fixed bottom-4 left-4 right-4 z-50 md:left-auto md:max-w-md">
      <Card className="shadow-2xl border-0 bg-white dark:bg-gray-800">
        <CardContent className="p-6">
          <div className="flex items-start justify-between mb-4">
            <div className="flex items-center space-x-2">
              <Cookie className="h-5 w-5 text-biosfera-warm flex-shrink-0" />
              <h3 className="font-semibold text-gray-900 dark:text-white">
                Использование cookie
              </h3>
            </div>
            <Button
              variant="ghost"
              size="sm"
              onClick={handleClose}
              className="h-6 w-6 p-0 hover:bg-gray-100 dark:hover:bg-gray-700"
            >
              <X className="h-4 w-4" />
            </Button>
          </div>
          
          <p className="text-sm text-gray-600 dark:text-gray-300 mb-6 leading-relaxed">
            Мы используем файлы cookie для улучшения работы сайта и предоставления более персонализированного опыта. 
            Продолжая использовать наш сайт, вы соглашаетесь с нашей{' '}
            <a href="#" className="text-biosfera-primary hover:underline">
              политикой конфиденциальности
            </a>.
          </p>
          
          <div className="flex flex-col sm:flex-row gap-3">
            <Button
              onClick={handleAccept}
              className="flex-1 bg-biosfera-primary hover:bg-biosfera-primary/90 text-white"
              size="sm"
            >
              Принять
            </Button>
            <Button
              onClick={handleDecline}
              variant="outline"
              className="flex-1 border-gray-300 hover:bg-gray-50 dark:border-gray-600 dark:hover:bg-gray-700"
              size="sm"
            >
              Отклонить
            </Button>
          </div>
          
          <div className="mt-4 pt-4 border-t border-gray-200 dark:border-gray-700">
            <p className="text-xs text-gray-500 dark:text-gray-400">
              Вы можете изменить настройки cookie в любое время в настройках вашего браузера.
            </p>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
