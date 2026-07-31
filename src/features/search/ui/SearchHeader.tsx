import { SearchMediaType } from '@/shared'
import SearchTabs from './SearchTabs'
import { SearchParams, getSearchSubtitle } from '../model'

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
  const subtitle = getSearchSubtitle({ term, filter })
  const title = term ?? label ?? '검색'

  return (
    <header className='mb-8 flex flex-col gap-4'>
      <p className='text-sm text-white/50'>{subtitle}</p>
      <h1 className='text-3xl font-semibold md:text-5xl'>
        <span className='text-white/70'>{title}</span>
      </h1>
      <SearchTabs selected={type} onSelect={changeType} />
    </header>
  )
}

export default SearchHeader
