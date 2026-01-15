import React, { createContext, useState, useContext, useEffect } from 'react'

const ThemeStyleContext = createContext()

export function ThemeStyleProvider({ children }) {
  const [themeStyle, setThemeStyleState] = useState('default')
  const [mounted, setMounted] = useState(false)

  // Load from localStorage on mount (client-side only)
  useEffect(() => {
    setMounted(true)
    const saved = localStorage.getItem('theme-style')
    if (saved && (saved === 'default' || saved === 'retro')) {
      setThemeStyleState(saved)
    }
  }, [])

  // Persist changes to localStorage
  const setThemeStyle = (style) => {
    if (style !== 'default' && style !== 'retro') {
      console.warn('Invalid theme style:', style)
      return
    }
    setThemeStyleState(style)
    if (typeof window !== 'undefined') {
      localStorage.setItem('theme-style', style)
    }
  }

  const value = {
    themeStyle: mounted ? themeStyle : 'default', // Prevent hydration mismatch
    setThemeStyle,
    mounted
  }

  return (
    <ThemeStyleContext.Provider value={value}>
      {children}
    </ThemeStyleContext.Provider>
  )
}

export function useThemeStyle() {
  const context = useContext(ThemeStyleContext)
  if (!context) {
    // Return default values instead of throwing during SSR
    return { themeStyle: 'default', setThemeStyle: () => {} }
  }
  return context
}
