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
import { cn } from '@/lib/utils'
import { FILTER_ALL } from '../constants'
import type { TagCount, VendorCount } from '../lib'

interface ExploreSidebarProps {
  vendors: VendorCount[]
  tags: TagCount[]
  selectedVendor: string
  selectedTag: string
  onSelectVendor: (vendor: string) => void
  onSelectTag: (tag: string) => void
}

interface FilterRowProps {
  label: string
  count: number
  active: boolean
  onClick: () => void
}

function FilterRow(props: FilterRowProps) {
  return (
    <button
      type='button'
      onClick={props.onClick}
      className={cn(
        'flex w-full items-center justify-between gap-2 rounded-md px-2 py-2 text-left text-sm transition-colors',
        'focus-visible:ring-ring/40 focus-visible:ring-2 focus-visible:outline-none',
        props.active
          ? 'bg-foreground/5 text-foreground'
          : 'text-muted-foreground hover:bg-muted/40 hover:text-foreground'
      )}
    >
      <span className='truncate'>{props.label}</span>
      <span
        className={cn(
          'shrink-0 rounded-full px-1.5 text-xs font-medium tabular-nums',
          props.active ? 'text-foreground/70' : 'text-muted-foreground/60'
        )}
      >
        {props.count}
      </span>
    </button>
  )
}

interface SectionProps {
  title: string
  children: React.ReactNode
}

function Section(props: SectionProps) {
  return (
    <div className='flex flex-col gap-2'>
      <h2 className='text-foreground px-2 text-xs font-semibold tracking-wide uppercase'>
        {props.title}
      </h2>
      <div className='flex flex-col'>{props.children}</div>
    </div>
  )
}

export function ExploreSidebar(props: ExploreSidebarProps) {
  const { t } = useTranslation()
  return (
    <aside className='flex flex-col gap-6'>
      <Section title={t('Filters')}>
        <FilterRow
          label={t('All categories')}
          count={
            props.vendors.reduce((sum, item) => sum + item.count, 0) || 0
          }
          active={
            props.selectedVendor === FILTER_ALL &&
            props.selectedTag === FILTER_ALL
          }
          onClick={() => {
            props.onSelectVendor(FILTER_ALL)
            props.onSelectTag(FILTER_ALL)
          }}
        />
      </Section>
      <Section title={t('Providers')}>
        {props.vendors.length === 0 ? (
          <p className='text-muted-foreground/60 px-2 py-1.5 text-xs'>
            {t('No models available.')}
          </p>
        ) : (
          props.vendors.map((vendor) => (
            <FilterRow
              key={vendor.name}
              label={vendor.name}
              count={vendor.count}
              active={props.selectedVendor === vendor.name}
              onClick={() =>
                props.onSelectVendor(
                  props.selectedVendor === vendor.name
                    ? FILTER_ALL
                    : vendor.name
                )
              }
            />
          ))
        )}
      </Section>
      <Section title={t('Tags')}>
        {props.tags.length === 0 ? (
          <p className='text-muted-foreground/60 px-2 py-1.5 text-xs'>
            {t('No models available.')}
          </p>
        ) : (
          props.tags.map((tag) => (
            <FilterRow
              key={tag.name}
              label={tag.name}
              count={tag.count}
              active={props.selectedTag === tag.name}
              onClick={() =>
                props.onSelectTag(
                  props.selectedTag === tag.name ? FILTER_ALL : tag.name
                )
              }
            />
          ))
        )}
      </Section>
    </aside>
  )
}
