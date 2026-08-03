import type { PersonMovieCredit, PersonTvCredit } from '@/entities/person'
import type { ISearchData } from './search.types'

function toPersonCreditSearchItem(
  item: PersonMovieCredit | PersonTvCredit,
): ISearchData {
  if ('title' in item) {
    return {
      id: item.id,
      adult: item.adult,
      poster_path: item.poster_path ?? undefined,
      title: item.title,
      original_title: item.original_title,
      release_date: item.release_date,
      popularity: item.popularity,
      media_type: 'movie',
    }
  }

  return {
    id: item.id,
    adult: false,
    poster_path: item.poster_path ?? undefined,
    name: item.name,
    first_air_date: item.first_air_date,
    popularity: item.popularity,
    media_type: 'tv',
  }
}

export { toPersonCreditSearchItem }
