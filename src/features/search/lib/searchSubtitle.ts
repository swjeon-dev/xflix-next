import type { SearchParams } from '../model'
import { FILTER_LABEL } from './searchFilterLabel'

function searchSubtitle({
  term,
  filter,
}: Pick<SearchParams, 'term' | 'filter'>) {
  if (filter) return `${FILTER_LABEL[filter]} 검색`
  if (term) return '제목 검색'
  return '검색'
}

export { searchSubtitle }
