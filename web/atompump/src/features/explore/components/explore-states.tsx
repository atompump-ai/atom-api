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
import { Button } from '@/components/ui/button'
import { EXPLORE_SKELETON_COUNT } from '../constants'

export function ExploreSkeleton() {
  return (
    <div
      className='grid grid-cols-1 gap-4 sm:grid-cols-2 xl:grid-cols-3'
      aria-hidden='true'
    >
      {Array.from({ length: EXPLORE_SKELETON_COUNT }).map((_, idx) => (
        <div
          key={idx}
          className='flex h-full flex-col gap-3 rounded-2xl border border-border/60 bg-card p-4'
        >
          <div className='flex items-start gap-3'>
            <div className='bg-muted size-10 animate-pulse rounded-lg' />
            <div className='bg-muted h-4 flex-1 animate-pulse rounded' />
          </div>
          <div className='space-y-2'>
            <div className='bg-muted h-3 w-full animate-pulse rounded' />
            <div className='bg-muted h-3 w-2/3 animate-pulse rounded' />
          </div>
          <div className='flex gap-1.5'>
            <div className='bg-muted h-5 w-12 animate-pulse rounded-full' />
            <div className='bg-muted h-5 w-10 animate-pulse rounded-full' />
          </div>
        </div>
      ))}
    </div>
  )
}

interface ExploreEmptyStateProps {
  onClear?: () => void
}

export function ExploreEmptyState(props: ExploreEmptyStateProps) {
  const { t } = useTranslation()
  return (
    <div className='flex flex-col items-center justify-center gap-3 rounded-2xl border border-dashed border-border/60 bg-card/40 px-6 py-16 text-center'>
      <p className='text-muted-foreground text-sm'>
        {t('No models available.')}
      </p>
      {props.onClear && (
        <Button variant='outline' size='sm' onClick={props.onClear}>
          {t('Clear filters')}
        </Button>
      )}
    </div>
  )
}
