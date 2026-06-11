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
import { useMemo } from 'react'
import { cn } from '@/lib/utils'

export interface ExploreModelCardCover {
  /**
   * Pre-rendered Lobe icon node, or undefined when the model has no
   * `icon` / `vendor_icon` and the card should fall back to a letter.
   */
  icon: React.ReactNode
  /**
   * Display label for the corner badge (vendor name, model owner, or
   * "AtomPump" fallback). Used to seed the gradient hue.
   */
  badge: string
  /**
   * Single-character fallback shown in the center of the cover when
   * no icon is available. Defaults to the first letter of the model
   * name and '?' when empty.
   */
  initial?: string
}

interface ExploreModelCardProps {
  name: string
  description?: string
  pills: string[]
  cover: ExploreModelCardCover
}

/**
 * Hash a string to a stable [0, 360) hue so each card cover gets a
 * distinct gradient without us shipping a colour palette.
 */
function hashToHue(input: string): number {
  let hash = 0
  for (let i = 0; i < input.length; i += 1) {
    hash = (hash * 31 + input.charCodeAt(i)) >>> 0
  }
  return hash % 360
}

export function ExploreModelCard(props: ExploreModelCardProps) {
  const hue = useMemo(
    () => hashToHue(props.cover.badge || props.name),
    [props.cover.badge, props.name]
  )
  const coverStyle = useMemo(
    () =>
      ({
        backgroundImage: `linear-gradient(135deg, hsl(${hue} 55% 28%) 0%, hsl(${(hue + 40) % 360} 65% 22%) 60%, hsl(${(hue + 80) % 360} 45% 16%) 100%)`,
      }) as const,
    [hue]
  )

  return (
    <article
      className={cn(
        'group flex h-full flex-col overflow-hidden rounded-2xl border border-border/60 bg-card transition-colors',
        'hover:border-border hover:bg-muted/30'
      )}
    >
      <div
        className='relative aspect-[16/9] w-full overflow-hidden'
        style={coverStyle}
        aria-hidden='true'
      >
        <div className='absolute inset-0 flex items-center justify-center text-white/90'>
          {props.cover.icon ?? (
            <span className='text-3xl font-black tracking-tight drop-shadow-sm'>
              {(props.cover.initial ||
                props.name.charAt(0) ||
                '?').toUpperCase()}
            </span>
          )}
        </div>
        {props.cover.badge && (
          <span className='text-foreground/85 absolute right-2 top-2 inline-flex h-5 items-center gap-1 rounded-full border border-white/30 bg-white/90 px-1.5 text-[10px] font-semibold tracking-wide shadow-sm backdrop-blur-sm uppercase'>
            {props.cover.badge}
          </span>
        )}
      </div>
      <div className='flex flex-1 flex-col gap-3 p-4'>
        <h3
          className='text-foreground truncate text-[15px] leading-tight font-semibold'
          title={props.name}
        >
          {props.name}
        </h3>
        <p className='text-muted-foreground line-clamp-2 min-h-[2.5rem] flex-1 text-sm leading-6'>
          {props.description || '—'}
        </p>
        {props.pills.length > 0 && (
          <div className='flex flex-wrap items-center gap-1.5'>
            {props.pills.map((pill) => (
              <span
                key={pill}
                className='text-muted-foreground bg-muted/40 inline-flex h-6 items-center rounded-full px-2 text-xs font-medium'
              >
                {pill}
              </span>
            ))}
          </div>
        )}
      </div>
    </article>
  )
}
