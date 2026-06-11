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
import { EXPLORE_CHIPS, type ExploreChipId } from '../constants'

interface CategoryChipsProps {
  active: ExploreChipId
  onChange: (id: ExploreChipId) => void
}

export function CategoryChips(props: CategoryChipsProps) {
  const { t } = useTranslation()
  return (
    <div
      className='-mx-1 flex flex-wrap items-center gap-2 overflow-x-auto pb-1'
      role='toolbar'
      aria-label={t('Model categories')}
    >
      {EXPLORE_CHIPS.map((chip) => {
        const isActive = chip.id === props.active
        return (
          <button
            key={chip.id}
            type='button'
            aria-pressed={isActive}
            onClick={() => props.onChange(chip.id)}
            className={cn(
              'inline-flex h-9 shrink-0 items-center rounded-full border px-4 text-sm font-medium transition-colors',
              'focus-visible:ring-ring/40 focus-visible:ring-2 focus-visible:outline-none',
              isActive
                ? 'border-foreground/30 bg-foreground/5 text-foreground shadow-sm'
                : 'border-border/70 bg-background text-muted-foreground hover:border-border hover:bg-muted/50 hover:text-foreground'
            )}
          >
            {t(chip.labelKey)}
          </button>
        )
      })}
    </div>
  )
}
