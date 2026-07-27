'use client'
import { useGetSeason } from '@/entities/tv'

function useTVEpisodes(tvId: string, seasonNumber: number) {
  const { episodes, isLoading, error, refetch } = useGetSeason(
    tvId,
    seasonNumber,
  )
  return {
    episodes,
    hasEpisodes: episodes.length > 0,
    isLoading,
    error,
    refetch,
  }
}

export default useTVEpisodes
