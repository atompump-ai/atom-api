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
import { ArrowRight, TerminalSquare } from 'lucide-react'
import { useTranslation } from 'react-i18next'
import { Button } from '@/components/ui/button'
import { AnimateInView } from '@/components/animate-in-view'

const codeLines = [
  "from openai import OpenAI",
  '',
  'client = OpenAI(',
  '    api_key="sk-atompump-key",',
  '    base_url="https://api.example.com/v1",',
  ')',
  '',
  'response = client.chat.completions.create(',
  '    model="gpt-5.4",',
  '    messages=[{"role": "user", "content": "Hello world"}],',
  ')',
] as const

export function DeveloperSection() {
  const { t } = useTranslation()

  return (
    <section className='bg-muted/20 relative z-10 border-y border-border/40 px-4 py-20 md:py-28'>
      <div className='mx-auto grid max-w-5xl items-center gap-10 md:grid-cols-[0.9fr_1.1fr]'>
        <AnimateInView>
          <div className='mb-4 inline-flex items-center gap-2 rounded-full border border-border/70 bg-background px-3 py-1.5 text-xs font-medium text-muted-foreground shadow-sm'>
            <TerminalSquare className='size-3.5 text-violet-500' />
            {t('Developer first')}
          </div>
          <h2 className='max-w-md text-3xl font-bold tracking-tight md:text-4xl'>
            {t('A polished experience for developers')}
          </h2>
          <p className='mt-4 max-w-lg text-sm leading-7 text-muted-foreground md:text-base'>
            {t(
              'Use familiar SDKs and OpenAI-compatible routes while AtomPump handles provider differences, routing, billing, and observability behind the scenes.'
            )}
          </p>
          <div className='mt-7 flex flex-wrap gap-3'>
            <Button className='rounded-full' render={<Link to='/sign-up' />}>
              {t('Get API Key')}
              <ArrowRight className='ml-2 size-4' />
            </Button>
            <Button
              variant='ghost'
              className='rounded-full'
              render={<Link to='/pricing' />}
            >
              {t('View models')}
            </Button>
          </div>
        </AnimateInView>

        <AnimateInView animation='fade-left'>
          <div className='overflow-hidden rounded-2xl border border-slate-800 bg-slate-950 shadow-2xl shadow-slate-950/20'>
            <div className='flex h-10 items-center justify-between border-b border-white/10 px-4'>
              <div className='flex gap-2'>
                <span className='size-2.5 rounded-full bg-red-400' />
                <span className='size-2.5 rounded-full bg-yellow-400' />
                <span className='size-2.5 rounded-full bg-emerald-400' />
              </div>
              <span className='text-[11px] text-slate-500'>main.py</span>
            </div>
            <pre className='overflow-x-auto p-5 text-xs leading-6 text-slate-300 md:text-sm'>
              <code>
                {codeLines.map((line, index) => (
                  <span key={`${line}-${index}`} className='block'>
                    <span className='mr-4 select-none text-slate-600'>
                      {String(index + 1).padStart(2, '0')}
                    </span>
                    <span
                      className={
                        line.includes('OpenAI') || line.includes('model')
                          ? 'text-cyan-300'
                          : line.includes('api_key') ||
                              line.includes('base_url') ||
                              line.includes('messages')
                            ? 'text-emerald-300'
                            : line.includes('"')
                              ? 'text-violet-200'
                              : ''
                      }
                    >
                      {line || ' '}
                    </span>
                  </span>
                ))}
              </code>
            </pre>
          </div>
        </AnimateInView>
      </div>
    </section>
  )
}
