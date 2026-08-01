'use client'
import { useEffect, useRef, useState } from 'react'

import type { ISearchData, SearchParams } from './search.types'
import { getSearchByPerson } from '../api'

function useFilterPerson({ filter, id, type }: SearchParams) {
  const [items, setItems] = useState<ISearchData[]>([])
  const [isLoading, setIsLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)
  const [refetchCount, setRefetchCount] = useState(0)

  const queryKey = `${filter}-${id}-${type}`
  const prevQueryKey = useRef(queryKey)

  if (prevQueryKey.current !== queryKey) {
    prevQueryKey.current = queryKey
    setItems([])
    setError(null)
  }

  useEffect(() => {
    if (filter !== 'person' || !id || !type) {
      setIsLoading(false)
      return
    }

    let cancelled = false
    async function fetchItems() {
      setIsLoading(true)

      const { data, error } = await getSearchByPerson(id!, type)

      if (cancelled) return
      setItems(data ?? [])
      setError(error)
      setIsLoading(false)
    }

    fetchItems()

    return () => {
      cancelled = true
    }
  }, [filter, id, type, refetchCount, queryKey])

  return {
    items,
    isLoading,
    isFetchingMore: false,
    error,
    refetch: () => setRefetchCount(prev => prev + 1),
    loaderRef: undefined,
  }
}

export default useFilterPerson
