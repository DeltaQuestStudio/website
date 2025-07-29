"use client"

import { useEffect } from "react"
import { usePathname } from "next/navigation"

declare global {
  interface Window {
    gtag: (command: string, targetId: string, config?: any) => void
  }
}

export function Analytics() {
  const pathname = usePathname()

  useEffect(() => {
    // Initialize analytics (Plausible or similar)
    if (process.env.NODE_ENV === "production") {
      // Add your analytics initialization here
      console.log("Analytics initialized for:", pathname)
    }
  }, [pathname])

  return null
}
