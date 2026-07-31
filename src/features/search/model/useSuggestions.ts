'use client'
import { useEffect, useState } from 'react'

import { getSuggestions } from '../lib'
import type { SearchSuggestItem } from './search.types'

export function useSuggestions(search: string): {
  suggestions: SearchSuggestItem[]
  isLoading: boolean
} {
  const [suggestions, setSuggestions] = useState<SearchSuggestItem[]>([])
  const [isLoading, setIsLoading] = useState(false)

  useEffect(() => {
    const q = search?.trim().toLowerCase()

    if (!q || q.length < 2) {
      setSuggestions([])
      setIsLoading(false)
      return
    }

    let cancelled = false
    setIsLoading(true)

    const timer = setTimeout(async () => {
      try {
        const items = await getSuggestions(q)
        if (!cancelled) setSuggestions(items)
      } finally {
        if (!cancelled) setIsLoading(false)
      }
    }, 200)

    return () => {
      cancelled = true
      clearTimeout(timer)
    }
  }, [search])

  return { suggestions, isLoading }
}
