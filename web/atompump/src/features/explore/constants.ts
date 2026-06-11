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
// ----------------------------------------------------------------------------
// Explore Page — Constants
// ----------------------------------------------------------------------------

/**
 * Visual chip categories shown in the explore hero. Each chip maps to a
 * set of `supported_endpoint_types` values returned by /api/pricing. When
 * `endpointMatchers` is empty the chip is "cosmetic" (no backend
 * modality flag exists yet) and the grid will simply show the empty
 * state when the user picks it.
 */
export type ExploreChipId =
  | 'all'
  | 'llm'
  | 'audio-tts'
  | 'music'
  | 'text-to-image'
  | 'text-to-video'
  | 'image-to-video'
  | 'image-to-image'
  | 'image-to-3d'
  | 'video-enhance'

export interface ExploreChip {
  id: ExploreChipId
  /** i18n key — English source string is the canonical key. */
  labelKey: string
  /**
   * Endpoint values that satisfy this chip. Empty array = cosmetic chip
   * (always returns all models so the page does not look broken).
   */
  endpointMatchers: string[]
}

export const EXPLORE_CHIPS: ExploreChip[] = [
  { id: 'all', labelKey: 'All categories', endpointMatchers: [] },
  {
    id: 'llm',
    labelKey: 'LLM text',
    endpointMatchers: ['openai', 'openai-response', 'anthropic', 'gemini'],
  },
  { id: 'audio-tts', labelKey: 'Audio TTS', endpointMatchers: [] },
  { id: 'music', labelKey: 'Music', endpointMatchers: [] },
  {
    id: 'text-to-image',
    labelKey: 'Text to image',
    endpointMatchers: ['image-generation'],
  },
  {
    id: 'text-to-video',
    labelKey: 'Text to video',
    endpointMatchers: ['openai-video'],
  },
  {
    id: 'image-to-video',
    labelKey: 'Image to video',
    endpointMatchers: ['openai-video'],
  },
  {
    id: 'image-to-image',
    labelKey: 'Image to image',
    endpointMatchers: ['image-generation'],
  },
  { id: 'image-to-3d', labelKey: 'Image to 3D', endpointMatchers: [] },
  {
    id: 'video-enhance',
    labelKey: 'Video enhance',
    endpointMatchers: ['openai-video'],
  },
]

export const EXPLORE_ALL_CHIP_ID: ExploreChipId = 'all'

/** Sentinel values for the "all" filter state (parity with pricing). */
export const FILTER_ALL = 'all'

/** Number of skeleton cards while data is loading. */
export const EXPLORE_SKELETON_COUNT = 9
