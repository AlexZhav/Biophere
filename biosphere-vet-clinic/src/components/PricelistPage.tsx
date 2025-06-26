import { DollarSign } from 'lucide-react'
import PriceTable from './PriceTable'
import React, { useEffect, useState } from 'react'

export default function PricelistPage() {
  const [showScrollTop, setShowScrollTop] = useState(false)
  useEffect(() => {
    const onScroll = () => setShowScrollTop(window.scrollY > 100)
    window.addEventListener('scroll', onScroll)
    return () => window.removeEventListener('scroll', onScroll)
  }, [])
  const scrollToTop = () => window.scrollTo({ top: 0, behavior: 'smooth' })

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
          <PriceTable />
        </div>
      </main>
      {showScrollTop && (
        <button
          className="fixed z-50 right-6 bottom-24 md:bottom-32 w-12 h-12 rounded-full flex items-center justify-center shadow-lg transition-colors bg-white dark:bg-gray-800 text-biosphere-primary dark:text-biosphere-secondary border border-gray-200 dark:border-gray-700 hover:bg-biosphere-primary hover:text-white dark:hover:bg-biosphere-secondary dark:hover:text-white"
          title="Вверх"
          onClick={scrollToTop}
        >
          <svg className="w-6 h-6" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" d="M5 15l7-7 7 7"></path></svg>
        </button>
      )}
    </div>
  );
} 
