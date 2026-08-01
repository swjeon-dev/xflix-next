'use client'
import { useRouter } from 'next/navigation'

import { routes, SearchMediaType } from '@/shared'
import SearchHeader from './SearchHeader'
import SearchList from './SearchList'
import { useSearchResults } from '../model'
import type { SearchParams } from '../model'

export default function SearchView({
  params,
  emptyMessage,
}: {
  params: SearchParams
  emptyMessage: string
}) {
  const router = useRouter()

  const { items, isLoading, isFetchingMore, error, loaderRef, refetch } =
    useSearchResults(params)

  function changeType(newType: SearchMediaType) {
    const newParams: Record<string, string> = { type: newType }

    for (const [key, value] of Object.entries(params)) {
      if (typeof value === 'string' && key !== 'type') {
        newParams[key] = value
      }
    }

    router.replace(routes.SEARCH.path(newParams))
  }

  return (
    <section className='min-h-screen pb-20 pt-24 text-white main-page_px'>
      <SearchHeader {...params} changeType={changeType} />

      <SearchList
        type={params.type}
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
