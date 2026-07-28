'use client'
import { useRef } from 'react'

import { Carousel, type GenreCarouselProps } from '@/shared'
import { TrailerOpenButton } from '@/features/trailer'
import { MovieCard } from '@/entities/movie'

import { useCarouselContents } from './model'
import { IMovie } from '@/entities/movie'

function MovieCarousel({
  title,
  endPoint,
  params,
  genres,
}: GenreCarouselProps) {
  const scrollRef = useRef<HTMLUListElement>(null)

  const { loaderRef, contents, isLoading, isFetchingMore, error, refetch } =
    useCarouselContents<IMovie>({
      endPoint,
      params,
      scrollRef,
    })

  return (
    <Carousel
      title={title}
      items={contents}
      scrollRef={scrollRef}
      isLoading={isLoading}
      isFetchingMore={isFetchingMore}
      error={error}
      onRetry={refetch}
      loaderRef={loaderRef}
      renderItem={movie => (
        <MovieCard
          key={`${movie.id}-movie-carousel`}
          content={movie as IMovie}
          genres={genres ?? []}
          action={
            <TrailerOpenButton
              contentId={movie.id.toString()}
              contentTitle={movie.title}
              mediaType='movie'
            />
          }
        />
      )}
    />
  )
}

export default MovieCarousel
