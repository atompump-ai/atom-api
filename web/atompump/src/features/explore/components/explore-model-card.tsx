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
import { cn } from '@/lib/utils'

interface ExploreModelCardProps {
  icon: React.ReactNode
  name: string
  description?: string
  pills: string[]
}

export function ExploreModelCard(props: ExploreModelCardProps) {
  return (
    <article
      className={cn(
        'group flex h-full flex-col gap-3 rounded-2xl border border-border/60 bg-card p-4 transition-colors',
        'hover:border-border hover:bg-muted/30'
      )}
    >
      <div className='flex items-start gap-3'>
        <div className='bg-muted/40 flex size-10 shrink-0 items-center justify-center overflow-hidden rounded-lg'>
          {props.icon}
        </div>
        <div className='min-w-0 flex-1'>
          <h3
            className='text-foreground truncate text-[15px] leading-tight font-semibold'
            title={props.name}
          >
            {props.name}
          </h3>
        </div>
      </div>
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
    </article>
  )
}
