'use client'
import { useMemo } from 'react'

import {
  buildDisplayGenres,
  type DiscoverMedia,
  type IGenre,
  type SortBy,
} from '@/shared'
import { useInfiniteContents } from '@/entities/media'

import { getDiscoverListParams, getDiscoverListTitle } from '../lib'

interface UseGenreSectionParams {
  genreList: IGenre[]
  endPoint: string
  allTitle: string
  fallbackTitle: string
  sortBy: SortBy
  media: DiscoverMedia
  currentGenreId: number
}

function useGenreSection({
  genreList,
  endPoint,
  allTitle,
  fallbackTitle,
  sortBy,
  media,
  currentGenreId,
}: UseGenreSectionParams) {
  const displayGenres = useMemo(
    () => buildDisplayGenres(genreList),
    [genreList],
  )

  const params = getDiscoverListParams(currentGenreId, sortBy, media)
  const listTitle = getDiscoverListTitle(
    currentGenreId,
    displayGenres.lists,
    allTitle,
    fallbackTitle,
  )

  const { loaderRef, contents, isLoading, isFetchingMore, error, refetch } =
    useInfiniteContents({
      endPoint,
      params,
      direction: 'vertical',
    })

  return {
    displayGenres,
    listTitle,
    loaderRef,
    contents,
    isLoading,
    isFetchingMore,
    error,
    refetch,
  }
}

export default useGenreSection
