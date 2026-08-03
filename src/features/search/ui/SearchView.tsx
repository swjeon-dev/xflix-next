'use client'

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
  const { items, isLoading, isFetchingMore, error, loaderRef, refetch } =
    useSearchResults(params)

  return (
    <section className='min-h-screen pb-20 pt-24 text-white main-page_px'>
      <SearchHeader params={params} />

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
