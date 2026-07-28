'use client'
import { useRef } from 'react'

import { Carousel, type GenreCarouselProps } from '@/shared'
import { TrailerOpenButton } from '@/features/trailer'
import { TVCard } from '@/entities/tv'

import { useCarouselContents } from './model'
import { ITV } from '@/entities/tv'

function TVCarousel({ title, endPoint, params, genres }: GenreCarouselProps) {
  const scrollRef = useRef<HTMLUListElement>(null)

  const { loaderRef, contents, isLoading, isFetchingMore, error, refetch } =
    useCarouselContents<ITV>({
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
      renderItem={tv => (
        <TVCard
          key={`${tv.id}-tv-carousel`}
          content={tv}
          genres={genres ?? []}
          action={
            <TrailerOpenButton
              contentId={tv.id.toString()}
              contentTitle={tv.name}
              mediaType='tv'
            />
          }
        />
      )}
    />
  )
}

export default TVCarousel
