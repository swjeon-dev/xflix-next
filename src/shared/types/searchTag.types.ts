type MediaType = 'movie' | 'tv'
type MultiMediaType = 'person' | MediaType

type FilterType = 'genre' | 'person'

interface IFilterTag {
  id: number
  name: string
}

export type { MediaType, MultiMediaType, FilterType, IFilterTag }
