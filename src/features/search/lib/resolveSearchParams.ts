import type { SearchParams } from '../model/search.types'

function resolveSearchParams(params: SearchParams): Required<SearchParams> {
  const { type, term, filter, id, label } = params

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
      label: label?.trim() || null,
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
