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
