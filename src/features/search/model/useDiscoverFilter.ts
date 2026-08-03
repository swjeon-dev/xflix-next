'use client'
import { useMemo } from 'react'

import { API_ENDPOINT, type MediaType } from '@/shared'
import { useInfiniteContents } from '@/entities/media'
import type { IMovie } from '@/entities/movie'
import type { ITV } from '@/entities/tv'
import { toSearchListItem } from './toSearchListItem'

type UseDiscoverFilterProps = {
  enabled: boolean
  type: MediaType
  params?: Record<string, string | number | boolean>
}

function useDiscoverFilter({ enabled, type, params }: UseDiscoverFilterProps) {
  const endPoint =
    type === 'movie' ? API_ENDPOINT.MOVIE_FILTERED : API_ENDPOINT.TV_FILTERED

  const { contents, isLoading, isFetchingMore, error, loaderRef, refetch } =
    useInfiniteContents<IMovie | ITV>({
      endPoint,
      params,
      enabled,
    })

  const items = useMemo(() => contents.map(toSearchListItem), [contents])

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
