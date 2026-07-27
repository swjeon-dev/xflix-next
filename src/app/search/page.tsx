import {
  getSearchPageCopy,
  resolveSearchParams,
  SearchParams,
  SearchView,
} from '@/features/search'

export async function generateMetadata({ searchParams }: SearchPageProps) {
  const params = await searchParams
  const resolved = resolveSearchParams(params)
  const { type, term, filter, id, label } = resolved

  const { pageTitle, pageDescription } = getSearchPageCopy({
    type,
    term,
    filter,
    id,
    label,
  })

  return {
    title: pageTitle,
    description: pageDescription,
    robots: 'noindex, follow',
  }
}

interface SearchPageProps {
  searchParams: Promise<SearchParams>
}

export default async function Search({ searchParams }: SearchPageProps) {
  const params = await searchParams

  return <SearchView params={params} />
}
