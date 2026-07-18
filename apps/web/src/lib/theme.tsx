import * as React from "react"

export type Theme = "dark" | "light"

const STORAGE_KEY = "dino-theme"

type ThemeCtx = {
  theme: Theme
  setTheme: (t: Theme) => void
}

const ThemeContext = React.createContext<ThemeCtx | null>(null)

function readStoredTheme(): Theme {
  if (typeof window === "undefined") return "dark"
  try {
    const v = localStorage.getItem(STORAGE_KEY)
    if (v === "light" || v === "dark") return v
  } catch {
    /* ignore */
  }
  return "dark"
}

function applyTheme(t: Theme) {
  if (typeof document === "undefined") return
  document.documentElement.setAttribute("data-theme", t)
  document.documentElement.style.colorScheme = t
}

/** Inline boot script — avoids white/black flash before React hydrates. */
export const THEME_BOOT_SCRIPT = `(function(){try{var t=localStorage.getItem('${STORAGE_KEY}');if(t!=='light'&&t!=='dark')t='dark';document.documentElement.setAttribute('data-theme',t);document.documentElement.style.colorScheme=t;}catch(e){document.documentElement.setAttribute('data-theme','dark');}})();`

export function ThemeProvider({ children }: { children: React.ReactNode }) {
  const [theme, setThemeState] = React.useState<Theme>("dark")

  React.useEffect(() => {
    const stored = readStoredTheme()
    setThemeState(stored)
    applyTheme(stored)
  }, [])

  const setTheme = React.useCallback((t: Theme) => {
    setThemeState(t)
    try {
      localStorage.setItem(STORAGE_KEY, t)
    } catch {
      /* ignore */
    }
    applyTheme(t)
  }, [])

  const value = React.useMemo(() => ({ theme, setTheme }), [theme, setTheme])

  return (
    <ThemeContext.Provider value={value}>{children}</ThemeContext.Provider>
  )
}

export function useTheme() {
  const ctx = React.useContext(ThemeContext)
  if (!ctx) {
    throw new Error("useTheme must be used within ThemeProvider")
  }
  return ctx
}
