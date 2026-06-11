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
import { Fragment } from 'react'
import { Link } from '@tanstack/react-router'
import { useTranslation } from 'react-i18next'
import { cn } from '@/lib/utils'
import { useStatus } from '@/hooks/use-status'
import { useSystemConfig } from '@/hooks/use-system-config'

interface FooterLink {
  text: string
  href: string
}

interface FooterColumnProps {
  title: string
  links: FooterLink[]
}

interface FooterProps {
  logo?: string
  name?: string
  columns?: FooterColumnProps[]
  copyright?: string
  className?: string
}

// Renders User Agreement / Privacy Policy links inline with the parent's
// copyright row when either is configured in System Settings → Site. Emits
// fragmented siblings so the parent flex container's gap controls spacing.
function LegalLinks(props: { leadingSeparator?: boolean }) {
  const { t } = useTranslation()
  const { status } = useStatus()
  const items: { key: string; label: string; href: string }[] = []
  if (status?.user_agreement_enabled) {
    items.push({
      key: 'user-agreement',
      label: t('User Agreement'),
      href: '/user-agreement',
    })
  }
  if (status?.privacy_policy_enabled) {
    items.push({
      key: 'privacy-policy',
      label: t('Privacy Policy'),
      href: '/privacy-policy',
    })
  }
  if (items.length === 0) {
    return null
  }
  return (
    <>
      {items.map((item, index) => (
        <Fragment key={item.key}>
          {(props.leadingSeparator || index > 0) && (
            <span aria-hidden='true' className='text-muted-foreground/30'>
              ·
            </span>
          )}
          <Link
            to={item.href}
            className='hover:text-foreground transition-colors duration-200'
          >
            {item.label}
          </Link>
        </Fragment>
      ))}
    </>
  )
}

function FooterInfo() {
  const { t } = useTranslation()

  return (
    <div className='grid gap-8 border-b border-border/40 pb-8 sm:grid-cols-[minmax(0,1.2fr)_minmax(160px,0.8fr)]'>
      <section aria-labelledby='footer-contact-heading' className='space-y-4'>
        <h2
          id='footer-contact-heading'
          className='text-sm font-semibold text-foreground'
        >
          {t('Contact Us')}
        </h2>
        <div className='grid gap-4 text-sm text-muted-foreground sm:grid-cols-2'>
          <div className='space-y-1.5'>
            <p className='font-medium text-foreground/80'>{t('Personal Users')}</p>
            <a
              href='mailto:support@atompump.ai'
              className='break-all transition-colors hover:text-foreground'
            >
              support@atompump.ai
            </a>
          </div>
          <div className='space-y-1.5'>
            <p className='font-medium text-foreground/80'>
              {t('Business Cooperation')}
            </p>
            <a
              href='mailto:business@atompump.ai'
              className='break-all transition-colors hover:text-foreground'
            >
              business@atompump.ai
            </a>
          </div>
          <div className='space-y-1.5 sm:col-span-2'>
            <p className='font-medium text-foreground/80'>{t('Payment Methods')}</p>
            <p>xxxx</p>
          </div>
        </div>
      </section>

      <section aria-labelledby='footer-about-heading' className='space-y-4'>
        <h2
          id='footer-about-heading'
          className='text-sm font-semibold text-foreground'
        >
          {t('About')}
        </h2>
        <nav className='flex flex-col items-start gap-3 text-sm text-muted-foreground'>
          <Link
            to='/about'
            className='transition-colors hover:text-foreground'
          >
            {t('Contact Us')}
          </Link>
          <Link
            to='/about'
            className='transition-colors hover:text-foreground'
          >
            {t('Help Center')}
          </Link>
          <Link
            to='/privacy-policy'
            className='transition-colors hover:text-foreground'
          >
            {t('Privacy Policy')}
          </Link>
          <Link
            to='/pricing'
            className='transition-colors hover:text-foreground'
          >
            {t('Pricing')}
          </Link>
        </nav>
      </section>
    </div>
  )
}

export function Footer(props: FooterProps) {
  const { t } = useTranslation()
  const { systemName, footerHtml } = useSystemConfig()

  const displayName =
    props.name || (systemName && systemName !== 'New API' ? systemName : 'AtomPump')
  const currentYear = new Date().getFullYear()

  if (footerHtml) {
    return (
      <footer
        className={cn(
          'border-border/40 relative z-10 border-t',
          props.className
        )}
      >
        <div className='mx-auto max-w-7xl px-4 py-8 sm:px-6'>
          <FooterInfo />
          <div className='flex flex-col gap-4 pt-6 text-sm text-muted-foreground sm:flex-row sm:items-center sm:justify-between'>
            <div className='custom-footer min-w-0 text-left'>
              <div dangerouslySetInnerHTML={{ __html: footerHtml }} />
            </div>

            <div className='flex shrink-0 items-center gap-4 font-medium'>
              <LegalLinks />
            </div>
          </div>
        </div>
      </footer>
    )
  }

  return (
    <footer
      className={cn('border-border/40 relative z-10 border-t', props.className)}
    >
      <div className='mx-auto max-w-7xl px-4 py-8 sm:px-6'>
        <FooterInfo />
        <div className='flex flex-col gap-4 pt-6 sm:flex-row sm:items-center sm:justify-between'>
          <div className='flex min-w-0 items-center justify-between gap-6 text-sm text-muted-foreground'>
            <p className='min-w-0 truncate'>
              &copy; {currentYear} {displayName}.{' '}
              {props.copyright ?? t('footer.defaultCopyright')}
            </p>
          </div>

          <div className='flex shrink-0 items-center gap-4 text-sm font-medium text-muted-foreground'>
            <LegalLinks />
          </div>
        </div>
      </div>
    </footer>
  )
}
