import { GenreCarouselProps, getGenres } from '@/shared'
import MovieCarousel from './MovieCarousel'
import TVCarousel from './TVCarousel'

export default async function CarouselShell({
  type,
  ...props
}: { type: 'movie' | 'tv' } & Omit<GenreCarouselProps, 'genres'>) {
  const { data: genres } = await getGenres(type)
  const list = genres ?? []

  return type === 'movie' ? (
    <MovieCarousel {...props} genres={list} />
  ) : (
    <TVCarousel {...props} genres={list} />
  )
}
