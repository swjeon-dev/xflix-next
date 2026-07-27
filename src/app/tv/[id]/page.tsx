import { Metadata } from 'next'

import { DeferredWrapper, FloatingBackButton, getTmdbImgPath } from '@/shared'
import { TVDetailSection, TVEpisodes } from '@/widgets/tv-detail'
import { getTV } from '@/entities/tv'

const DETAIL_QUERY = { append_to_response: 'credits' }

async function getTVData(id: string) {
  return await getTV(id, DETAIL_QUERY)
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ id: string }>
}): Promise<Metadata> {
  const { id } = await params
  const { data: tv } = await getTVData(id)

  const url = getTmdbImgPath({
    path: tv?.backdrop_path ?? tv?.poster_path,
    size: 'w1280',
  })
  return {
    title: tv?.name ?? 'TV 상세',
    description:
      tv?.overview ??
      'TV의 상세 정보, 출연진, 에피소드를 XFlix에서 확인하세요.',
    keywords:
      tv?.genres?.map(genre => genre.name).join(', ') ??
      'TV의 상세 정보, 출연진, 에피소드를 XFlix에서 확인하세요.',
    openGraph: {
      type: 'video.tv_show',
      ...(url && { images: [{ url }] }),
    },
  }
}

export default async function TVDetail({
  params,
}: {
  params: Promise<{ id: string }>
}) {
  const { id } = await params
  const { data: tv, error } = await getTVData(id)

  return (
    <>
      <article key={id}>
        <TVDetailSection tv={tv} error={error} />

        {tv?.seasons
          ?.filter(s => s.episode_count > 0)
          .map(season => (
            <DeferredWrapper key={season.id}>
              <TVEpisodes tvId={id} {...season} />
            </DeferredWrapper>
          ))}
      </article>

      <FloatingBackButton />
    </>
  )
}
