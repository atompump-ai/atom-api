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
import { EXPLORE_CHIPS, type ExploreChipId } from '../constants'
import type { PricingModel } from '../types'

/**
 * Filter models by an explore category chip. The chip's
 * `endpointMatchers` must contain at least one value present in the
 * model's `supported_endpoint_types` for the model to be kept.
 *
 * Cosmetic chips (empty matchers) act as a no-op so the user can still
 * browse the full catalogue when no modality flag exists.
 */
export function filterByChip(
  models: PricingModel[],
  chipId: ExploreChipId
): PricingModel[] {
  const chip = EXPLORE_CHIPS.find((c) => c.id === chipId)
  if (!chip || chip.endpointMatchers.length === 0) {
    return models
  }
  return models.filter((model) => {
    const supported = model.supported_endpoint_types ?? []
    return chip.endpointMatchers.some((endpoint) =>
      supported.includes(endpoint)
    )
  })
}
