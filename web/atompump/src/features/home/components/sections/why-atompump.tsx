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
import {
  Activity,
  ArrowRight,
  Boxes,
  Network,
  ShieldCheck,
} from 'lucide-react'
import { useTranslation } from 'react-i18next'
import { AnimateInView } from '@/components/animate-in-view'

const benefits = [
  {
    title: 'One API for every AI modality',
    description:
      'Unify LLM, image, video, audio, embedding, and rerank routes behind one set of compatible APIs.',
    icon: Boxes,
    visual: 'modalities',
  },
  {
    title: 'Precise protection rules',
    description:
      'Apply auth, rate limits, model access, and spending controls before requests reach upstream providers.',
    icon: ShieldCheck,
    visual: 'shield',
  },
  {
    title: 'Observable operations',
    description:
      'Track latency, quota, cost, request status, and provider health without stitching together tools.',
    icon: Activity,
    visual: 'metrics',
  },
  {
    title: 'Smart multi-provider routing',
    description:
      'Use weights, priorities, failover, and model mapping to keep production traffic resilient.',
    icon: Network,
    visual: 'routing',
  },
] as const

function BenefitVisual(props: { type: (typeof benefits)[number]['visual'] }) {
  const { t } = useTranslation()

  if (props.type === 'modalities') {
    return (
      <div className='grid h-36 grid-cols-2 gap-3 rounded-xl bg-blue-50 p-5 dark:bg-blue-950/20'>
        {['LLM', 'Image', 'Video', 'Audio'].map((item) => (
          <div
            key={item}
            className='flex items-center justify-center rounded-lg bg-background text-xs font-semibold text-muted-foreground shadow-sm'
          >
            {t(item)}
          </div>
        ))}
      </div>
    )
  }

  if (props.type === 'shield') {
    return (
      <div className='flex h-36 items-center justify-center rounded-xl bg-red-50 dark:bg-red-950/20'>
        <div className='relative flex size-16 items-center justify-center rounded-full border border-red-500/20 bg-background text-red-500 shadow-sm'>
          <ShieldCheck className='size-8' />
          <span className='absolute -bottom-4 h-1 w-12 rounded-full bg-red-500' />
        </div>
      </div>
    )
  }

  if (props.type === 'metrics') {
    return (
      <div className='flex h-36 items-center justify-center rounded-xl bg-emerald-50 p-5 dark:bg-emerald-950/20'>
        <div className='w-full rounded-lg bg-background p-4 shadow-sm'>
          <div className='mb-3 flex items-center justify-between text-[10px] text-muted-foreground'>
            <span>{t('Latency')}</span>
            <span>23ms</span>
          </div>
          <div className='mb-4 h-2 rounded-full bg-emerald-500/20'>
            <div className='h-full w-2/3 rounded-full bg-emerald-500' />
          </div>
          <div className='mb-3 flex items-center justify-between text-[10px] text-muted-foreground'>
            <span>{t('Success Rate')}</span>
            <span>99.9%</span>
          </div>
          <div className='h-2 rounded-full bg-emerald-500/20'>
            <div className='h-full w-[92%] rounded-full bg-emerald-500' />
          </div>
        </div>
      </div>
    )
  }

  return (
    <div className='flex h-36 items-center justify-center rounded-xl bg-violet-50 dark:bg-violet-950/20'>
      <div className='grid grid-cols-3 gap-2 text-violet-500'>
        {[0, 1, 2, 3, 4, 5].map((item) => (
          <div
            key={item}
            className='flex size-10 items-center justify-center rounded-lg border border-violet-500/20 bg-background shadow-sm'
          >
            <Network className='size-4' />
          </div>
        ))}
      </div>
    </div>
  )
}

export function WhyAtompump() {
  const { t } = useTranslation()

  return (
    <section className='relative z-10 px-4 py-20 md:py-28'>
      <div className='mx-auto max-w-5xl'>
        <AnimateInView className='text-center'>
          <h2 className='text-3xl font-bold tracking-tight md:text-4xl'>
            {t('Why AtomPump?')}
          </h2>
          <p className='mx-auto mt-3 max-w-xl text-sm text-muted-foreground md:text-base'>
            {t('More than a model proxy, built as an AI operations layer.')}
          </p>
        </AnimateInView>

        <div className='mt-10 grid gap-5 md:grid-cols-2'>
          {benefits.map((benefit, index) => {
            const Icon = benefit.icon
            return (
              <AnimateInView
                key={benefit.title}
                delay={index * 80}
                animation='scale-in'
              >
                <div className='h-full rounded-xl border border-border/60 bg-background p-5 shadow-sm transition duration-300 hover:-translate-y-1 hover:shadow-lg'>
                  <BenefitVisual type={benefit.visual} />
                  <div className='mt-5 flex items-start gap-3'>
                    <div className='mt-0.5 flex size-8 shrink-0 items-center justify-center rounded-lg bg-violet-500/10 text-violet-600 dark:text-violet-300'>
                      <Icon className='size-4' />
                    </div>
                    <div>
                      <h3 className='font-bold'>{t(benefit.title)}</h3>
                      <p className='mt-2 text-sm leading-6 text-muted-foreground'>
                        {t(benefit.description)}
                      </p>
                      <span className='mt-4 inline-flex items-center gap-1 text-xs font-semibold text-violet-600 dark:text-violet-300'>
                        {t('Learn more')}
                        <ArrowRight className='size-3.5' />
                      </span>
                    </div>
                  </div>
                </div>
              </AnimateInView>
            )
          })}
        </div>
      </div>
    </section>
  )
}
