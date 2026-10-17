import { create } from 'zustand'
import { persist } from 'zustand/middleware'

type Theme = 'light' | 'dark'

interface ThemeState {
  theme: Theme
  toggleTheme: () => void
  setTheme: (theme: Theme) => void
}

export const useThemeStore = create<ThemeState>()(
  persist(
    (set, get) => ({
      theme: 'light',
      toggleTheme: () => {
        const next = get().theme === 'light' ? 'dark' : 'light'
        get().setTheme(next)
      },
      setTheme: (theme: Theme) => {
        set({ theme })
        if (typeof document !== 'undefined') {
          const root = document.documentElement
          if (theme === 'dark') {
            root.classList.add('dark')
          } else {
            root.classList.remove('dark')
          }
        }
      },
    }),
    {
      name: 'goodfind-theme-storage',
      onRehydrateStorage: () => (state) => {
        if (state && typeof document !== 'undefined') {
          if (state.theme === 'dark') {
            document.documentElement.classList.add('dark')
          } else {
            document.documentElement.classList.remove('dark')
          }
        }
      },
    }
  )
)
