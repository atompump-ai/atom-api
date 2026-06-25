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
  BookOpen,
  KeyRound,
  Sparkles,
  Zap,
} from 'lucide-react'
import { useTranslation } from 'react-i18next'
import { getLobeIcon } from '@/lib/lobe-icon'
import { useStatus } from '@/hooks/use-status'
import { Button } from '@/components/ui/button'

interface HeroProps {
  className?: string
  isAuthenticated?: boolean
}

const modelIcons = [
  'OpenAI.Color',
  'Claude.Color',
  'Gemini.Color',
  'Qwen.Color',
  'DeepSeek.Color',
  'Doubao.Color',
  'Minimax.Color',
  'Mistral.Color',
] as const

export function Hero(props: HeroProps) {
  const { t } = useTranslation()
  const { status } = useStatus()
  const docsUrl =
    (status?.docs_link as string | undefined) || 'https://docs.newapi.pro'

  const renderDocsButton = (className: string) => {
    const isExternal = docsUrl.startsWith('http')
    if (isExternal) {
      return (
        <Button
          variant='outline'
          className={className}
          render={
            <a href={docsUrl} target='_blank' rel='noopener noreferrer' />
          }
        >
          <BookOpen className='text-muted-foreground/80 group-hover:text-foreground size-4 transition-colors duration-200' />
          <span>{t('Docs')}</span>
        </Button>
      )
    }
    return (
      <Button
        variant='outline'
        className={className}
        render={<Link to={docsUrl} />}
      >
        <BookOpen className='text-muted-foreground/80 group-hover:text-foreground size-4 transition-colors duration-200' />
        <span>{t('Docs')}</span>
      </Button>
    )
  }

  return (
    <section className='relative z-10 overflow-hidden px-4 pt-28 pb-14 md:pt-36 md:pb-20 lg:pt-40'>
      <div className='pointer-events-none absolute inset-0 -z-10 bg-[radial-gradient(circle_at_50%_16%,rgba(124,58,237,0.12),transparent_34%),linear-gradient(180deg,rgba(250,250,252,0.95),rgba(255,255,255,0))] dark:bg-[radial-gradient(circle_at_50%_16%,rgba(124,58,237,0.2),transparent_34%)]' />
      <div className='pointer-events-none absolute inset-x-0 top-16 -z-10 h-px bg-border/60' />

      <div className='mx-auto flex max-w-6xl flex-col items-center text-center'>
        <div
          className='landing-animate-fade-up border-border/70 bg-background/80 text-muted-foreground mb-6 inline-flex items-center gap-2 rounded-full border px-4 py-2 text-xs font-medium shadow-sm backdrop-blur-xl opacity-0'
          style={{ animationDelay: '0ms' }}
        >
          <span className='flex size-2 rounded-full bg-emerald-500 shadow-[0_0_0_4px_rgba(16,185,129,0.12)]' />
          <span>{t('Developer-first AI API platform')}</span>
        </div>

        <h1
          className='landing-animate-fade-up max-w-5xl text-[clamp(2.25rem,5vw,4.5rem)] leading-[0.98] font-black opacity-0'
          style={{ animationDelay: '60ms' }}
        >
          <span>{t('Unified gateway to')}</span>
          <br />
          <span className='text-violet-600 dark:text-violet-400'>{t('Multiple')} </span>
          <span className='text-violet-600 dark:text-violet-400'>
            {t('production AI models')}
          </span>
        </h1>

        <p
          className='landing-animate-fade-up text-muted-foreground mt-7 max-w-3xl text-base leading-8 opacity-0 md:text-xl'
          style={{ animationDelay: '120ms' }}
        >
          {t(
            'Connect GPT, Claude, Gemini, Sora, Veo, Seedance, image, and embedding models through one compatible API with consistent auth, routing, billing, and request formats.'
          )}
        </p>

        <div
          className='landing-animate-fade-up text-muted-foreground/70 mt-4 flex flex-wrap items-center justify-center gap-x-3 gap-y-2 text-sm opacity-0'
          style={{ animationDelay: '160ms' }}
        >
          {[t('Smart routing'), t('Automatic failover'), t('Lower cost calls')].map(
            (item) => (
              <span key={item} className='inline-flex items-center gap-2'>
                <Sparkles className='size-3.5 text-violet-500' />
                {item}
              </span>
            )
          )}
        </div>

        <div className='landing-animate-fade-up mt-9 flex flex-wrap items-center justify-center gap-3 opacity-0' style={{ animationDelay: '200ms' }}>
          {props.isAuthenticated ? (
            <Button
              className='group h-14 rounded-2xl px-8 text-base font-semibold shadow-xl shadow-foreground/10'
              render={<Link to='/dashboard' />}
            >
              {t('Go to Dashboard')}
              <ArrowRight className='ml-2 size-5 transition-transform duration-200 group-hover:translate-x-0.5' />
            </Button>
          ) : (
            <Button
              className='group h-13 rounded-full px-7 text-sm font-semibold shadow-xl shadow-foreground/10 md:h-14 md:px-8 md:text-base'
              render={<Link to='/sign-up' />}
            >
              <KeyRound className='mr-2 size-5' />
              {t('Get API Key')}
              <ArrowRight className='ml-2 size-5 transition-transform duration-200 group-hover:translate-x-0.5' />
            </Button>
          )}

          {renderDocsButton(
            'group border-violet-500/20 bg-violet-500/5 text-violet-700 hover:border-violet-500/30 hover:bg-violet-500/10 dark:text-violet-300 h-13 rounded-full px-7 text-sm font-semibold shadow-sm backdrop-blur-xl md:h-14 md:text-base'
          )}
        </div>

        <div
          className='landing-animate-fade-up mt-10 flex w-full max-w-4xl flex-wrap items-center justify-center gap-4 opacity-0'
          style={{ animationDelay: '260ms' }}
        >
          {modelIcons.map((iconName) => (
            <div
              key={iconName}
              className='border-border/70 bg-background flex size-14 items-center justify-center rounded-full border shadow-sm'
            >
              {getLobeIcon(iconName, 28)}
            </div>
          ))}
          <div className='border-border/70 bg-background text-muted-foreground flex h-14 items-center gap-2 rounded-full border px-5 text-sm font-medium shadow-sm'>
            <Zap className='size-4 text-violet-500' />
            {t('One key, every modality')}
          </div>
        </div>
      </div>
    </section>
  )
}
