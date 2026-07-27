'use client'
import { useCallback, useEffect, useState } from 'react'

import type { SearchParams } from './search.types'

import { getSearchByPerson } from '../api'
import { personCreditsToSearchItems } from '../lib/toSearchListItem'
import type { ISearchData } from './search.types'

function useFilterPerson({ filter, id, type }: SearchParams) {
  const enabled =
    (filter === 'cast' || filter === 'crew') && Boolean(id && type)

  const [items, setItems] = useState<ISearchData[]>([])
  const [isLoading, setIsLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)
  const [refetchCount, setRefetchCount] = useState(0)

  const refetch = useCallback(() => {
    setRefetchCount(prev => prev + 1)
  }, [])

  useEffect(() => {
    if (!enabled || !id || (filter !== 'cast' && filter !== 'crew')) {
      setItems([])
      setIsLoading(false)
      setError(null)
      return
    }

    const personFilter = filter
    const personId = id
    let cancelled = false

    async function loadPersonCredits() {
      setIsLoading(true)
      setError(null)

      const response = await getSearchByPerson(type, personId)

      if (cancelled) return

      if (response.error || !response.data) {
        setItems([])
        setError(response.error ?? '검색 결과를 찾을 수 없습니다.')
        setIsLoading(false)
        return
      }

      setItems(personCreditsToSearchItems(response.data, personFilter, type))
      setIsLoading(false)
    }

    loadPersonCredits()

    return () => {
      cancelled = true
    }
  }, [enabled, filter, id, type, refetchCount])

  return {
    items,
    isLoading: enabled && isLoading,
    isFetchingMore: false,
    error: enabled ? error : null,
    loaderRef: undefined,
    refetch,
  }
}

export default useFilterPerson
