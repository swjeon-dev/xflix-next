'use client'
import { useRouter } from 'next/navigation'

import { routes, type IGenre } from '@/shared'
import { isMovie } from '@/entities/movie'
import { isTV } from '@/entities/tv'

import { DEFAULT_SORT, type SortOption, toSortBy } from '../lib'
import { useGenreSection } from '../model'
import GenreGridList from './GenreGridList'
import GenreMovieCard from './GenreMovieCard'
import GenreSortFilter from './GenreSortFilter'
import GenreTVCard from './GenreTVCard'

interface GenreSectionProps {
  genreId: number
  sort: SortOption
  label: '영화' | 'TV'
  genreList: IGenre[]
  endPoint: string
  allTitle: string
  fallbackTitle: string
}

function buildListPath(
  media: 'movie' | 'tv',
  genreId: number,
  sort: SortOption,
) {
  const base = media === 'movie' ? routes.MOVIE.LIST : routes.TV.LIST
  const params = new URLSearchParams()

  if (genreId !== 0) params.set('genre', String(genreId))
  if (sort !== DEFAULT_SORT) params.set('sort', sort)

  const qs = params.toString()
  return qs ? `${base}?${qs}` : base
}

function GenreSection({
  genreId,
  sort,
  label,
  genreList,
  endPoint,
  allTitle,
  fallbackTitle,
}: GenreSectionProps) {
  const router = useRouter()
  const media = label === '영화' ? 'movie' : 'tv'

  const {
    displayGenres,
    listTitle,
    loaderRef,
    contents,
    isLoading,
    isFetchingMore,
    error,
    refetch,
  } = useGenreSection({
    genreList,
    endPoint,
    allTitle,
    fallbackTitle,
    sortBy: toSortBy(sort, label),
    media,
    currentGenreId: genreId,
  })

  return (
    <>
      <h1 className='pt-24 text-white main-page_px text-3xl md:text-5xl font-semibold'>
        {label}
      </h1>
      <GenreSortFilter
        tabs={displayGenres.tabs}
        selected={genreId}
        onSelect={id => router.replace(buildListPath(media, id, sort))}
        sortOption={sort}
        onSortChange={next =>
          router.replace(buildListPath(media, genreId, next))
        }
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
