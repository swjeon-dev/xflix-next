import { routes, type SearchMediaType } from '@/shared'
import type { ISearchData } from './search.types'

function getSearchDetailPath(type: SearchMediaType, item: ISearchData) {
  return type === 'movie'
    ? routes.MOVIE.DETAIL(item.id)
    : routes.TV.DETAIL(item.id)
}

export { getSearchDetailPath }
