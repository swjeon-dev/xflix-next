import type { SearchParams } from '../model'
import { FILTER_LABEL } from '../model'

type SearchPageCopy = {
  pageTitle: string
  pageDescription: string
  emptyMessage: string
}

function getSearchPageCopy({
  type,
  term,
  filter,
  label,
}: SearchParams): SearchPageCopy {
  const tabLabel = type === 'movie' ? '영화' : 'TV'

  const filterTypeLabel = filter ? FILTER_LABEL[filter] : null

  if (term) {
    return {
      pageTitle: `"${term}" 검색`,
      pageDescription: `"${term}" ${tabLabel} 검색 결과를 XFlix에서 확인하세요.`,
      emptyMessage: `"${term}"에 대한 ${tabLabel} 검색 결과가 없습니다.`,
    }
  }

  if (label && filterTypeLabel) {
    return {
      pageTitle: `${label} · ${filterTypeLabel}`,
      pageDescription: `${label} ${filterTypeLabel} ${tabLabel} 목록을 XFlix에서 확인하세요.`,
      emptyMessage: `"${label}" ${filterTypeLabel} ${tabLabel} 결과가 없습니다.`,
    }
  }

  return {
    pageTitle: '검색',
    pageDescription: '영화와 TV 프로그램을 XFlix에서 검색하세요.',
    emptyMessage: '검색 결과가 없습니다.',
  }
}

export type { SearchPageCopy }
export { getSearchPageCopy }
