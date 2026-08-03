import Link from 'next/link'

import { routes, type MediaType } from '@/shared'
import type { SearchParams } from '../model'

const SEARCH_TABS: { id: MediaType; label: string }[] = [
  { id: 'movie', label: '영화' },
  { id: 'tv', label: 'TV' },
]
function SearchTabs({ params }: { params: SearchParams }) {
  const { type } = params

  const className =
    'rounded-full border border-white/50 bg-gray-500/40 px-4 py-1.5 text-sm font-bold text-white transition-colors aria-selected:border-white aria-selected:bg-white aria-selected:text-gray-900'

  return (
    <div
      className='flex flex-wrap gap-2'
      role='tablist'
      aria-label='검색 결과 유형'
    >
      {SEARCH_TABS.map(tab => (
        <Link
          role='tab'
          href={routes.SEARCH.path({ ...params, type: tab.id })}
          key={tab.id}
          aria-selected={type === tab.id}
          className={className}
          replace
        >
          {tab.label}
        </Link>
      ))}
    </div>
  )
}

export default SearchTabs
