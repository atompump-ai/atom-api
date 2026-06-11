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
import { useTranslation } from 'react-i18next'
import { PublicLayout, type TopNavLink } from '@/components/layout'
import { Button } from '@/components/ui/button'
import { SearchBar } from '@/features/pricing/components/search-bar'
import { usePricingData } from '@/features/pricing/hooks/use-pricing-data'
import { CategoryChips } from './components/category-chips'
import { ExploreEmptyState, ExploreSkeleton } from './components/explore-states'
import { ExploreGrid } from './components/explore-grid'
import { ExploreHero } from './components/explore-hero'
import { ExploreSidebar } from './components/explore-sidebar'
import { useExploreFilters } from './hooks/use-explore-filters'

/**
 * Public, marketing-oriented page that lets visitors browse the
 * full model catalogue with category chips and a left-hand sidebar
 * of provider / tag filters. Reuses the unified /api/pricing data
 * contract so the backend stays untouched.
 */
export function Explore() {
  const { t } = useTranslation()
  const { models, isLoading, error, refetch } = usePricingData()
  const {
    filters,
    setSearch,
    setChip,
    setVendor,
    setTag,
    clearFilters,
    filteredModels,
    vendorCounts,
    tagCounts,
    hasActiveFilters,
  } = useExploreFilters(models)

  const exploreNavLinks = useMemo<TopNavLink[]>(
    () => [
      { title: t('Home'), href: '/' },
      { title: t('Pricing'), href: '/pricing' },
      { title: t('Model API'), href: '/explore' },
      { title: t('Docs'), href: 'https://docs.newapi.pro', external: true },
    ],
    [t]
  )

  const hasError = Boolean(error)
  const isInitialLoading = isLoading && models.length === 0
  const showEmptyState =
    !isInitialLoading && !hasError && filteredModels.length === 0

  return (
    <PublicLayout
      showMainContainer={false}
      navLinks={exploreNavLinks}
    >
      <ExploreHero />
      <div className='container mx-auto max-w-6xl px-4 pt-8 pb-16 md:pt-10 md:pb-24'>
        <div className='flex flex-col gap-6'>
          <SearchBar
            value={filters.search}
            onChange={setSearch}
            onClear={() => setSearch('')}
            placeholder={t('Search models or providers')}
          />
          <CategoryChips active={filters.chip} onChange={setChip} />
          <div className='grid grid-cols-1 gap-8 lg:grid-cols-[16rem_minmax(0,1fr)]'>
            <ExploreSidebar
              vendors={vendorCounts}
              tags={tagCounts}
              selectedVendor={filters.vendor}
              selectedTag={filters.tag}
              onSelectVendor={setVendor}
              onSelectTag={setTag}
            />
            <div className='min-w-0'>
              {hasError ? (
                <div className='flex flex-col items-center gap-3 rounded-2xl border border-dashed border-border/60 bg-card/40 px-6 py-16 text-center'>
                  <p className='text-muted-foreground text-sm'>
                    {t('Loading failed')}
                  </p>
                  <Button
                    variant='outline'
                    size='sm'
                    onClick={() => {
                      void refetch()
                    }}
                  >
                    {t('Retry')}
                  </Button>
                </div>
              ) : isInitialLoading ? (
                <ExploreSkeleton />
              ) : showEmptyState ? (
                <ExploreEmptyState
                  onClear={hasActiveFilters ? clearFilters : undefined}
                />
              ) : (
                <ExploreGrid models={filteredModels} />
              )}
            </div>
          </div>
        </div>
      </div>
    </PublicLayout>
  )
}
