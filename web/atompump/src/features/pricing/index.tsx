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
import { Link } from '@tanstack/react-router'
import {
  ArrowRight,
  Banknote,
  CircleDollarSign,
  Gauge,
  KeyRound,
  Receipt,
  ShieldCheck,
} from 'lucide-react'
import { useTranslation } from 'react-i18next'
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from '@/components/ui/accordion'
import { AnimateInView } from '@/components/animate-in-view'
import { Button } from '@/components/ui/button'
import { PublicLayout } from '@/components/layout'
import { PageTransition } from '@/components/page-transition'
import { Footer } from '@/components/layout/components/footer'
import { LoadingSkeleton } from './components/loading-skeleton'
import { MarketingPricingTable } from './components/marketing-pricing-table'
import { DEFAULT_TOKEN_UNIT } from './constants'
import { usePricingData } from './hooks/use-pricing-data'
import { useAuthStore } from '@/stores/auth-store'

function Hero() {
  const { t } = useTranslation()
  const { auth } = useAuthStore()
  const isAuthenticated = !!auth.user

  return (
    <section className='relative z-10 overflow-hidden px-4 pt-20 pb-10 md:pt-24 md:pb-14'>
      <div className='mx-auto flex max-w-4xl flex-col items-center text-center'>
        <h1 className='text-[clamp(2.5rem,7vw,5rem)] leading-[1.05] font-black tracking-tight'>
          <span className='text-violet-600 dark:text-violet-400'>
            {t('Pay-as-you-go')}
          </span>
          <span className='ml-3'>{t('no tricks')}</span>
        </h1>
        <p className='text-muted-foreground/80 mt-5 max-w-2xl text-base leading-7 md:text-lg'>
          {t(
            'Every model priced at the official rate. Pay only for the tokens you consume — no monthly minimums, no hidden fees.'
          )}
        </p>
        <div className='mt-8 flex flex-wrap items-center justify-center gap-3'>
          <Button
            className='group h-13 rounded-full px-7 text-sm font-semibold shadow-xl shadow-violet-500/15 md:h-14 md:px-8 md:text-base'
            render={isAuthenticated ? <Link to='/dashboard' /> : <Link to='/sign-up' />}
          >
            <KeyRound className='mr-2 size-5' />
            {t('Get API Key')}
            <ArrowRight className='ml-2 size-5 transition-transform duration-200 group-hover:translate-x-0.5' />
          </Button>
          <Button
            variant='outline'
            className='h-13 rounded-full px-7 text-sm font-semibold md:h-14 md:px-8 md:text-base'
            render={
              <a href='mailto:business@atompump.ai' />
            }
          >
            {t('Talk to Sales')}
          </Button>
        </div>
      </div>
    </section>
  )
}

const FEATURES = [
  {
    icon: Gauge,
    title: '5x faster routing',
    description:
      'Smart model routing and connection pooling keep average latency low so your requests return in milliseconds.',
  },
  {
    icon: CircleDollarSign,
    title: 'Official list pricing',
    description:
      'We charge 1:1 with what providers publish. No hidden markups or surprise overage fees.',
  },
  {
    icon: Receipt,
    title: 'Per-request billing',
    description:
      'Pure consumption-based billing. Top up once, spend across every model without monthly minimums.',
  },
  {
    icon: ShieldCheck,
    title: 'Zero data retention',
    description:
      'Your prompts and responses are never stored or used for training. SOC 2 ready posture.',
  },
  {
    icon: Banknote,
    title: '50% off top-ups',
    description:
      'Recharge during promotional windows and your per-token cost drops by half on supported models.',
  },
  {
    icon: KeyRound,
    title: 'One key, every model',
    description:
      'A single API key unlocks 100+ models across OpenAI, Claude, Gemini, image, audio, and embedding endpoints.',
  },
] as const

function FeaturesGrid() {
  const { t } = useTranslation()

  return (
    <section className='relative z-10 px-4 py-12 md:py-20'>
      <div className='mx-auto max-w-6xl'>
        <AnimateInView className='text-center'>
          <p className='text-muted-foreground/60 text-xs font-semibold tracking-wider uppercase'>
            {t('Why teams choose AtomPump')}
          </p>
          <h2 className='mt-3 text-2xl font-bold tracking-tight md:text-3xl'>
            {t('Built for production AI traffic')}
          </h2>
        </AnimateInView>
        <div className='mt-10 grid gap-4 sm:grid-cols-2 lg:grid-cols-3'>
          {FEATURES.map((feature, index) => {
            const Icon = feature.icon
            return (
              <AnimateInView
                key={feature.title}
                delay={index * 60}
                animation='scale-in'
              >
                <div className='h-full rounded-xl border border-border/60 bg-background p-5 shadow-sm transition duration-300 hover:-translate-y-1 hover:shadow-md'>
                  <div className='flex size-9 items-center justify-center rounded-lg bg-violet-500/10 text-violet-600 dark:text-violet-300'>
                    <Icon className='size-4' />
                  </div>
                  <h3 className='mt-4 font-semibold'>{t(feature.title)}</h3>
                  <p className='text-muted-foreground mt-2 text-sm leading-6'>
                    {t(feature.description)}
                  </p>
                </div>
              </AnimateInView>
            )
          })}
        </div>
      </div>
    </section>
  )
}

const FAQS = [
  {
    question: 'How is the price calculated?',
    answer:
      'All models are priced at the official upstream rate with no markup. The per-token cost is the provider list price × your group ratio. Cached input, image, and audio output are priced independently when applicable.',
  },
  {
    question: 'Do unused credits expire?',
    answer:
      'No. Recharged credits remain on your account until consumed. There is no monthly minimum and no inactivity fee.',
  },
  {
    question: 'Can I set a hard spending cap?',
    answer:
      'Yes. Each user group can define a per-day, per-week, or per-month quota. Requests are rejected once the configured cap is reached.',
  },
  {
    question: 'Which models support cache billing?',
    answer:
      'OpenAI, Claude, DeepSeek, and Qwen all support discounted pricing for cached input tokens. The cache rate is shown in the price column when the provider exposes it.',
  },
  {
    question: 'Is there a free trial?',
    answer:
      'New accounts receive a small starting balance to test the gateway. You can top up via EPay, Stripe, or a private billing arrangement with the sales team.',
  },
  {
    question: 'How do I get an invoice?',
    answer:
      'Top-ups and subscription charges generate downloadable invoices from the wallet page once billing is enabled on your account.',
  },
  {
    question: 'What payment methods are supported?',
    answer:
      'We currently accept EPay (Alipay, WeChat Pay, USDT), Stripe (credit card, Apple Pay, Google Pay), and bank transfer for enterprise contracts.',
  },
] as const

function FAQSection() {
  const { t } = useTranslation()

  return (
    <section className='relative z-10 px-4 py-12 md:py-20'>
      <div className='mx-auto max-w-3xl'>
        <AnimateInView className='text-center'>
          <h2 className='text-2xl font-bold tracking-tight md:text-3xl'>
            {t('Common questions')}
          </h2>
          <p className='text-muted-foreground mt-3 text-sm md:text-base'>
            {t('Pricing, billing, and operations — answered.')}
          </p>
        </AnimateInView>
        <AnimateInView className='mt-8'>
          <Accordion className='gap-3'>
            {FAQS.map((faq, index) => (
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

function DarkCTA() {
  const { t } = useTranslation()
  const { auth } = useAuthStore()
  const isAuthenticated = !!auth.user

  return (
    <section className='relative z-10 px-4 py-12 md:py-20'>
      <div className='mx-auto max-w-5xl overflow-hidden rounded-3xl bg-[#0c0a17] p-10 text-center text-white shadow-2xl md:p-16'>
        <div
          aria-hidden
          className='pointer-events-none absolute inset-0 opacity-50'
          style={{
            background:
              'radial-gradient(ellipse 50% 50% at 30% 20%, rgba(124,58,237,0.45) 0%, transparent 60%), radial-gradient(ellipse 50% 50% at 80% 80%, rgba(236,72,153,0.35) 0%, transparent 60%)',
          }}
        />
        <div className='relative'>
          <h2 className='text-3xl font-bold tracking-tight md:text-4xl'>
            {t('Ready to ship?')}
          </h2>
          <p className='text-white/70 mx-auto mt-4 max-w-lg text-sm md:text-base'>
            {t(
              'Create a key in under a minute, or talk to the team about volume pricing and custom SLAs.'
            )}
          </p>
          <div className='mt-7 flex flex-wrap items-center justify-center gap-3'>
            <Button
              className='h-12 rounded-full bg-white px-7 text-sm font-semibold text-violet-700 hover:bg-white/90'
              render={
                isAuthenticated ? (
                  <Link to='/dashboard' />
                ) : (
                  <Link to='/sign-up' />
                )
              }
            >
              {t('Start free')}
              <ArrowRight className='ml-2 size-4' />
            </Button>
            <Button
              variant='outline'
              className='h-12 rounded-full border-white/30 bg-white/5 px-7 text-sm font-semibold text-white hover:bg-white/10'
              render={
                <a href='mailto:business@atompump.ai' />
              }
            >
              {t('Contact sales')}
            </Button>
          </div>
        </div>
      </div>
    </section>
  )
}

export function Pricing() {
  const {
    models,
    isLoading,
    priceRate,
    usdExchangeRate,
  } = usePricingData()

  if (isLoading) {
    return (
      <PublicLayout showMainContainer={false}>
        <div className='mx-auto w-full max-w-[1800px] px-3 pt-16 pb-8 sm:px-6 sm:pt-20 sm:pb-10 xl:px-8'>
          <LoadingSkeleton viewMode='table' />
        </div>
      </PublicLayout>
    )
  }

  return (
    <PublicLayout showMainContainer={false}>
      <PageTransition>
        <div className='relative'>
          <Hero />
          <section className='relative z-10 px-4 py-6 md:py-8'>
            <div className='mt-6'>
              <MarketingPricingTable
                models={models || []}
                priceRate={priceRate}
                usdExchangeRate={usdExchangeRate}
                tokenUnit={DEFAULT_TOKEN_UNIT}
              />
            </div>
          </section>
          <FeaturesGrid />
          <FAQSection />
          <DarkCTA />
        </div>
        <Footer />
      </PageTransition>
    </PublicLayout>
  )
}
