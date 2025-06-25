import React from 'react'
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from '@/components/ui/accordion'
import { HelpCircle } from 'lucide-react'

const faqData = [
  {
    question: 'Как записаться на прием?',
    answer: 'Вы можете записаться через онлайн форму или по телефону',
  },
  {
    question: 'Какие услуги мы предоставляем?',
    answer: 'Мы предоставляем полный спектр ветеринарных услуг: диагностика, лечение, профилактика, хирургия',
  },
  {
    question: 'Могу ли я выбрать врача?',
    answer: 'Да, мы учтём ваши пожелания при записи на прием',
  },
  {
    question: 'Когда проводить вакцинацию?',
    answer: 'Вакцинация рекомендуется с определённых возрастов согласно календарю прививок',
  },
  {
    question: 'Что делать при подозрении на болезнь?',
    answer: 'При первых признаках недомогания питомца запишитесь на прием к ветеринару',
  },
]

export function FAQSection() {
  return (
    <section id="faq" className="py-16 bg-gradient-to-br from-blue-50 to-green-50 dark:from-gray-900 dark:to-gray-800">
      <div className="container mx-auto px-4">
        <div className="text-center mb-12">
          <div className="inline-flex items-center justify-center w-16 h-16 bg-biosfera-primary/10 rounded-full mb-4">
            <HelpCircle className="h-8 w-8 text-biosfera-primary" />
          </div>
          <h2 className="text-3xl md:text-4xl font-bold text-gray-900 dark:text-white mb-4">
            Вопрос–Ответ
          </h2>
          <p className="text-lg text-gray-600 dark:text-gray-300 max-w-2xl mx-auto">
            Ответы на часто задаваемые вопросы о наших услугах и работе клиники
          </p>
        </div>

        <div className="max-w-3xl mx-auto">
          <Accordion type="single" collapsible className="w-full space-y-4">
            {faqData.map((item, index) => (
              <AccordionItem
                key={index}
                value={`item-${index}`}
                className="bg-white dark:bg-gray-800 rounded-lg border border-gray-200 dark:border-gray-700 px-6 shadow-sm hover:shadow-md transition-shadow"
              >
                <AccordionTrigger className="text-left hover:no-underline py-6">
                  <span className="text-lg font-medium text-gray-900 dark:text-white pr-4">
                    {item.question}
                  </span>
                </AccordionTrigger>
                <AccordionContent className="pb-6 pt-0">
                  <p className="text-gray-600 dark:text-gray-300 leading-relaxed">
                    {item.answer}
                  </p>
                </AccordionContent>
              </AccordionItem>
            ))}
          </Accordion>
        </div>

        <div className="text-center mt-12">
          <p className="text-gray-600 dark:text-gray-300 mb-4">
            Не нашли ответ на свой вопрос?
          </p>
          <a
            href="tel:+78332123456"
            className="inline-flex items-center justify-center px-6 py-3 bg-biosfera-primary text-white rounded-lg hover:bg-biosfera-primary/90 transition-colors font-medium"
          >
            Позвонить нам
          </a>
        </div>
      </div>
    </section>
  )
}
