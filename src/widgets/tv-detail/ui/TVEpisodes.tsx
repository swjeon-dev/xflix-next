'use client'
import type { ISeason } from '@/entities/tv'

import { useTVEpisodes } from '../model'
import TVEpisodesWrapper from './TVEpisodesWrapper'
import TVEpisodesHeader from './TVEpisodesHeader'
import TVEpisodesLoader from './TVEpisodesLoader'
import TVEpisodesError from './TVEpisodesError'
import TVEpisodesContents from './TVEpisodesContents'

interface TVEpisodesProps extends Pick<
  ISeason,
  'season_number' | 'name' | 'poster_path' | 'air_date' | 'episode_count'
> {
  tvId: string
  previewCount?: number
}

function TVEpisodes({
  tvId,
  previewCount = 5,
  season_number,
  name,
  poster_path,
  air_date,
  episode_count,
}: TVEpisodesProps) {
  const { episodes, hasEpisodes, isLoading, error, refetch } = useTVEpisodes(
    tvId,
    season_number,
  )

  if (!isLoading && !error && !hasEpisodes) return null

  return (
    <TVEpisodesWrapper title={name}>
      <TVEpisodesHeader
        posterPath={poster_path}
        displayCount={episode_count}
        hasEpisodes={hasEpisodes}
        airDate={air_date}
        seasonName={name}
        episodes={episodes}
      />
      {isLoading && <TVEpisodesLoader length={previewCount} />}
      {error && <TVEpisodesError onRetry={refetch} />}
      {!isLoading && !error && hasEpisodes && (
        <TVEpisodesContents
          seasonName={name}
          episodes={episodes}
          previewCount={previewCount}
        />
      )}
    </TVEpisodesWrapper>
  )
}

export default TVEpisodes
