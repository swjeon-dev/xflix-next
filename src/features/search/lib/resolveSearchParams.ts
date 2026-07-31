import type { SearchFilterType, SearchMediaType } from '@/shared'
import type { SearchParams } from '../model'

function normalizeSearchFilter(
  filter: string | null | undefined,
): SearchFilterType | null {
  if (filter === 'genre') return 'genre'
  // cast/crew → person (with_people 통합, 구 URL 호환)
  if (filter === 'person' || filter === 'cast' || filter === 'crew') {
    return 'person'
  }
  return null
}

function normalizeSearchMediaType(
  type: string | null | undefined,
): SearchMediaType {
  return type === 'tv' ? 'tv' : 'movie'
}

function resolveSearchParams(params: SearchParams): Required<SearchParams> {
  const type = normalizeSearchMediaType(params.type)
  const term = params.term?.trim() || null
  const filter = normalizeSearchFilter(params.filter)
  const id = params.id ? String(params.id) : null
  const label = params.label?.trim() || null

  if (term) {
    return {
      type,
      term,
      filter: null,
      id: null,
      label: null,
    }
  }

  if (filter && id && label) {
    return {
      type,
      term: null,
      filter,
      id,
      label,
    }
  }

  return {
    type,
    term: null,
    filter: null,
    id: null,
    label: null,
  }
}

export { resolveSearchParams }
