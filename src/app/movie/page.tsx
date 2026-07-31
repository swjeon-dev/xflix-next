import type { Metadata } from 'next'

import { API_ENDPOINT, getGenres } from '@/shared'
import { GenreSection, resolveSort } from '@/widgets/genre'

export const metadata: Metadata = {
  title: '영화 목록',
  description:
    '장르별 영화를 XFlix에서 탐색하세요. 인기작부터 다양한 장르의 영화를 한눈에 확인하세요.',
  keywords: '영화, 목록, 장르, XFlix',
}

export default async function Movies({
  searchParams,
}: {
  searchParams: Promise<{ genre?: string; sort?: string }>
}) {
  const { genre, sort } = await searchParams
  const { data: movieGenres } = await getGenres('movie')

  return (
    <section>
      <GenreSection
        label='영화'
        genreId={genre ? Number(genre) : 0}
        sort={resolveSort(sort)}
        genreList={movieGenres ?? []}
        endPoint={API_ENDPOINT.MOVIE_FILTERED}
        allTitle='전체 영화'
        fallbackTitle='영화'
      />
    </section>
  )
}
