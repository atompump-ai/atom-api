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
import { ArrowRight, Sparkles } from 'lucide-react'
import { useTranslation } from 'react-i18next'
import { getLobeIcon } from '@/lib/lobe-icon'
import { Button } from '@/components/ui/button'
import { AnimateInView } from '@/components/animate-in-view'

const featuredModels = [
  {
    name: 'Nano Banana',
    meta: 'Google image model',
    icon: 'Gemini.Color',
    badge: '$0.020',
    className: 'from-yellow-100 via-amber-200 to-stone-900',
  },
  {
    name: 'Google Veo 3.1',
    meta: 'Video generation',
    icon: 'Gemini.Color',
    badge: '$0.080',
    className: 'from-sky-950 via-indigo-700 to-blue-200',
  },
  {
    name: 'Claude Opus 4.7',
    meta: 'Advanced reasoning',
    icon: 'Claude.Color',
    badge: '$0.060',
    className: 'from-stone-100 via-orange-50 to-stone-300',
  },
  {
    name: 'Gemini Omni',
    meta: 'Multimodal model',
    icon: 'Gemini.Color',
    badge: '$0.010',
    className: 'from-orange-950 via-amber-600 to-stone-200',
  },
  {
    name: 'GPT Image 2',
    meta: 'Image generation',
    icon: 'OpenAI.Color',
    badge: '$0.040',
    className: 'from-violet-950 via-fuchsia-600 to-orange-200',
  },
  {
    name: 'GPT 5.4',
    meta: 'Frontier LLM',
    icon: 'OpenAI',
    badge: '$0.030',
    className: 'from-slate-950 via-slate-900 to-black',
  },
  {
    name: 'Grok Imagine 1.5',
    meta: 'Creative image model',
    icon: 'Grok.Color',
    badge: '$0.025',
    className: 'from-black via-zinc-900 to-orange-700',
  },
  {
    name: 'Sora 2',
    meta: 'OpenAI video model',
    icon: 'OpenAI.Color',
    badge: '$0.120',
    className: 'from-slate-900 via-blue-950 to-blue-500',
  },
  {
    name: 'Wan 2.7 Video',
    meta: 'Cinematic video',
    icon: 'Qwen.Color',
    badge: '$0.070',
    className: 'from-indigo-950 via-blue-700 to-cyan-300',
  },
] as const

export function ModelShowcase() {
  const { t } = useTranslation()

  return (
    <section
      id='model-api'
      className='bg-muted/20 relative z-10 scroll-mt-24 border-y border-border/40 px-4 py-20 md:py-24'
    >
      <div className='mx-auto max-w-4xl'>
        <AnimateInView className='text-center'>
          <div className='mb-4 inline-flex items-center gap-2 rounded-full border border-violet-500/15 bg-violet-500/5 px-3 py-1.5 text-xs font-medium text-violet-700 dark:text-violet-300'>
            <Sparkles className='size-3.5' />
            {t('Popular models')}
          </div>
          <h2 className='text-2xl font-bold tracking-tight md:text-4xl'>
            {t('Hot AI API models')}
          </h2>
          <p className='mx-auto mt-3 max-w-xl text-sm leading-6 text-muted-foreground md:text-base'>
            {t(
              'Route text, image, and video models from one console, with consistent keys, limits, and billing.'
            )}
          </p>
        </AnimateInView>

        <div className='mt-10 grid gap-4 sm:grid-cols-2 lg:grid-cols-3'>
          {featuredModels.map((model, index) => (
            <AnimateInView
              key={model.name}
              delay={index * 45}
              animation='scale-in'
              className='group'
            >
              <div
                className={`relative flex aspect-[1.55] overflow-hidden rounded-xl bg-gradient-to-br ${model.className} p-4 shadow-sm ring-1 ring-black/5 transition duration-300 group-hover:-translate-y-1 group-hover:shadow-xl dark:ring-white/10`}
              >
                <div className='absolute inset-0 bg-[radial-gradient(circle_at_22%_18%,rgba(255,255,255,0.36),transparent_32%),linear-gradient(180deg,transparent,rgba(0,0,0,0.54))]' />
                <div className='relative z-10 flex h-full w-full flex-col justify-between'>
                  <div className='flex items-start justify-between gap-3'>
                    <div className='flex size-10 items-center justify-center rounded-full bg-white/90 shadow-sm'>
                      {getLobeIcon(model.icon, 24)}
                    </div>
                    <span className='rounded-full bg-white/90 px-2.5 py-1 text-[11px] font-semibold text-slate-900 shadow-sm'>
                      {model.badge}
                    </span>
                  </div>
                  <div>
                    <h3 className='text-lg font-bold text-white drop-shadow-sm'>
                      {model.name}
                    </h3>
                    <p className='mt-1 text-xs font-medium text-white/78'>
                      {t(model.meta)}
                    </p>
                  </div>
                </div>
              </div>
            </AnimateInView>
          ))}
        </div>

        <AnimateInView className='mt-8 flex justify-center'>
          <Button
            variant='outline'
            className='rounded-full border-border/70 bg-background px-5 shadow-sm'
            render={<Link to='/pricing' />}
          >
            {t('View all models')}
            <ArrowRight className='ml-2 size-4' />
          </Button>
        </AnimateInView>
      </div>
    </section>
  )
}
