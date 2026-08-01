import type { IEpisodes } from '../model'
import { tmdbFetch, type IApiReturn, API_ENDPOINT } from '@/shared'

export const getSeason = async (
  id: string,
  seasonNumber: string,
): Promise<IApiReturn<IEpisodes>> => {
  return tmdbFetch<IEpisodes>(
    API_ENDPOINT.TV_SEASONS(id, seasonNumber),
    undefined,
    '시즌 정보를 찾을 수 없습니다.',
  )
}
