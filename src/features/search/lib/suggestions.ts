import { getGenres } from '@/shared'
import { getMultiSearch } from '../api'
import type { SearchSuggestItem } from '../model'

async function matchGenre(term: string): Promise<SearchSuggestItem[]> {
  const genre = await Promise.all([getGenres('movie'), getGenres('tv')]).then(
    ([{ data: movieGenres }, { data: tvGenres }]) => {
      const genresA = movieGenres?.find(g =>
        g.name.toLowerCase().includes(term),
      )
      const genresB = tvGenres?.find(g => g.name.toLowerCase().includes(term))

      return genresA ?? genresB
    },
  )

  if (!genre) return []

  return [{ id: genre.id, name: genre.name, kind: 'genre', type: 'movie' }]
}

async function matchPersonNtitle(term: string): Promise<SearchSuggestItem[]> {
  const { data: results } = await getMultiSearch(term)

  if (!results?.length) return []

  const items: SearchSuggestItem[] = []

  for (const result of results.slice(0, 5)) {
    if (result.media_type === 'person') {
      items.push({
        id: result.id,
        name: result.name ?? '',
        kind: 'person',
        type: 'movie',
        known_for_department: result.known_for_department,
      })
      continue
    }

    if (result.media_type === 'movie' || result.media_type === 'tv') {
      items.push({
        id: result.id,
        name: result.name ?? result.title ?? '',
        kind: 'title',
        type: result.media_type,
      })
    }
  }

  return items
}

async function getSuggestions(search: string): Promise<SearchSuggestItem[]> {
  const [personNtitleSuggestions, genreSuggestions] = await Promise.all([
    matchPersonNtitle(search),
    matchGenre(search),
  ])

  return [...personNtitleSuggestions, ...genreSuggestions]
}

export { getSuggestions }
