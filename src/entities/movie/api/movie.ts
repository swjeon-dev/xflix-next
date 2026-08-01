import type { IMovie } from '../model'
import {
  type IApiReturn,
  type QueryParams,
  tmdbFetch,
  API_ENDPOINT,
} from '@/shared'

export const getMovie = async (
  id: string,
  queryParams?: QueryParams,
): Promise<IApiReturn<IMovie>> => {
  return tmdbFetch<IMovie>(
    API_ENDPOINT.MOVIE_DETAIL(id),
    queryParams,
    '현재 영화를 찾을 수 없습니다.',
  )
}
