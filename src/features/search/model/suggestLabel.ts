import type { SearchSuggestItem, SearchSuggestKind } from './search.types'

const SUGGEST_KIND_LABEL: Record<Exclude<SearchSuggestKind, 'person'>, string> =
  {
    genre: '장르',
    title: '제목',
  }

function getSuggestKindLabel(item: SearchSuggestItem): string {
  if (item.kind === 'person') {
    return item.known_for_department === 'Acting' ? '출연' : '연출'
  }
  return SUGGEST_KIND_LABEL[item.kind]
}

function getSuggestTypeLabel(item: SearchSuggestItem): string | null {
  if (item.kind !== 'title') return null
  return item.type === 'tv' ? 'TV' : '영화'
}

function getSuggestLabel(item: SearchSuggestItem): string {
  const kindLabel = getSuggestKindLabel(item)
  const typeLabel = getSuggestTypeLabel(item)
  return typeLabel ? `${kindLabel} ${typeLabel}` : kindLabel
}

export {
  SUGGEST_KIND_LABEL,
  getSuggestKindLabel,
  getSuggestTypeLabel,
  getSuggestLabel,
}
