'use client'
import { useState } from 'react'
import { useRouter } from 'next/navigation'

import { routes } from '@/shared'
import SearchSuggestList from './SearchSuggestList'
import { useSuggestions, type SearchSuggestItem } from '../model'

interface SearchModalContentsProps {
  onClose: () => void
}

function SearchModalContents({ onClose }: SearchModalContentsProps) {
  const router = useRouter()
  const [search, setSearch] = useState('')
  const { suggestions, isLoading } = useSuggestions(search)

  function onSubmit(e: React.SubmitEvent<HTMLFormElement>) {
    e.preventDefault()

    const term = search.trim()
    if (!term.length) return

    setSearch('')
    onClose()
    router.push(routes.SEARCH.path({ term, type: 'movie' }))
  }

  function onSelect(item: SearchSuggestItem) {
    setSearch('')
    onClose()

    if (item.kind === 'title') {
      router.push(
        item.type === 'movie'
          ? routes.MOVIE.DETAIL(item.id)
          : routes.TV.DETAIL(item.id),
      )
      return
    }

    router.push(
      routes.SEARCH.path({
        type: item.type,
        filter: item.kind,
        id: item.id,
        label: item.name,
      }),
    )
  }

  return (
    <form
      onSubmit={onSubmit}
      className='relative flex w-full flex-col gap-3 md:gap-4'
    >
      <h2
        id='search-modal-title'
        className='text-xl font-semibold text-white md:text-2xl'
      >
        검색
      </h2>
      <div className='relative'>
        <div className='flex items-stretch gap-2 md:gap-3'>
          <input
            type='text'
            name='search'
            placeholder='영화, TV 프로그램 제목 검색'
            value={search}
            onChange={e => setSearch(e.target.value)}
            autoFocus
            autoComplete='off'
            className='min-w-0 flex-1 rounded-md border border-white/20 bg-zinc-900 px-3 py-2.5 text-base text-white placeholder:text-white/40 outline-none focus:border-white/50 sm:px-4 sm:py-3 sm:text-lg'
          />
          <button
            type='submit'
            className='shrink-0 rounded bg-red-600 px-4 text-sm font-semibold text-white transition-colors hover:bg-red-700 sm:px-6 sm:text-base'
          >
            검색
          </button>
        </div>
        <SearchSuggestList
          items={suggestions}
          onSelect={onSelect}
          isLoading={isLoading}
        />
      </div>
    </form>
  )
}

export default SearchModalContents
