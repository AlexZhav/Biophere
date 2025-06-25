import React from 'react'
import { Accordion, AccordionItem, AccordionTrigger, AccordionContent } from './ui/accordion'
import { Phone } from 'lucide-react'
import { Link } from 'react-router-dom'

const popularFaq = [
  {
    question: 'Как записаться на прием?',
    answer: 'Вы можете записаться через онлайн форму или по телефону.'
  },
  {
    question: 'Какие услуги мы предоставляем?',
    answer: 'Мы предоставляем полный спектр ветеринарных услуг: терапия, хирургия, диагностика, профилактика, стоматология и др.'
  },
  {
    question: 'Могу ли я выбрать врача?',
    answer: 'Да, вы можете выбрать специалиста при записи на прием.'
  },
  {
    question: 'Когда проводить вакцинацию?',
    answer: 'Рекомендуемая схема вакцинации зависит от возраста и состояния животного. Подробности уточняйте у наших специалистов.'
  },
  {
    question: 'Что делать при подозрении на болезнь?',
    answer: 'Обратитесь в клинику как можно скорее для консультации и диагностики.'
  },
]

export default function FAQPreviewBlock() {
  return (
    <section id="faq" className="py-16 bg-gradient-to-br from-blue-50 to-green-50 dark:from-gray-900 dark:to-gray-800">
      <div className="container mx-auto px-4">
        <div className="text-center mb-12">
          <div className="inline-flex items-center justify-center w-16 h-16 bg-biosfera-primary/10 rounded-full mb-4">
            <svg xmlns="http://www.w3.org/2000/svg" width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="lucide lucide-circle-help h-8 w-8 text-biosfera-primary"><circle cx="12" cy="12" r="10"></circle><path d="M9.09 9a3 3 0 0 1 5.83 1c0 2-3 3-3 3"></path><path d="M12 17h.01"></path></svg>
          </div>
          <h2 className="text-3xl md:text-4xl font-bold text-gray-900 dark:text-white mb-4">Вопрос–Ответ</h2>
          <p className="text-lg text-gray-600 dark:text-gray-300 max-w-2xl mx-auto">Ответы на часто задаваемые вопросы о наших услугах и работе клиники</p>
        </div>
        <div className="max-w-3xl mx-auto">
          <Accordion type="single" collapsible className="w-full space-y-4">
            {popularFaq.map((item, idx) => (
              <AccordionItem key={idx} value={String(idx)} className="bg-white dark:bg-gray-800 rounded-lg border border-gray-200 dark:border-gray-700 px-6 shadow-sm hover:shadow-md transition-shadow">
                <AccordionTrigger className="text-lg font-medium text-gray-900 dark:text-white pr-4">{item.question}</AccordionTrigger>
                <AccordionContent>
                  <p className="text-gray-600 dark:text-gray-300 leading-relaxed">{item.answer}</p>
                </AccordionContent>
              </AccordionItem>
            ))}
          </Accordion>
        </div>
        <div className="text-center mt-12">
          <p className="text-gray-600 dark:text-gray-300 mb-4">Не нашли ответ на свой вопрос?</p>
          <Link to="/faq" className="inline-flex items-center justify-center px-6 py-3 bg-biosfera-primary text-white rounded-lg hover:bg-biosfera-primary/90 transition-colors font-medium">
            Задать свой вопрос
          </Link>
        </div>
      </div>
    </section>
  )
} 