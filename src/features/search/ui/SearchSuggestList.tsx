'use client'
import type { SearchSuggestItem } from '../model'
import { getSuggestKindLabel, getSuggestTypeLabel } from '../model'

interface SearchSuggestListProps {
  items: SearchSuggestItem[]
  onSelect: (item: SearchSuggestItem) => void
  isLoading?: boolean
}

function SearchSuggestList({
  items,
  onSelect,
  isLoading,
}: SearchSuggestListProps) {
  if (!isLoading && items.length === 0) return null

  return (
    <ul
      id='search-suggest-list'
      role='listbox'
      className='absolute left-0 right-0 top-full z-20 mt-1.5 max-h-56 overflow-y-auto rounded-md border border-white/15 bg-zinc-900 shadow-lg md:mt-2 md:max-h-64'
    >
      {isLoading && items.length === 0 ? (
        <li className='flex items-center justify-center px-3 py-2.5 md:px-4 md:py-3'>
          <div className='h-4 w-4 animate-spin rounded-full border-2 border-white border-t-transparent' />
        </li>
      ) : (
        items.map(item => {
          const typeLabel = getSuggestTypeLabel(item)

          return (
            <li key={`${item.kind}-${item.type}-${item.id}-${item.name}`}>
              <button
                type='button'
                role='option'
                className='flex w-full items-center justify-between gap-2 px-3 py-2.5 text-left text-sm text-white transition-colors hover:bg-white/10 md:gap-3 md:px-4 md:py-3 md:text-base'
                onClick={() => onSelect(item)}
              >
                <span className='truncate font-medium'>{item.name}</span>
                <span className='shrink-0 text-xs md:text-sm'>
                  <span className='text-white/50'>
                    {getSuggestKindLabel(item)}
                  </span>
                  {typeLabel && (
                    <span className='ml-1.5 text-white/30'>{typeLabel}</span>
                  )}
                </span>
              </button>
            </li>
          )
        })
      )}
    </ul>
  )
}

export default SearchSuggestList
