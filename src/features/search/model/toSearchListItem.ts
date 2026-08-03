import type { ISearchData } from './search.types'

type SearchListMovieSource = {
  id: number
  adult: boolean
  title: string
  original_title?: string
  poster_path: string | null
  release_date: string
  popularity: number
}
type SearchListTvSource = {
  id: number
  adult?: boolean
  name: string
  original_name?: string
  poster_path: string | null
  first_air_date: string
  popularity: number
}

function toSearchListItem(
  item: SearchListMovieSource | SearchListTvSource,
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
