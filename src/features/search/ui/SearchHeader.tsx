import { SearchMediaType } from '@/shared'
import SearchTabs from './SearchTabs'
import { SearchParams } from '../model/search.types'
import { SEARCH_FILTER_LABELS } from '../lib'

interface SearchHeaderProps extends SearchParams {
  changeType: (type: SearchMediaType) => void
}

// 영화 or tv 필터 변경
function SearchHeader({
  type,
  term,
  label,
  filter,
  changeType,
}: SearchHeaderProps) {
  const subtitle = filter ? SEARCH_FILTER_LABELS[filter] : '검색 결과'
  const title = term ?? label ?? '검색'

  return (
    <header className='mb-8 flex flex-col gap-4'>
      <p className='text-sm text-white/50'>{subtitle ?? '검색 결과'}</p>
      <h1 className='text-3xl font-semibold md:text-5xl'>
        <span className='text-white/70'>{title ?? '검색'}</span>
      </h1>
      <SearchTabs selected={type} onSelect={changeType} />
    </header>
  )
}

export default SearchHeader
