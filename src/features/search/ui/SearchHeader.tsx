import SearchTabs from './SearchTabs'
import type { SearchParams } from '../model'
import { searchSubtitle } from '../lib'

// 영화 or tv 필터 변경
function SearchHeader({ params }: { params: SearchParams }) {
  const { term, label, filter } = params
  const subtitle = searchSubtitle({ term, filter })
  const title = term ?? label ?? '검색'

  return (
    <header className='mb-8 flex flex-col gap-4'>
      <p className='text-sm text-white/50'>{subtitle}</p>
      <h1 className='text-3xl font-semibold md:text-5xl'>
        <span className='text-white/70'>{title}</span>
      </h1>
      <SearchTabs params={params} />
    </header>
  )
}

export default SearchHeader
