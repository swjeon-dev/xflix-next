import {
  API_ENDPOINT,
  tmdbFetch,
  type IApiReturn,
  type MediaType,
} from '@/shared'
import type {
  PersonCredits,
  PersonCredit,
  PersonMovieCredit,
  PersonTvCredit,
} from '../model'

// async function getPerson(term: string): Promise<IApiReturn<IPerson[]>> {
//   const result = await tmdbFetch<ITmdbContents<IPerson>>(
//     API_ENDPOINT.SEARCH_PERSON,
//     {
//       query: term,
//     },
//     '검색 결과를 찾을 수 없습니다.',
//     { next: { revalidate: 60 } },
//   )

//   if (result.error || !result.data?.results?.length) {
//     return {
//       data: null,
//       error: result.error ?? '올바르지 않은 응답 데이터 형식입니다.',
//     }
//   }

//   return { data: result.data.results, error: null }
// }

function mergeCredits<T extends PersonCredit>(cast: T[], crew: T[]): T[] {
  const uniqueCast = cast.filter(
    (item, idx) => cast.findIndex(c => c.id === item.id) === idx,
  )
  const uniqueCrew = crew.filter(
    (item, idx) => crew.findIndex(c => c.id === item.id) === idx,
  )
  return [
    ...uniqueCast,
    ...uniqueCrew.filter(item => !uniqueCast.some(c => c.id === item.id)),
  ]
}

type GetSearchByPersonParams = {
  id: string
  type: MediaType
}

async function getSearchByPerson({
  id,
  type,
}: GetSearchByPersonParams): Promise<
  IApiReturn<PersonMovieCredit[] | PersonTvCredit[]>
> {
  if (type === 'movie') {
    const result = await tmdbFetch<PersonCredits<PersonMovieCredit>>(
      API_ENDPOINT.MOVIE_SEARCH_BY_PERSON(id),
      undefined,
      '검색 결과를 찾을 수 없습니다.',
    )
    if (result.error || !result.data?.cast) {
      return {
        data: null,
        error: result.error ?? '올바르지 않은 응답 데이터 형식입니다.',
      }
    }

    const data = mergeCredits(result.data.cast, result.data.crew).sort((a, b) =>
      b.release_date.localeCompare(a.release_date),
    )
    return { data, error: null }
  }

  const result = await tmdbFetch<PersonCredits<PersonTvCredit>>(
    API_ENDPOINT.TV_SEARCH_BY_PERSON(id),
    undefined,
    '검색 결과를 찾을 수 없습니다.',
  )

  if (result.error || !result.data?.cast) {
    return {
      data: null,
      error: result.error ?? '올바르지 않은 응답 데이터 형식입니다.',
    }
  }

  const data = mergeCredits(result.data.cast, result.data.crew).sort((a, b) =>
    b.first_air_date.localeCompare(a.first_air_date),
  )
  return { data, error: null }
}

export { getSearchByPerson }
