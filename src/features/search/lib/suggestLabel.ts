import type { SearchSuggestItem, SearchSuggestKind } from '../model'

const SUGGEST_KIND_LABEL: Record<
  Exclude<SearchSuggestKind, 'person'>,
  string
> = {
  genre: '장르',
  title: '제목',
}

function suggestKindLabel(item: SearchSuggestItem): string {
  if (item.kind === 'person') {
    return item.known_for_department === 'Acting' ? '출연' : '연출'
  }
  return SUGGEST_KIND_LABEL[item.kind]
}

function suggestTypeLabel(item: SearchSuggestItem): string | null {
  if (item.kind !== 'title') return null
  return item.type === 'tv' ? 'TV' : '영화'
}

export { suggestKindLabel, suggestTypeLabel }
