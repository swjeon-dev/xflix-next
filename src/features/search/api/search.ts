import { tmdbFetch, type IApiReturn, API_ENDPOINT } from '@/shared'
import type { SearchMediaType } from '@/shared'
import type { ISearchData, ISearchResult } from '../model'

function getSearchEndpoint(type: SearchMediaType) {
  return type === 'movie' ? API_ENDPOINT.SEARCH_MOVIE : API_ENDPOINT.SEARCH_TV
}

export const getSearch = async (
  term: string,
  page: number,
  type: SearchMediaType,
): Promise<IApiReturn<ISearchResult>> => {
  return tmdbFetch<ISearchResult>(
    getSearchEndpoint(type),
    {
      query: term,
      include_adult: false,
      page,
    },
    '검색 결과를 찾을 수 없습니다.',
  )
}

export const getMultiSearch = async (
  term: string,
): Promise<IApiReturn<ISearchData[]>> => {
  const result = await tmdbFetch<ISearchResult>(
    API_ENDPOINT.MULTI_SEARCH,
    {
      query: term,
      include_adult: false,
    },
    '검색 결과를 찾을 수 없습니다.',
  )

  if (result.error || !result.data) {
    return { data: null, error: result.error }
  }

  return { data: result.data.results ?? [], error: null }
}

export const getSearchByPerson = async (
  id: string,
  type: SearchMediaType,
): Promise<IApiReturn<ISearchData[]>> => {
  const result = await tmdbFetch<{ cast: ISearchData[]; crew: ISearchData[] }>(
    type === 'movie'
      ? API_ENDPOINT.MOVIE_SEARCH_BY_PERSON(id)
      : API_ENDPOINT.TV_SEARCH_BY_PERSON(id),
    undefined,
    '검색 결과를 찾을 수 없습니다.',
  )

  if (result.error || !result.data) {
    return { data: null, error: result.error }
  }

  const { cast, crew } = result.data

  const uniqueCast = cast.filter(
    (item, idx) => cast.findIndex(c => c.id === item.id) === idx,
  )
  const uniqueCrew = crew.filter(
    (item, idx) => crew.findIndex(c => c.id === item.id) === idx,
  )

  const data = [
    ...uniqueCast,
    ...uniqueCrew.filter(item => !uniqueCast.some(c => c.id === item.id)),
  ].sort((a, b) => {
    if (type === 'movie') {
      return b.release_date?.localeCompare(a.release_date ?? '') ?? 0
    } else {
      return b.first_air_date?.localeCompare(a.first_air_date ?? '') ?? 0
    }
  })
  return { data: data ?? [], error: null }
}
