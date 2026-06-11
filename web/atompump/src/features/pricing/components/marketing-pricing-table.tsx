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
import { Fragment, useMemo } from 'react'
import { useTranslation } from 'react-i18next'
import { getLobeIcon } from '@/lib/lobe-icon'
import { StatusBadge } from '@/components/status-badge'
import { DEFAULT_TOKEN_UNIT } from '../constants'
import { isTokenBasedModel } from '../lib/model-helpers'
import {
  formatPrice,
  formatRequestPrice,
  stripTrailingZeros,
} from '../lib/price'
import type { PricingModel, TokenUnit } from '../types'

interface MarketingPricingTableProps {
  models: PricingModel[]
  priceRate?: number
  usdExchangeRate?: number
  tokenUnit?: TokenUnit
}

interface PriceRow {
  model: PricingModel
  input: string
  output: string
  cached: string
  perRequest: string
  isTokenBased: boolean
  hasCache: boolean
  tags: string[]
}

function buildRow(
  model: PricingModel,
  tokenUnit: TokenUnit,
  priceRate: number,
  usdExchangeRate: number
): PriceRow {
  const isTokenBased = isTokenBasedModel(model)
  const tags = (model.tags || '')
    .split(',')
    .map((t) => t.trim())
    .filter(Boolean)
  if (isTokenBased) {
    return {
      model,
      isTokenBased: true,
      hasCache: model.cache_ratio != null,
      input: stripTrailingZeros(
        formatPrice(model, 'input', tokenUnit, false, priceRate, usdExchangeRate)
      ),
      output: stripTrailingZeros(
        formatPrice(
          model,
          'output',
          tokenUnit,
          false,
          priceRate,
          usdExchangeRate
        )
      ),
      cached:
        model.cache_ratio != null
          ? stripTrailingZeros(
              formatPrice(
                model,
                'cache',
                tokenUnit,
                false,
                priceRate,
                usdExchangeRate
              )
            )
          : '',
      perRequest: '',
      tags,
    }
  }
  return {
    model,
    isTokenBased: false,
    hasCache: false,
    input: '',
    output: '',
    cached: '',
    perRequest: stripTrailingZeros(
      formatRequestPrice(model, false, priceRate, usdExchangeRate)
    ),
    tags,
  }
}

function classifyModels(
  models: PricingModel[],
  tokenUnit: TokenUnit,
  priceRate: number,
  usdExchangeRate: number
): { groups: { key: string; label: string; rows: PriceRow[] }[] } {
  const buckets: Record<string, PricingModel[]> = {
    llm: [],
    image: [],
    audio: [],
    video: [],
    embedding: [],
    rerank: [],
    other: [],
  }
  for (const m of models) {
    const endpoints = m.supported_endpoint_types || []
    if (
      endpoints.includes('openai') ||
      endpoints.includes('openai-response') ||
      endpoints.includes('anthropic') ||
      endpoints.includes('gemini') ||
      m.quota_type === 0
    ) {
      buckets.llm.push(m)
    } else if (endpoints.includes('image-generation')) {
      buckets.image.push(m)
    } else if (endpoints.includes('openai-video')) {
      buckets.video.push(m)
    } else if (endpoints.includes('embeddings')) {
      buckets.embedding.push(m)
    } else if (endpoints.includes('jina-rerank')) {
      buckets.rerank.push(m)
    } else {
      buckets.other.push(m)
    }
  }
  const order: { key: string; label: string }[] = [
    { key: 'llm', label: 'LLM' },
    { key: 'image', label: 'Image' },
    { key: 'audio', label: 'Audio' },
    { key: 'video', label: 'Video' },
    { key: 'embedding', label: 'Embedding' },
    { key: 'rerank', label: 'Rerank' },
    { key: 'other', label: 'Other' },
  ]
  return {
    groups: order
      .map(({ key, label }) => ({
        key,
        label,
        rows: buckets[key].map((model) =>
          buildRow(model, tokenUnit, priceRate, usdExchangeRate)
        ),
      }))
      .filter((g) => g.rows.length > 0),
  }
}

function BrandCell(props: { model: PricingModel }) {
  const { model } = props
  const iconKey = model.vendor_icon || model.icon
  const icon = iconKey ? getLobeIcon(iconKey, 18) : null
  return (
    <div className='flex min-w-0 items-center gap-2.5'>
      <div className='flex size-7 shrink-0 items-center justify-center rounded-md bg-muted/60'>
        {icon ?? <span className='text-muted-foreground/60 text-xs'>·</span>}
      </div>
      <span className='truncate text-sm font-medium'>
        {model.vendor_name ?? '—'}
      </span>
    </div>
  )
}

function ModelNameCell(props: { name: string }) {
  return (
    <span className='text-foreground/90 font-mono text-[13px] font-medium'>
      {props.name}
    </span>
  )
}

function PriceCell(props: { value: string; suffix?: string; muted?: boolean }) {
  const { value, suffix, muted } = props
  if (!value) {
    return <span className='text-muted-foreground/30 text-xs'>—</span>
  }
  return (
    <span
      className={
        muted
          ? 'text-muted-foreground/60 font-mono text-[12px] tabular-nums'
          : 'text-foreground/90 font-mono text-[12px] tabular-nums'
      }
    >
      {value}
      {suffix && (
        <span className='text-muted-foreground/50 ml-1 text-[10px]'>
          {suffix}
        </span>
      )}
    </span>
  )
}

function TagsCell(props: { tags: string[] }) {
  const { tags } = props
  if (tags.length === 0) {
    return <span className='text-muted-foreground/30 text-xs'>—</span>
  }
  return (
    <div className='flex flex-wrap items-center justify-end gap-1'>
      {tags.slice(0, 2).map((tag) => (
        <StatusBadge
          key={tag}
          label={tag}
          autoColor={tag}
          size='sm'
          copyable={false}
        />
      ))}
    </div>
  )
}

function GroupHeader(props: { label: string; count: number }) {
  const { label, count } = props
  return (
    <div className='mb-2 flex items-baseline gap-2 px-1 pt-6'>
      <h3 className='text-base font-bold text-violet-600 sm:text-lg dark:text-violet-300'>
        #{label}
      </h3>
      <span className='text-muted-foreground/60 text-xs'>
        {count} {count === 1 ? 'model' : 'models'}
      </span>
    </div>
  )
}

function PriceRowView(props: { row: PriceRow; tokenUnit: TokenUnit }) {
  const { row, tokenUnit } = props
  const tokenLabel = tokenUnit === 'K' ? '1K' : '1M'

  return (
    <div
      className={[
        'grid items-center gap-3 border-b border-border/40 px-3 py-2.5 text-sm last:border-b-0',
        'hover:bg-muted/30 sm:px-4',
        'grid-cols-[minmax(0,1.4fr)_minmax(0,2fr)_minmax(0,1fr)_minmax(0,1fr)_minmax(0,1fr)_minmax(0,1.2fr)]',
      ].join(' ')}
    >
      <BrandCell model={row.model} />
      <ModelNameCell name={row.model.model_name} />
      {row.isTokenBased ? (
        <PriceCell value={row.input} suffix={`/ ${tokenLabel}`} />
      ) : (
        <span className='text-muted-foreground/30 text-xs'>—</span>
      )}
      {row.isTokenBased ? (
        <PriceCell value={row.output} suffix={`/ ${tokenLabel}`} />
      ) : (
        <span className='text-muted-foreground/30 text-xs'>—</span>
      )}
      {row.isTokenBased ? (
        row.hasCache ? (
          <PriceCell value={row.cached} suffix={`/ ${tokenLabel}`} muted />
        ) : (
          <span className='text-muted-foreground/30 text-xs'>—</span>
        )
      ) : (
        <span className='text-muted-foreground/30 text-xs'>—</span>
      )}
      {row.isTokenBased ? (
        <TagsCell tags={row.tags} />
      ) : (
        <div className='flex items-center justify-end gap-2'>
          <PriceCell value={row.perRequest} suffix='/ req' />
          <TagsCell tags={row.tags} />
        </div>
      )}
    </div>
  )
}

export function MarketingPricingTable(props: MarketingPricingTableProps) {
  const { t } = useTranslation()
  const {
    models,
    priceRate = 1,
    usdExchangeRate = 1,
    tokenUnit = DEFAULT_TOKEN_UNIT,
  } = props

  const { groups } = useMemo(
    () => classifyModels(models, tokenUnit, priceRate, usdExchangeRate),
    [models, tokenUnit, priceRate, usdExchangeRate]
  )

  if (groups.length === 0) {
    return (
      <div className='text-muted-foreground py-16 text-center text-sm'>
        {t('No models available.')}
      </div>
    )
  }

  return (
    <div className='mx-auto w-full max-w-7xl'>
      {groups.map((group) => (
        <Fragment key={group.key}>
          <GroupHeader label={group.label} count={group.rows.length} />
          <div className='overflow-x-auto rounded-xl border border-border/60 bg-background shadow-sm'>
            <div className='min-w-[860px]'>
              <div
                className={[
                  'text-muted-foreground grid items-center gap-3 border-b border-border/60 bg-muted/40 px-3 py-2 text-[10px] font-semibold tracking-wider uppercase sm:px-4',
                  'grid-cols-[minmax(0,1.4fr)_minmax(0,2fr)_minmax(0,1fr)_minmax(0,1fr)_minmax(0,1fr)_minmax(0,1.2fr)]',
                ].join(' ')}
              >
                <div>{t('Brand')}</div>
                <div>{t('Model')}</div>
                <div className='text-right'>{t('Input')}</div>
                <div className='text-right'>{t('Output')}</div>
                <div className='text-right'>{t('Cached')}</div>
                <div className='text-right'>{t('Tags')}</div>
              </div>
              {group.rows.map((row) => (
                <PriceRowView
                  key={row.model.model_name}
                  row={row}
                  tokenUnit={tokenUnit}
                />
              ))}
            </div>
          </div>
        </Fragment>
      ))}
    </div>
  )
}
