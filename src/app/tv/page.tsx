import type { Metadata } from 'next'

import { API_ENDPOINT, getGenres } from '@/shared'
import { GenreSection, resolveGenreId, resolveSort } from '@/widgets/genre'

export const metadata: Metadata = {
  title: 'TV 목록',
  description:
    '장르별 TV 프로그램을 XFlix에서 탐색하세요. 인기작부터 다양한 장르의 드라마를 한눈에 확인하세요.',
  keywords: 'TV, 목록, 장르, 드라마, XFlix',
}

export default async function TV({
  searchParams,
}: {
  searchParams: Promise<{ genre?: string; sort?: string }>
}) {
  const { genre, sort } = await searchParams
  const { data: tvGenres } = await getGenres('tv')
  const genreList = tvGenres ?? []

  return (
    <section>
      <GenreSection
        label='TV'
        genreId={resolveGenreId(genre, genreList)}
        sort={resolveSort(sort)}
        genreList={genreList}
        endPoint={API_ENDPOINT.TV_FILTERED}
        allTitle='전체 TV'
        fallbackTitle='TV'
      />
    </section>
  )
}
