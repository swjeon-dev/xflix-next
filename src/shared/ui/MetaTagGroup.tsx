import type { IFilterTag, FilterType, MediaType } from '@/shared'

import TagLink from './TagLink'

interface MetaTagGroupProps {
  label: string
  filter: FilterType
  tags: IFilterTag[]
  type: MediaType
}

function MetaTagGroup({ label, filter, tags, type }: MetaTagGroupProps) {
  if (!tags.length) return null

  return (
    <div className='flex flex-col gap-2'>
      <h4 className='text-sm text-gray-400/80'>{label}</h4>
      <div className='flex flex-wrap gap-2'>
        {tags.map(tag => (
          <TagLink
            key={`${filter}-${tag.id}`}
            filter={filter}
            tag={tag}
            type={type}
          />
        ))}
      </div>
    </div>
  )
}

export default MetaTagGroup
