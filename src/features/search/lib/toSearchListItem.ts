import { isMovie, type IMovie } from '@/entities/movie'
import type { ITV } from '@/entities/tv'
import type { ISearchData } from '../model'

function toSearchListItem(item: IMovie | ITV): ISearchData {
  if (isMovie(item)) {
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
    adult: item.adult ?? false,
    poster_path: item.poster_path ?? undefined,
    name: item.name,
    original_name: item.original_name,
    first_air_date: item.first_air_date,
    popularity: item.popularity,
    media_type: 'tv',
  }
}

export { toSearchListItem }
