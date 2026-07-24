import { API_ENDPOINT, getGenres, PageHelmet } from '@/shared'
import type { IMovie } from '@/entities/movie'
import { GenreMovieCard } from '@/widgets/genre-movie'
import { GenreSection } from '@/widgets/genre-section'

async function Movie() {
  const movieGenres = await getGenres('movie')

  return (
    <>
      <PageHelmet
        title='영화 목록'
        description='장르별 영화를 XFlix에서 탐색하세요. 인기작부터 다양한 장르의 영화를 한눈에 확인하세요.'
        keywords='영화, 목록, 장르, XFlix'
      />
      <section>
        <GenreSection<IMovie>
          label='영화'
          genres={movieGenres.data ?? []}
          endPoint={API_ENDPOINT.MOVIE_FILTERED}
          allTitle='전체 영화'
          fallbackTitle='영화'
          renderItem={movie => (
            <GenreMovieCard key={movie.id} content={movie} />
          )}
        />
      </section>
    </>
  )
}

export default Movie
