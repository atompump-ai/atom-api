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
import { Bot, Building2, FileCode2 } from 'lucide-react'
import { useTranslation } from 'react-i18next'
import { AnimateInView } from '@/components/animate-in-view'

const possibilities = [
  {
    title: 'Autonomous agents',
    description:
      'Give agents one stable API for planning, tool use, vision, and long-running tasks.',
    icon: Bot,
    color: 'text-blue-600 bg-blue-500/10',
  },
  {
    title: 'Automated content production',
    description:
      'Combine LLMs, image generation, and video models for repeatable media workflows.',
    icon: FileCode2,
    color: 'text-violet-600 bg-violet-500/10',
  },
  {
    title: 'Enterprise AI gateways',
    description:
      'Centralize keys, routing policies, budgets, and audit trails for internal teams.',
    icon: Building2,
    color: 'text-emerald-600 bg-emerald-500/10',
  },
] as const

export function BuildPossibilities() {
  const { t } = useTranslation()

  return (
    <section className='relative z-10 px-4 py-20 md:py-28'>
      <div className='mx-auto max-w-5xl'>
        <AnimateInView className='text-center'>
          <h2 className='text-2xl font-bold tracking-tight md:text-4xl'>
            {t('Build without limits with AtomPump')}
          </h2>
          <p className='mx-auto mt-3 max-w-2xl text-sm leading-6 text-muted-foreground md:text-base'>
            {t(
              'From agents to media pipelines and internal platforms, AtomPump gives every team one AI API control layer.'
            )}
          </p>
        </AnimateInView>

        <div className='mt-10 grid gap-4 md:grid-cols-3'>
          {possibilities.map((item, index) => {
            const Icon = item.icon
            return (
              <AnimateInView
                key={item.title}
                delay={index * 90}
                animation='fade-up'
              >
                <div className='h-full rounded-xl border border-border/60 bg-background p-6 shadow-sm transition duration-300 hover:-translate-y-1 hover:shadow-lg'>
                  <div
                    className={`mb-5 flex size-11 items-center justify-center rounded-xl ${item.color}`}
                  >
                    <Icon className='size-5' />
                  </div>
                  <h3 className='text-base font-bold'>{t(item.title)}</h3>
                  <p className='mt-3 text-sm leading-6 text-muted-foreground'>
                    {t(item.description)}
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
