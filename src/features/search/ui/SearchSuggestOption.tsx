import { useRouter } from 'next/navigation'

import { getSuggestPath, suggestKindLabel, suggestTypeLabel } from '../lib'
import { SearchSuggestItem } from '../model'

function SearchSuggestOption({
  items,
  onSelect,
}: {
  items: SearchSuggestItem[]
  onSelect: (path: string) => void
}) {
  const router = useRouter()

  return items.map(item => {
    const path = getSuggestPath(item)
    const kindLabel = suggestKindLabel(item)
    const typeLabel = suggestTypeLabel(item)

    return (
      <li key={`${item.kind}-${item.type}-${item.id}-${item.name}`}>
        <button
          type='button'
          onMouseEnter={() => router.prefetch(path)}
          onClick={() => onSelect(path)}
          role='option'
          className='flex w-full items-center justify-between gap-2 px-3 py-2.5 text-left text-sm text-white transition-colors hover:bg-white/10 md:gap-3 md:px-4 md:py-3 md:text-base'
        >
          <span className='truncate font-medium'>{item.name}</span>
          <span className='shrink-0 text-xs md:text-sm'>
            <span className='text-white/50'>{kindLabel}</span>
            {typeLabel && (
              <span className='ml-1.5 text-white/30'>{typeLabel}</span>
            )}
          </span>
        </button>
      </li>
    )
  })
}

export default SearchSuggestOption
