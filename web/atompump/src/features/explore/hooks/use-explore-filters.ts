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
import { useCallback, useMemo, useState } from 'react'
import {
  filterBySearch,
  filterByVendor,
  filterByTag,
} from '@/features/pricing/lib/filters'
import { filterByChip, countByVendor, countByTag } from '../lib'
import {
  EXPLORE_ALL_CHIP_ID,
  FILTER_ALL,
  type ExploreChipId,
} from '../constants'
import type { PricingModel } from '../types'

export interface ExploreFilters {
  search: string
  chip: ExploreChipId
  vendor: string
  tag: string
}

const INITIAL_FILTERS: ExploreFilters = {
  search: '',
  chip: EXPLORE_ALL_CHIP_ID,
  vendor: FILTER_ALL,
  tag: FILTER_ALL,
}

/**
 * Single source of truth for the explore page's filter state and the
 * derived model list. Compose existing pricing filters with the
 * explore-specific chip filter so we don't duplicate logic.
 */
export function useExploreFilters(models: PricingModel[]) {
  const [filters, setFilters] = useState<ExploreFilters>(INITIAL_FILTERS)

  const setSearch = useCallback((value: string) => {
    setFilters((prev) => ({ ...prev, search: value }))
  }, [])

  const setChip = useCallback((value: ExploreChipId) => {
    setFilters((prev) => ({ ...prev, chip: value }))
  }, [])

  const setVendor = useCallback((value: string) => {
    setFilters((prev) => ({ ...prev, vendor: value }))
  }, [])

  const setTag = useCallback((value: string) => {
    setFilters((prev) => ({ ...prev, tag: value }))
  }, [])

  const clearFilters = useCallback(() => {
    setFilters(INITIAL_FILTERS)
  }, [])

  /**
   * Sidebar counts are computed against the post-chip and post-search
   * model set so the numbers track what the user is currently looking
   * at, but pre-vendor / pre-tag selection (a selected vendor would
   * otherwise nuke the other vendors' counts).
   */
  const chipScopedModels = useMemo(
    () => filterBySearch(filterByChip(models, filters.chip), filters.search),
    [models, filters.chip, filters.search]
  )

  const vendorCounts = useMemo(
    () => countByVendor(chipScopedModels),
    [chipScopedModels]
  )
  const tagCounts = useMemo(() => countByTag(chipScopedModels), [
    chipScopedModels,
  ])

  const filteredModels = useMemo(() => {
    let result = chipScopedModels
    result = filterByVendor(result, filters.vendor)
    result = filterByTag(result, filters.tag)
    return result
  }, [chipScopedModels, filters.vendor, filters.tag])

  const hasActiveFilters = useMemo(
    () =>
      filters.chip !== EXPLORE_ALL_CHIP_ID ||
      filters.vendor !== FILTER_ALL ||
      filters.tag !== FILTER_ALL ||
      filters.search.length > 0,
    [filters.chip, filters.vendor, filters.tag, filters.search]
  )

  return {
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
  }
}
