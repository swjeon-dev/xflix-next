import { SearchParams } from './search.types'
import { FILTER_LABEL } from './searchFilterLabel'

function getSearchSubtitle({
  term,
  filter,
}: Pick<SearchParams, 'term' | 'filter'>) {
  if (filter) return `${FILTER_LABEL[filter]} 검색`
  if (term) return '제목 검색'
  return '검색'
}

export { getSearchSubtitle }
