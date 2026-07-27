'use client'
import { useCallback, useEffect, useState } from 'react'

import { getSeason } from '../api'
import type { IEpisode } from './season.types'

interface IUseGetSeasonReturn {
  error: string | null
  isLoading: boolean
  episodes: IEpisode[]
  refetch: () => void
}

function useGetSeason(id: string, seasonNumber: number): IUseGetSeasonReturn {
  const [error, setError] = useState<string | null>(null)
  const [isLoading, setIsLoading] = useState(true)
  const [episodes, setEpisodes] = useState<IEpisode[]>([])
  const [refetchCount, setRefetchCount] = useState(0)

  const refetch = useCallback(() => {
    setRefetchCount(prev => prev + 1)
  }, [])

  useEffect(() => {
    if (!id || seasonNumber == null) {
      setIsLoading(false)
      setEpisodes([])
      setError(null)
      return
    }

    const resolvedSeasonNumber = seasonNumber.toString()
    let cancelled = false

    async function loadSeason() {
      setIsLoading(true)
      setEpisodes([])
      setError(null)

      const result = await getSeason(id, resolvedSeasonNumber)

      if (cancelled) return

      setEpisodes(result?.data?.episodes ?? [])
      setError(result.error)
      setIsLoading(false)
    }

    loadSeason()

    return () => {
      cancelled = true
    }
  }, [id, seasonNumber, refetchCount])

  return { error, isLoading, episodes, refetch }
}

export default useGetSeason
