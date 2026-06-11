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

export function ExploreHero() {
  const { t } = useTranslation()
  return (
    <section className='border-border/40 border-b'>
      <div className='container mx-auto max-w-6xl px-4 pt-16 pb-10 md:pt-24 md:pb-14'>
        <h1 className='text-foreground text-balance text-4xl leading-[1.1] font-black tracking-tight md:text-5xl'>
          {t('Explore AI models')}
        </h1>
        <p className='text-muted-foreground/80 mt-4 max-w-2xl text-base leading-7 md:text-lg'>
          {t('Explore AI models subtitle')}
        </p>
      </div>
    </section>
  )
}
