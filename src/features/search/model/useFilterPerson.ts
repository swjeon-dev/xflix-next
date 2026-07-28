import { getDiscoverPersonParams } from '@/shared'

import type { SearchParams } from './search.types'
import useDiscoverFilter from './useDiscoverFilter'

function useFilterPerson({ filter, id, type }: SearchParams) {
  const enabled =
    (filter === 'cast' || filter === 'crew') && Boolean(id && type)

  const params =
    enabled && id && (filter === 'cast' || filter === 'crew')
      ? getDiscoverPersonParams(Number(id), filter, 'popularity.desc', type)
      : undefined

  return useDiscoverFilter({ enabled, type, params })
}

export default useFilterPerson
