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
import { useCallback, useEffect, useRef } from 'react'
import { Link } from '@tanstack/react-router'
import { ArrowRight, KeyRound } from 'lucide-react'
import { useTranslation } from 'react-i18next'
import { useStatus } from '@/hooks/use-status'
import { Button } from '@/components/ui/button'

interface HeroProps {
  className?: string
  isAuthenticated?: boolean
}

interface StatItem {
  end: number
  suffix: string
  label: string
  decimals?: number
}

interface CounterProps {
  end: number
  suffix?: string
  prefix?: string
  duration?: number
  decimals?: number
}

function Counter(props: CounterProps) {
  const {
    end,
    suffix = '',
    prefix = '',
    duration = 1600,
    decimals = 0,
  } = props
  const ref = useRef<HTMLSpanElement>(null)
  const startedRef = useRef(false)

  const formatValue = useCallback(
    (v: number) =>
      decimals > 0 ? v.toFixed(decimals) : Math.round(v).toLocaleString(),
    [decimals],
  )

  const animate = useCallback(() => {
    const el = ref.current
    if (!el) return
    const start = performance.now()
    const step = (now: number) => {
      const progress = Math.min((now - start) / duration, 1)
      const eased = 1 - Math.pow(1 - progress, 3)
      el.textContent = `${prefix}${formatValue(eased * end)}${suffix}`
      if (progress < 1) requestAnimationFrame(step)
    }
    requestAnimationFrame(step)
  }, [end, duration, prefix, suffix, formatValue])

  useEffect(() => {
    const el = ref.current
    if (!el) return

    const mq = window.matchMedia('(prefers-reduced-motion: reduce)')
    if (mq.matches) {
      el.textContent = `${prefix}${formatValue(end)}${suffix}`
      return
    }

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting && !startedRef.current) {
          startedRef.current = true
          animate()
          observer.unobserve(el)
        }
      },
      { threshold: 0.5 },
    )

    observer.observe(el)
    return () => observer.disconnect()
  }, [animate, end, prefix, suffix, formatValue])

  return (
    <span ref={ref} className='tabular-nums'>
      {prefix}0{suffix}
    </span>
  )
}

export function Hero(props: HeroProps) {
  const { t } = useTranslation()
  const { status } = useStatus()
  const docsUrl =
    (status?.docs_link as string | undefined) || 'https://docs.newapi.pro'

  const stats: StatItem[] = [
    { end: 99.99, suffix: '%', label: t('service availability'), decimals: 2 },
    { end: 1000, suffix: '万+', label: t('daily API calls') },
    { end: 100, suffix: '+', label: t('production models') },
    { end: 50, suffix: 'ms', label: t('routing latency') },
  ]

  return (
    <section className='relative z-10 px-4 pt-20 pb-12 md:pt-24 md:pb-16'>
      <div className='landing-animate-fade-up mx-auto flex max-w-5xl flex-col items-center text-center'>
        <h1 className='max-w-4xl text-[clamp(2.5rem,5vw,4.25rem)] leading-[0.98] font-black tracking-tight text-foreground'>
          {t('Unified AI API gateway')}
        </h1>

        <p className='text-muted-foreground mt-5 max-w-2xl text-base leading-7 md:text-lg'>
          {t('Unified AI API gateway subtitle')}{' '}
          <a
            href={docsUrl}
            target='_blank'
            rel='noopener noreferrer'
            className='text-blue-500 hover:underline'
          >
            {t('Docs')}
          </a>
        </p>

        <div className='mt-7 flex flex-wrap items-center justify-center gap-3'>
          {props.isAuthenticated ? (
            <Button
              className='group h-12 rounded-full bg-violet-600 px-6 font-semibold text-white shadow-sm hover:bg-violet-700'
              render={<Link to='/dashboard' />}
            >
              {t('Go to Dashboard')}
              <ArrowRight className='ml-2 size-4 transition-transform duration-200 group-hover:translate-x-0.5' />
            </Button>
          ) : (
            <Button
              className='group h-12 rounded-full bg-violet-600 px-6 font-semibold text-white shadow-sm hover:bg-violet-700'
              render={<Link to='/sign-up' />}
            >
              <KeyRound className='mr-2 size-4' />
              {t('Get API Key')}
              <ArrowRight className='ml-2 size-4 transition-transform duration-200 group-hover:translate-x-0.5' />
            </Button>
          )}

          <Button
            variant='outline'
            className='group h-12 rounded-full px-6 font-semibold shadow-sm'
            render={<Link to='/explore' />}
          >
            <span>{t('Explore Models')}</span>
          </Button>
        </div>

        <div className='mt-12 grid w-full max-w-4xl grid-cols-2 gap-y-6 md:grid-cols-4'>
          {stats.map((s) => (
            <div
              key={s.label}
              className='flex flex-col items-center px-4'
            >
              <span className='text-2xl font-black tracking-tight'>
                <Counter
                  end={s.end}
                  suffix={s.suffix}
                  decimals={s.decimals}
                />
              </span>
              <span className='text-muted-foreground mt-1 text-xs'>
                {s.label}
              </span>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
