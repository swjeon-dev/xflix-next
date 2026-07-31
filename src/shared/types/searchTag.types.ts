type SearchMediaType = 'movie' | 'tv'
type MultiSearchMediaType = 'person' | SearchMediaType

type SearchFilterType = 'genre' | 'person'

interface ISearchFilterTag {
  id: number
  name: string
}

export type {
  SearchMediaType,
  MultiSearchMediaType,
  SearchFilterType,
  ISearchFilterTag,
}
