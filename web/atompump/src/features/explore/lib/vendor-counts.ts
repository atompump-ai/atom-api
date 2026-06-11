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
import { parseTags } from '@/features/pricing/lib/filters'
import type { PricingModel } from '../types'

export interface VendorCount {
  name: string
  count: number
}

export interface TagCount {
  name: string
  count: number
}

/**
 * Count the number of models per vendor. Vendors with zero matches are
 * omitted so the sidebar does not show dead entries.
 */
export function countByVendor(models: PricingModel[]): VendorCount[] {
  const map = new Map<string, number>()
  for (const model of models) {
    const vendor = model.vendor_name
    if (!vendor) continue
    map.set(vendor, (map.get(vendor) ?? 0) + 1)
  }
  return Array.from(map.entries())
    .map(([name, count]) => ({ name, count }))
    .sort((a, b) => {
      if (b.count !== a.count) return b.count - a.count
      return a.name.localeCompare(b.name)
    })
}

/**
 * Count the number of models per tag. Tags are stored as a delimited
 * string on the model — `parseTags` is the source of truth for
 * splitting.
 */
export function countByTag(models: PricingModel[]): TagCount[] {
  const map = new Map<string, number>()
  for (const model of models) {
    const tags = parseTags(model.tags)
    for (const tag of tags) {
      const key = tag.toLowerCase()
      map.set(key, (map.get(key) ?? 0) + 1)
    }
  }
  return Array.from(map.entries())
    .map(([name, count]) => ({ name, count }))
    .sort((a, b) => {
      if (b.count !== a.count) return b.count - a.count
      return a.name.localeCompare(b.name)
    })
}
