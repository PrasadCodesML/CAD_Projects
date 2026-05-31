"use client"

import { useEffect, useState } from "react"
import { Moon, Sun } from "lucide-react"
import { useTheme } from "next-themes"

export function ThemeToggle({ className = "" }: { className?: string }) {
  const { resolvedTheme, setTheme } = useTheme()
  const [mounted, setMounted] = useState(false)

  useEffect(() => {
    setMounted(true)
  }, [])

  const isDark = mounted && resolvedTheme === "dark"

  return (
    <button
      type="button"
      aria-label={
        mounted
          ? `Switch to ${isDark ? "light" : "dark"} theme`
          : "Toggle theme"
      }
      onClick={() => setTheme(isDark ? "light" : "dark")}
      className={`relative inline-flex items-center justify-center w-9 h-9 rounded-full border border-border bg-card text-muted-foreground hover:text-foreground hover:border-primary/50 transition-colors ${className}`}
    >
      <Sun
        className={`w-4 h-4 transition-all ${
          mounted && isDark
            ? "scale-0 -rotate-90 opacity-0"
            : "scale-100 rotate-0 opacity-100"
        }`}
      />
      <Moon
        className={`absolute w-4 h-4 transition-all ${
          mounted && isDark
            ? "scale-100 rotate-0 opacity-100"
            : "scale-0 rotate-90 opacity-0"
        }`}
      />
    </button>
  )
}
