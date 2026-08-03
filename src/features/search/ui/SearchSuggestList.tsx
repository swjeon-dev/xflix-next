'use client'
import type { SearchSuggestItem } from '../model'
import SearchSuggestOption from './SearchSuggestOption'
interface SearchSuggestListProps {
  items: SearchSuggestItem[]
  onSelect: (path: string) => void
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
        <SearchSuggestOption items={items} onSelect={onSelect} />
      )}
    </ul>
  )
}

export default SearchSuggestList
