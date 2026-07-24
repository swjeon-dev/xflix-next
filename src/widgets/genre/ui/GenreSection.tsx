'use client'
import { useState } from 'react'

import type { IGenre } from '@/shared'
import { isMovie } from '@/entities/movie'
import { isTV } from '@/entities/tv'

import { type SortOption, toSortBy } from '../lib'
import { useGenreSection } from '../model'
import GenreGridList from './GenreGridList'
import GenreMovieCard from './GenreMovieCard'
import GenreSortFilter from './GenreSortFilter'
import GenreTVCard from './GenreTVCard'

interface GenreSectionProps {
  label: '영화' | 'TV'
  genres: IGenre[]
  endPoint: string
  allTitle: string
  fallbackTitle: string
}

function GenreSection({
  label,
  genres,
  endPoint,
  allTitle,
  fallbackTitle,
}: GenreSectionProps) {
  const [sortOption, setSortOption] = useState<SortOption>('popular')

  const media = label === '영화' ? 'movie' : 'tv'
  const {
    selected,
    setSelected,
    displayGenres,
    listTitle,
    loaderRef,
    contents,
    isLoading,
    isFetchingMore,
    error,
    refetch,
  } = useGenreSection({
    genres,
    endPoint,
    allTitle,
    fallbackTitle,
    sortBy: toSortBy(sortOption, label),
    media,
  })

  return (
    <>
      <h1 className='pt-24 text-white main-page_px text-3xl md:text-5xl font-semibold'>
        {label}
      </h1>
      <GenreSortFilter
        tabs={displayGenres.tabs}
        selected={selected}
        onSelect={setSelected}
        sortOption={sortOption}
        onSortChange={setSortOption}
      />
      <GenreGridList
        listTitle={listTitle}
        items={contents}
        isLoading={isLoading}
        isFetchingMore={isFetchingMore}
        error={error}
        loaderRef={loaderRef}
        onRetry={refetch}
        renderItem={item => {
          if (isMovie(item)) {
            return <GenreMovieCard key={item.id} content={item} />
          }
          if (isTV(item)) {
            return <GenreTVCard key={item.id} content={item} />
          }
          return null
        }}
      />
    </>
  )
}

export default GenreSection
