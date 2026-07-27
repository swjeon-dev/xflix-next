import { Metadata } from 'next'

import { API_ENDPOINT, getGenres } from '@/shared'
import { GenreSection } from '@/widgets/genre'

export const metadata: Metadata = {
  title: 'TV 목록',
  description:
    '장르별 TV 프로그램을 XFlix에서 탐색하세요. 인기작부터 다양한 장르의 드라마를 한눈에 확인하세요.',
  keywords: 'TV, 목록, 장르, 드라마, XFlix',
}

export default async function TV() {
  const { data: tvGenres } = await getGenres('tv')

  return (
    <section>
      <GenreSection
        label='TV'
        genres={tvGenres ?? []}
        endPoint={API_ENDPOINT.TV_FILTERED}
        allTitle='전체 TV'
        fallbackTitle='TV'
      />
    </section>
  )
}
