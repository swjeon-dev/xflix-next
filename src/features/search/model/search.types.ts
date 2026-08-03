import type { FilterType, MediaType } from '@/shared'

type SearchSuggestKind = 'genre' | 'person' | 'title'

type SearchParams = {
  type: MediaType
  term?: string | null
  filter?: FilterType | null
  id?: string | null
  label?: string | null
}

type SearchSuggestItem = {
  kind: SearchSuggestKind
  type: MediaType
  id: number
  name: string
  known_for_department?: string
}

interface ISearchResult {
  page: number
  results: ISearchData[]
  total_pages: number
  total_results: number
}

interface IUseSearchProps {
  term: string | null | undefined
  type: MediaType
}

interface ISearchData {
  adult: boolean
  backdrop_path?: string
  id: number
  name?: string
  original_name?: string
  overview?: string
  poster_path?: string
  media_type: string
  original_language?: string
  genre_ids?: number[]
  popularity: number
  first_air_date?: string
  softcore?: boolean
  vote_average?: number
  vote_count?: number
  origin_country?: string[]
  title?: string
  original_title?: string
  release_date?: string
  video?: boolean
  known_for_department?: string
}

export type {
  ISearchResult,
  ISearchData,
  IUseSearchProps,
  SearchParams,
  SearchSuggestKind,
  SearchSuggestItem,
}
