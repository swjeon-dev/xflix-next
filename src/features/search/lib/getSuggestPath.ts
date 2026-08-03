import { routes } from '@/shared'
import type { SearchSuggestItem } from '../model'

function getSuggestPath(item: SearchSuggestItem) {
  if (item.kind === 'title') {
    return item.type === 'movie'
      ? routes.MOVIE.DETAIL(item.id)
      : routes.TV.DETAIL(item.id)
  }
  return routes.SEARCH.path({
    type: item.type,
    filter: item.kind,
    id: item.id,
    label: item.name,
  })
}

export { getSuggestPath }
