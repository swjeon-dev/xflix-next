import { useModal } from '@/shared'
import type { IEpisode } from '@/entities/tv'

function openEpisodesModal(
  openModal: ReturnType<typeof useModal>['openModal'],
  seasonName: string,
  episodes: IEpisode[],
  episode: IEpisode | null = null,
) {
  openModal({
    type: 'episodes',
    props: {
      seasonName,
      episodes,
      initialEpisode: episode,
    },
  })
}

export default openEpisodesModal
