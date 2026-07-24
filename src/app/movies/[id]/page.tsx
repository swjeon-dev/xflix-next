import { Metadata } from 'next'
import { cache } from 'react'

import {
  DeferredWrapper,
  FloatingBackButton,
  API_ENDPOINT,
  getTmdbImgPath,
} from '@/shared'
import { MovieDetailSection } from '@/widgets/movie-detail'
import { CarouselShell } from '@/widgets/carousel'
import { getMovie } from '@/entities/movie'

const DETAIL_QUERY = { append_to_response: 'credits' }

const getMovieData = cache(async (id: string) => {
  return await getMovie(id, DETAIL_QUERY)
})

export async function generateMetadata({
  params,
}: {
  params: Promise<{ id: string }>
}): Promise<Metadata> {
  const { id } = await params
  const { data: movie } = await getMovieData(id)

  const url = getTmdbImgPath({
    path: movie?.backdrop_path ?? movie?.poster_path,
    size: 'w1280',
  })

  return {
    title: movie?.title ?? '영화 상세',
    description: movie?.overview ?? '영화 상세 페이지',
    keywords: movie?.genres?.map(genre => genre.name).join(', '),
    openGraph: {
      type: 'video.movie',
      ...(url && { images: [{ url }] }),
    },
  }
}

async function MovieDetail({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params
  const { data: movie, error } = await getMovieData(id)

  return (
    <>
      <article>
        <MovieDetailSection movie={movie} error={error} />
        <CarouselShell
          type='movie'
          title='비슷한 장르 영화'
          endPoint={API_ENDPOINT.MOVIE_SIMILAR(id)}
          params={{ region: 'KR', page: 1 }}
        />
        <DeferredWrapper>
          <CarouselShell
            type='movie'
            title='추천하는 영화'
            endPoint={API_ENDPOINT.MOVIE_RECOMMEND(id)}
            params={{ region: 'KR', page: 1 }}
          />
        </DeferredWrapper>
      </article>

      <FloatingBackButton />
    </>
  )
}

export default MovieDetail
