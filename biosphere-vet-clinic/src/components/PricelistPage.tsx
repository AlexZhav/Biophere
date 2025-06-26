import { DollarSign } from 'lucide-react'
import { Footer } from './Footer'
import PriceTable from './PriceTable'

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
          <PriceTable />
        </div>
      </main>
      <Footer />
    </div>
  )
} 
