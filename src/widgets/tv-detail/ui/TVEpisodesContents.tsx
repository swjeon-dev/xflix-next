import { useModal } from '@/shared'
import { EpisodePreviewItem, type IEpisode } from '@/entities/tv'
import { openEpisodesModal } from '../lib'

interface TVEpisodesContentsProps {
  seasonName: string
  episodes: IEpisode[]
  previewCount?: number
}

function TVEpisodesContents({
  seasonName,
  episodes,
  previewCount = 5,
}: TVEpisodesContentsProps) {
  const { openModal } = useModal()
  const previewEpisodes = episodes.slice(0, previewCount)
  const remainingCount = episodes.length - previewEpisodes.length

  return (
    <ul className='flex flex-col gap-2'>
      {previewEpisodes.map((episode: IEpisode) => (
        <EpisodePreviewItem
          key={episode.id}
          episode={episode}
          onClick={episode =>
            openEpisodesModal(openModal, seasonName, episodes, episode)
          }
        />
      ))}
      {remainingCount > 0 && (
        <li>
          <button
            type='button'
            className='w-full py-3 text-sm text-white/70 hover:text-white hover:bg-white/5 rounded-lg transition-colors'
            onClick={() => openEpisodesModal(openModal, seasonName, episodes)}
          >
            + {remainingCount}화 더 보기
          </button>
        </li>
      )}
    </ul>
  )
}

export default TVEpisodesContents
