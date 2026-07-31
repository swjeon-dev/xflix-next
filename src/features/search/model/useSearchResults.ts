import useSearch from './useSearch'
import useFilterGenre from './useFilterGenre'
import useFilterPerson from './useFilterPerson'
import type { SearchParams } from './search.types'

function useSearchResults({ term, type, filter, id }: SearchParams) {
  const searchResult = useSearch({ term, type })
  const genreFilterResult = useFilterGenre({ filter, id, type })
  const personFilterResult = useFilterPerson({ filter, id, type })

  if (filter === 'genre') return genreFilterResult
  if (filter === 'person') return personFilterResult
  return searchResult
}

export default useSearchResults
