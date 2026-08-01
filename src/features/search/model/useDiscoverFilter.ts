'use client'
import { useMemo } from 'react'

import { useInfiniteContents } from '@/entities/media'
import type { IMovie } from '@/entities/movie'
import type { ITV } from '@/entities/tv'
import { API_ENDPOINT, type SearchMediaType } from '@/shared'
import { toSearchListItem } from './toSearchListItem'

type UseDiscoverFilterProps = {
  enabled: boolean
  type: SearchMediaType
  params?: Record<string, string | number | boolean>
}

function useDiscoverFilter({ enabled, type, params }: UseDiscoverFilterProps) {
  const endPoint =
    type === 'movie' ? API_ENDPOINT.MOVIE_FILTERED : API_ENDPOINT.TV_FILTERED

  const { contents, isLoading, isFetchingMore, error, loaderRef, refetch } =
    useInfiniteContents({
      endPoint,
      params,
      enabled,
    })

  const items = useMemo(
    () => contents.map(item => toSearchListItem(item as IMovie | ITV)),
    [contents],
  )

  return {
    items,
    isLoading,
    isFetchingMore,
    error,
    loaderRef,
    refetch,
  }
}

export default useDiscoverFilter
