import {
  API_ENDPOINT,
  tmdbFetch,
  type IApiReturn,
  type ITmdbContents,
} from '@/shared'
import type { IPerson } from '../model'

async function getPerson(term: string): Promise<IApiReturn<IPerson[]>> {
  const result = await tmdbFetch<ITmdbContents<IPerson>>(
    API_ENDPOINT.SEARCH_PERSON,
    {
      query: term,
    },
    '검색 결과를 찾을 수 없습니다.',
    { next: { revalidate: 60 } },
  )

  if (result.error || !result.data?.results?.length) {
    return {
      data: null,
      error: result.error ?? '올바르지 않은 응답 데이터 형식입니다.',
    }
  }

  return { data: result.data.results, error: null }
}

export { getPerson }
