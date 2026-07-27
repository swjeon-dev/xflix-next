import { getTmdbImgPath, useModal } from '@/shared'
import type { IEpisode } from '@/entities/tv'
import { openEpisodesModal } from '../lib'

interface TVEpisodesHeaderProps {
  posterPath: string | null
  displayCount: number
  hasEpisodes: boolean
  airDate: string | null
  seasonName: string
  episodes: IEpisode[]
}

function TVEpisodesHeader({
  posterPath,
  displayCount,
  hasEpisodes,
  airDate,
  seasonName,
  episodes,
}: TVEpisodesHeaderProps) {
  const { openModal } = useModal()
  const posterUrl = getTmdbImgPath({ path: posterPath, size: 'w154' })

  return (
    <div className='flex flex-wrap gap-4 items-center justify-between mb-2'>
      <div className='flex gap-4 items-start'>
        {posterUrl && (
          <img
            loading='lazy'
            decoding='async'
            src={posterUrl}
            alt={`${seasonName} 시즌 포스터`}
            className='w-24 md:w-32 rounded-md object-cover shrink-0'
          />
        )}
        <div className='flex flex-col gap-1'>
          <h3 className='text-xl font-semibold'>{seasonName ?? '시즌'}</h3>
          <p className='text-sm text-white/60'>
            {displayCount}화{airDate ? ` · ${airDate.split('-')[0]}` : ''}
          </p>
        </div>
      </div>
      {hasEpisodes && (
        <button
          type='button'
          className='px-4 py-2 rounded-md bg-white/10 hover:bg-white/20 text-sm shrink-0'
          onClick={() => openEpisodesModal(openModal, seasonName, episodes)}
        >
          에피소드 목록 ({displayCount}화)
        </button>
      )}
    </div>
  )
}

export default TVEpisodesHeader
