import { useMemo } from 'react'

import { useInfiniteContents } from '@/entities/media'
import type { IMovie } from '@/entities/movie'
import type { ITV } from '@/entities/tv'
import type { SearchParams } from './search.types'
import { API_ENDPOINT, getDiscoverParams } from '@/shared'

import { toSearchListItem } from '../lib/toSearchListItem'

function useFilterGenre({ filter, id, type }: SearchParams) {
  const enabled = Boolean(filter === 'genre' && id && type)

  const endPoint =
    type === 'movie' ? API_ENDPOINT.MOVIE_FILTERED : API_ENDPOINT.TV_FILTERED

  const params =
    enabled && id
      ? getDiscoverParams(Number(id), 'popularity.desc', type)
      : undefined

  const { contents, isLoading, isFetchingMore, error, loaderRef, refetch } =
    useInfiniteContents({
      endPoint: enabled ? endPoint : '',
      params,
    })

  const items = useMemo(
    () => contents.map(item => toSearchListItem(item as IMovie | ITV)),
    [contents],
  )

  return {
    items,
    isLoading: enabled && isLoading,
    isFetchingMore: enabled && isFetchingMore,
    error: enabled ? error : null,
    loaderRef,
    refetch,
  }
}

export default useFilterGenre
