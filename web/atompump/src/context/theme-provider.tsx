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
import {
  createContext,
  useContext,
  useEffect,
  useMemo,
  useState,
} from 'react'

type Theme = 'dark' | 'light' | 'system'
type ResolvedTheme = Exclude<Theme, 'system'>

// AtomPump is a light-only theme: every page renders against a white
// background. The previous behavior (light/dark/system with cookie
// persistence) was removed, but the provider API is kept so that
// dashboard charts that read `resolvedTheme` from context still work.
const FORCED_THEME: Theme = 'light'
const FORCED_RESOLVED: ResolvedTheme = 'light'

type ThemeProviderProps = {
  children: React.ReactNode
  defaultTheme?: Theme
  storageKey?: string
}

type ThemeProviderState = {
  defaultTheme: Theme
  resolvedTheme: ResolvedTheme
  theme: Theme
  setTheme: (theme: Theme) => void
  resetTheme: () => void
}

const initialState: ThemeProviderState = {
  defaultTheme: FORCED_THEME,
  resolvedTheme: FORCED_RESOLVED,
  theme: FORCED_THEME,
  setTheme: () => null,
  resetTheme: () => null,
}

const ThemeContext = createContext<ThemeProviderState>(initialState)

export function ThemeProvider({ children, ...props }: ThemeProviderProps) {
  // Light-only: ignore defaultTheme, storageKey, and any previous cookie
  // value the user might have set before this change.
  const [theme] = useState<Theme>(FORCED_THEME)
  const [resolvedTheme, setResolvedTheme] =
    useState<ResolvedTheme>(FORCED_RESOLVED)

  useEffect(() => {
    const root = window.document.documentElement
    root.classList.remove('dark', 'light')
    root.classList.add(FORCED_RESOLVED)
    setResolvedTheme(FORCED_RESOLVED)
  }, [])

  // No-op setters kept for API compatibility with prior callers.
  const setTheme = () => null
  const resetTheme = () => null

  const contextValue = useMemo(
    () => ({
      defaultTheme: FORCED_THEME,
      resolvedTheme,
      resetTheme,
      theme,
      setTheme,
    }),
    [resolvedTheme, theme]
  )

  return (
    <ThemeContext value={contextValue} {...props}>
      {children}
    </ThemeContext>
  )
}

// eslint-disable-next-line react-refresh/only-export-components
export const useTheme = () => {
  const context = useContext(ThemeContext)

  if (!context) throw new Error('useTheme must be used within a ThemeProvider')

  return context
}
