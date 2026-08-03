'use client'
import { useEffect, useRef, useState } from 'react'

import { getSearchByPerson } from '@/entities/person'
import type { ISearchData, SearchParams } from './search.types'
import { toPersonCreditSearchItem } from './toPersonCreditSearchItem'

function useFilterPerson({ filter, id, type }: SearchParams) {
  const [items, setItems] = useState<ISearchData[]>([])
  const [isLoading, setIsLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)
  const [refetchCount, setRefetchCount] = useState(0)

  const enabled = filter === 'person' && Boolean(id) && Boolean(type)
  const queryKey = `${filter}-${id}-${type}`
  const prevQueryKey = useRef(queryKey)

  if (prevQueryKey.current !== queryKey) {
    prevQueryKey.current = queryKey
    setItems([])
    setError(null)
  }

  useEffect(() => {
    if (!enabled || !id) {
      setIsLoading(false)
      return
    }

    const personId = id
    let cancelled = false

    async function fetchItems() {
      setIsLoading(true)

      const { data, error } = await getSearchByPerson({ id: personId, type })

      if (cancelled) return

      setItems(data ? data.map(toPersonCreditSearchItem) : [])
      setError(error)
      setIsLoading(false)
    }

    fetchItems()

    return () => {
      cancelled = true
    }
  }, [enabled, id, type, refetchCount, queryKey])

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
