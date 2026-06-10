/*
Copyright (C) 2023-2026 QuantumNous

This program is free software: you can redistribute it and/or modify
it under the terms of the GNU Affero General Public License as
published by the Free Software Foundation, either version 3 of the
License, or (at your option) any later version.

This program is distributed in the hope that it will be useful,
but WITHOUT ANY WARRANTY; without even the implied warranty of
MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE. See the
GNU Affero General Public License for more details.

You should have received a copy of the GNU Affero General Public License
along with this program. If not, see <https://www.gnu.org/licenses/>.

For commercial licensing, please contact support@quantumnous.com
*/
import { useTranslation } from 'react-i18next'
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from '@/components/ui/accordion'
import { AnimateInView } from '@/components/animate-in-view'

const faqs = [
  {
    question: 'What is AtomPump?',
    answer:
      'AtomPump is a frontend template and operating console for a New API based AI gateway. It focuses on model access, routing, billing, and team operations.',
  },
  {
    question: 'Which model APIs are supported?',
    answer:
      'You can expose OpenAI-compatible, Claude, Gemini, image, audio, embedding, rerank, and video workflows through the gateway, depending on your configured upstream channels.',
  },
  {
    question: 'Can I keep my existing New API deployment?',
    answer:
      'Yes. AtomPump is designed as an additional template layer, so the backend can remain close to upstream New API while the bundled frontend changes.',
  },
  {
    question: 'How does billing work?',
    answer:
      'The gateway keeps centralized usage records, quota accounting, model pricing rules, and channel-level statistics for every routed request.',
  },
  {
    question: 'Is it suitable for teams?',
    answer:
      'Yes. User groups, tokens, permissions, model restrictions, and admin tooling are built around multi-user operations.',
  },
  {
    question: 'Can I self-host it?',
    answer:
      'Yes. It follows the New API deployment model and can run with SQLite, MySQL, or PostgreSQL plus optional Redis.',
  },
] as const

export function HomepageFAQ() {
  const { t } = useTranslation()

  return (
    <section className='relative z-10 px-4 py-20 md:py-28'>
      <div className='mx-auto max-w-3xl'>
        <AnimateInView className='text-center'>
          <h2 className='text-3xl font-bold tracking-tight md:text-4xl'>
            {t('Frequently asked questions')}
          </h2>
          <p className='mt-3 text-sm text-muted-foreground md:text-base'>
            {t('Answers about AtomPump and AI gateway operations.')}
          </p>
        </AnimateInView>

        <AnimateInView className='mt-10'>
          <Accordion className='gap-3'>
            {faqs.map((faq, index) => (
              <AccordionItem
                key={faq.question}
                value={`faq-${index}`}
                className='rounded-xl border border-border/60 bg-background px-5 shadow-sm'
              >
                <AccordionTrigger className='py-4 text-sm font-semibold hover:no-underline'>
                  {t(faq.question)}
                </AccordionTrigger>
                <AccordionContent className='pb-4 text-sm leading-6 text-muted-foreground'>
                  {t(faq.answer)}
                </AccordionContent>
              </AccordionItem>
            ))}
          </Accordion>
        </AnimateInView>
      </div>
    </section>
  )
}
