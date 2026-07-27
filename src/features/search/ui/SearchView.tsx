'use client'
import { useRouter } from 'next/navigation'

import { routes, SearchMediaType } from '@/shared'
import { SearchParams } from '../model/search.types'
import SearchHeader from './SearchHeader'
import { getSearchPageCopy, resolveSearchParams } from '../lib'
import SearchList from './SearchList'
import { useSearchResults } from '../model'

export default function SearchView({ params }: { params: SearchParams }) {
  const router = useRouter()

  const resolved = resolveSearchParams(params)

  const { emptyMessage } = getSearchPageCopy(resolved)

  const { items, isLoading, isFetchingMore, error, loaderRef, refetch } =
    useSearchResults(resolved)

  function changeType(newType: SearchMediaType) {
    const newParams: Record<string, string> = { type: newType }

    for (const [key, value] of Object.entries(resolved)) {
      if (typeof value === 'string' && key !== 'type') {
        newParams[key] = value
      }
    }

    router.replace(routes.SEARCH.path(newParams))
  }

  return (
    <section className='min-h-screen pb-20 pt-24 text-white main-page_px'>
      <SearchHeader {...resolved} changeType={changeType} />

      <SearchList
        type={resolved.type}
        items={items}
        isLoading={isLoading}
        isFetchingMore={isFetchingMore}
        error={error}
        loaderRef={loaderRef}
        emptyMessage={emptyMessage}
        onRetry={refetch}
      />
    </section>
  )
}
