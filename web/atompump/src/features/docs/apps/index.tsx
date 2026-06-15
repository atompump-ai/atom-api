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
import { ArrowRight, Check, Copy, KeyRound, Link2, Server } from 'lucide-react'
import { useState } from 'react'
import { useTranslation } from 'react-i18next'
import { AnimateInView } from '@/components/animate-in-view'
import { PublicLayout } from '@/components/layout'
import { Footer } from '@/components/layout/components/footer'
import { Button } from '@/components/ui/button'
import { cn } from '@/lib/utils'
import {
  APP_GUIDES,
  CLI_AGENT_GUIDES,
  CONFIG_SNIPPET,
  CONNECTION_FIELDS,
  DOCS_ANCHORS,
  DOCS_STATS,
  OPENAI_COMPATIBLE_EXAMPLE,
  PROTOCOL_PATHS,
  QUICK_STEPS,
  TROUBLESHOOTING,
} from './constants'

function CodeBlock(props: { code: string; label: string }) {
  const { t } = useTranslation()
  const [copied, setCopied] = useState(false)

  const copyWithFallback = () => {
    const textarea = document.createElement('textarea')
    textarea.value = props.code
    textarea.setAttribute('readonly', '')
    textarea.style.position = 'fixed'
    textarea.style.opacity = '0'
    document.body.appendChild(textarea)
    textarea.select()
    const didCopy = document.execCommand('copy')
    document.body.removeChild(textarea)
    return didCopy
  }

  const handleCopy = async () => {
    setCopied(true)
    window.setTimeout(() => setCopied(false), 1500)
    let didCopy = false
    try {
      if (navigator.clipboard) {
        await navigator.clipboard.writeText(props.code)
        didCopy = true
      }
    } catch {
      didCopy = copyWithFallback()
    }
    if (!didCopy) {
      didCopy = copyWithFallback()
    }
    if (!didCopy) {
      setCopied(false)
    }
  }

  return (
    <div className='overflow-hidden rounded-xl border border-border/60 bg-[#0b1020] text-white shadow-sm'>
      <div className='flex items-center justify-between border-b border-white/10 px-4 py-3'>
        <span className='text-xs font-semibold text-white/70'>
          {t(props.label)}
        </span>
        <button
          type='button'
          onClick={() => {
            void handleCopy()
          }}
          aria-label={copied ? t('Copied') : t('Copy')}
          className='inline-flex h-7 items-center gap-1.5 rounded-md px-2 text-xs font-medium text-white/60 transition-colors hover:bg-white/10 hover:text-white'
        >
          <Copy className='size-3.5' aria-hidden='true' />
          {copied ? t('Copied') : t('Copy')}
        </button>
      </div>
      <pre className='overflow-x-auto p-4 text-xs leading-6 text-violet-50 sm:text-sm'>
        <code>{props.code}</code>
      </pre>
    </div>
  )
}

function AnchorNav() {
  const { t } = useTranslation()

  return (
    <aside className='hidden xl:block'>
      <div className='sticky top-24 rounded-xl border border-border/60 bg-background/80 p-4 backdrop-blur-xl'>
        <p className='text-xs font-semibold tracking-wider text-muted-foreground uppercase'>
          {t('On this page')}
        </p>
        <nav className='mt-3 flex flex-col gap-1'>
          {DOCS_ANCHORS.map((item) => (
            <a
              key={item.id}
              href={`#${item.id}`}
              className='rounded-lg px-2 py-1.5 text-sm text-muted-foreground transition-colors hover:bg-muted hover:text-foreground'
            >
              {t(item.label)}
            </a>
          ))}
        </nav>
      </div>
    </aside>
  )
}

function DocsHero() {
  const { t } = useTranslation()

  return (
    <section className='relative overflow-hidden px-4 pt-28 pb-12 md:pt-32 md:pb-16'>
      <div className='pointer-events-none absolute inset-0 -z-10 bg-[radial-gradient(circle_at_50%_12%,rgba(124,58,237,0.16),transparent_36%),linear-gradient(180deg,rgba(250,250,252,0.96),rgba(255,255,255,0))] dark:bg-[radial-gradient(circle_at_50%_12%,rgba(124,58,237,0.22),transparent_38%)]' />
      <div className='mx-auto max-w-5xl text-center'>
        <div className='mx-auto flex w-fit items-center gap-2 rounded-full border border-violet-500/20 bg-violet-500/10 px-4 py-2 text-sm font-medium text-violet-700 dark:text-violet-200'>
          <Link2 className='size-4' aria-hidden='true' />
          {t('AI Agent client integration')}
        </div>
        <h1 className='mt-6 text-[clamp(2.25rem,6vw,4.75rem)] leading-[1.05] font-black tracking-tight'>
          {t('Connect AI Agent clients to AtomPump')}
        </h1>
        <p className='mx-auto mt-5 max-w-3xl text-base leading-7 text-muted-foreground md:text-lg'>
          {t(
            'Use one OpenAI-compatible endpoint to connect chat clients, IDE agents, workflow builders, and self-hosted AI apps to the models managed by AtomPump.'
          )}
        </p>
        <div className='mt-8 flex flex-wrap items-center justify-center gap-3'>
          <Button
            className='group h-12 rounded-full px-6 text-sm font-semibold'
            render={<Link to='/explore' />}
          >
            {t('View model IDs')}
            <ArrowRight className='ml-2 size-4 transition-transform group-hover:translate-x-0.5' />
          </Button>
          <Button
            variant='outline'
            className='h-12 rounded-full px-6 text-sm font-semibold'
            render={<Link to='/pricing' />}
          >
            {t('Check pricing')}
          </Button>
        </div>
        <div className='mt-10 grid gap-3 sm:grid-cols-3'>
          {DOCS_STATS.map((item) => {
            const Icon = item.icon
            return (
              <div
                key={item.label}
                className='rounded-xl border border-border/60 bg-background/70 p-4 text-left shadow-sm backdrop-blur'
              >
                <Icon className='size-5 text-violet-600 dark:text-violet-300' />
                <p className='mt-3 text-2xl font-bold'>{item.value}</p>
                <p className='text-sm text-muted-foreground'>{t(item.label)}</p>
              </div>
            )
          })}
        </div>
      </div>
    </section>
  )
}

function SectionHeading(props: {
  id: string
  eyebrow: string
  title: string
  description: string
}) {
  const { t } = useTranslation()

  return (
    <div id={props.id} className='scroll-mt-24'>
      <p className='text-xs font-semibold tracking-wider text-violet-600 uppercase dark:text-violet-300'>
        {t(props.eyebrow)}
      </p>
      <h2 className='mt-2 text-2xl font-bold tracking-tight md:text-3xl'>
        {t(props.title)}
      </h2>
      <p className='mt-3 max-w-3xl text-sm leading-6 text-muted-foreground md:text-base'>
        {t(props.description)}
      </p>
    </div>
  )
}

function QuickStart() {
  const { t } = useTranslation()

  return (
    <section className='space-y-6'>
      <SectionHeading
        id='quick-start'
        eyebrow='Start here'
        title='Five-minute setup'
        description='Most AI Agent clients can connect through the same OpenAI-compatible fields. Configure the client once, then switch models from AtomPump.'
      />
      <div className='grid gap-4 lg:grid-cols-[minmax(0,1fr)_minmax(320px,0.86fr)]'>
        <div className='rounded-xl border border-border/60 bg-background p-5 shadow-sm'>
          <ol className='space-y-4'>
            {QUICK_STEPS.map((step, index) => (
              <li key={step} className='flex gap-3'>
                <span className='flex size-7 shrink-0 items-center justify-center rounded-full bg-violet-600 text-xs font-bold text-white'>
                  {index + 1}
                </span>
                <span className='pt-1 text-sm leading-6 text-muted-foreground'>
                  {t(step)}
                </span>
              </li>
            ))}
          </ol>
        </div>
        <CodeBlock code={OPENAI_COMPATIBLE_EXAMPLE} label='Test request' />
      </div>
    </section>
  )
}

function ConnectionFields() {
  const { t } = useTranslation()
  const icons = [Server, KeyRound, Check]

  return (
    <section className='space-y-6'>
      <SectionHeading
        id='connection-fields'
        eyebrow='Required fields'
        title='The three values every client needs'
        description='Different clients use different labels, but the values are the same: endpoint, key, and model.'
      />
      <div className='grid gap-4 md:grid-cols-3'>
        {CONNECTION_FIELDS.map((field, index) => {
          const Icon = icons[index] ?? Check
          return (
            <div
              key={field.label}
              className='rounded-xl border border-border/60 bg-background p-5 shadow-sm'
            >
              <Icon className='size-5 text-violet-600 dark:text-violet-300' />
              <h3 className='mt-4 text-sm font-semibold'>{t(field.label)}</h3>
              <p className='mt-2 break-words rounded-lg bg-muted px-3 py-2 font-mono text-xs text-foreground'>
                {field.value}
              </p>
              <p className='mt-3 text-sm leading-6 text-muted-foreground'>
                {t(field.description)}
              </p>
            </div>
          )
        })}
      </div>
      <CodeBlock code={CONFIG_SNIPPET} label='Generic client config' />
    </section>
  )
}

function ProtocolPaths() {
  const { t } = useTranslation()

  return (
    <section className='space-y-6'>
      <SectionHeading
        id='protocols'
        eyebrow='Protocol paths'
        title='Supported protocol paths'
        description='Pick the route that matches the client protocol. Most apps use Chat Completions; coding agents may use Responses or Claude Messages.'
      />
      <div className='grid gap-4 md:grid-cols-2'>
        {PROTOCOL_PATHS.map((item) => (
          <div
            key={item.path}
            className='rounded-xl border border-border/60 bg-background p-5 shadow-sm'
          >
            <h3 className='text-sm font-semibold'>{t(item.label)}</h3>
            <p className='mt-3 break-words rounded-lg bg-muted px-3 py-2 font-mono text-xs text-foreground'>
              {item.path}
            </p>
            <p className='mt-3 text-sm leading-6 text-muted-foreground'>
              {t(item.description)}
            </p>
          </div>
        ))}
      </div>
    </section>
  )
}

function ClientGuides() {
  const { t } = useTranslation()

  return (
    <section className='space-y-6'>
      <SectionHeading
        id='clients'
        eyebrow='Client guides'
        title='Popular AI Agent clients'
        description='Use these recipes when a client asks for OpenAI Compatible, Custom OpenAI, API Host, or Base URL settings.'
      />
      <div className='grid gap-4 lg:grid-cols-2'>
        {APP_GUIDES.map((app) => {
          const Icon = app.icon
          return (
            <AnimateInView key={app.name} animation='fade-up'>
              <article className='h-full rounded-xl border border-border/60 bg-background p-5 shadow-sm transition duration-200 hover:-translate-y-0.5 hover:shadow-md'>
                <div className='flex items-start gap-4'>
                  <div className='flex size-11 shrink-0 items-center justify-center rounded-xl bg-violet-500/10 text-violet-600 dark:text-violet-300'>
                    <Icon className='size-5' />
                  </div>
                  <div className='min-w-0'>
                    <h3 className='text-base font-semibold'>{app.name}</h3>
                    <p className='mt-1 text-sm leading-6 text-muted-foreground'>
                      {t(app.description)}
                    </p>
                  </div>
                </div>
                <dl className='mt-5 grid gap-3 text-sm'>
                  <div>
                    <dt className='font-medium text-foreground'>
                      {t('Best for')}
                    </dt>
                    <dd className='mt-1 text-muted-foreground'>
                      {t(app.bestFor)}
                    </dd>
                  </div>
                  <div>
                    <dt className='font-medium text-foreground'>
                      {t('Where to configure')}
                    </dt>
                    <dd className='mt-1 rounded-lg bg-muted px-3 py-2 font-mono text-xs text-foreground'>
                      {app.setupPath}
                    </dd>
                  </div>
                </dl>
                <ol className='mt-5 space-y-2'>
                  {app.steps.map((step) => (
                    <li key={step} className='flex gap-2 text-sm leading-6'>
                      <Check
                        className='mt-1 size-4 shrink-0 text-violet-600 dark:text-violet-300'
                        aria-hidden='true'
                      />
                      <span className='text-muted-foreground'>{t(step)}</span>
                    </li>
                  ))}
                </ol>
                <p className='mt-5 rounded-lg border border-violet-500/20 bg-violet-500/10 px-3 py-2 text-sm leading-6 text-violet-800 dark:text-violet-100'>
                  {t(app.tip)}
                </p>
              </article>
            </AnimateInView>
          )
        })}
      </div>
    </section>
  )
}

function CliAgents() {
  const { t } = useTranslation()

  return (
    <section className='space-y-6'>
      <SectionHeading
        id='cli-agents'
        eyebrow='CLI and coding agents'
        title='CLI and coding agents'
        description='Use these patterns when a terminal agent, IDE agent, or bot framework asks for provider environment variables or a config file.'
      />
      <div className='grid gap-4 lg:grid-cols-2'>
        {CLI_AGENT_GUIDES.map((app) => {
          const Icon = app.icon
          return (
            <AnimateInView key={app.name} animation='fade-up'>
              <article className='h-full rounded-xl border border-border/60 bg-background p-5 shadow-sm'>
                <div className='flex items-start gap-4'>
                  <div className='flex size-11 shrink-0 items-center justify-center rounded-xl bg-violet-500/10 text-violet-600 dark:text-violet-300'>
                    <Icon className='size-5' />
                  </div>
                  <div className='min-w-0'>
                    <h3 className='text-base font-semibold'>{app.name}</h3>
                    <p className='mt-1 text-sm leading-6 text-muted-foreground'>
                      {t(app.description)}
                    </p>
                  </div>
                </div>
                <dl className='mt-5 grid gap-3 text-sm'>
                  <div>
                    <dt className='font-medium text-foreground'>
                      {t('Protocol')}
                    </dt>
                    <dd className='mt-1 text-muted-foreground'>
                      {t(app.protocol)}
                    </dd>
                  </div>
                </dl>
                <ol className='mt-5 space-y-2'>
                  {app.steps.map((step) => (
                    <li key={step} className='flex gap-2 text-sm leading-6'>
                      <Check
                        className='mt-1 size-4 shrink-0 text-violet-600 dark:text-violet-300'
                        aria-hidden='true'
                      />
                      <span className='text-muted-foreground'>{t(step)}</span>
                    </li>
                  ))}
                </ol>
                <div className='mt-5'>
                  <CodeBlock code={app.config} label='Example config' />
                </div>
                <p className='mt-5 rounded-lg border border-violet-500/20 bg-violet-500/10 px-3 py-2 text-sm leading-6 text-violet-800 dark:text-violet-100'>
                  <span className='font-medium'>{t('Important note')}</span>
                  {': '}
                  {t(app.note)}
                </p>
              </article>
            </AnimateInView>
          )
        })}
      </div>
    </section>
  )
}

function Troubleshooting() {
  const { t } = useTranslation()

  return (
    <section className='space-y-6'>
      <SectionHeading
        id='troubleshooting'
        eyebrow='Troubleshooting'
        title='Common connection issues'
        description='Most failures come from endpoint formatting, model names, key scope, or browser network access.'
      />
      <div className='divide-y divide-border/60 rounded-xl border border-border/60 bg-background shadow-sm'>
        {TROUBLESHOOTING.map((item) => (
          <div key={item.question} className='p-5'>
            <h3 className='text-sm font-semibold'>{t(item.question)}</h3>
            <p className='mt-2 text-sm leading-6 text-muted-foreground'>
              {t(item.answer)}
            </p>
          </div>
        ))}
      </div>
    </section>
  )
}

export function DocsApps() {
  return (
    <PublicLayout showMainContainer={false}>
      <DocsHero />
      <div className='mx-auto grid max-w-7xl gap-10 px-4 pb-20 xl:grid-cols-[minmax(0,1fr)_14rem]'>
        <main className={cn('min-w-0 space-y-16')}>
          <QuickStart />
          <ConnectionFields />
          <ProtocolPaths />
          <ClientGuides />
          <CliAgents />
          <Troubleshooting />
        </main>
        <AnchorNav />
      </div>
      <Footer />
    </PublicLayout>
  )
}
