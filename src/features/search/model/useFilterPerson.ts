import { getDiscoverPersonParams } from '@/shared'

import type { SearchParams } from './search.types'
import useDiscoverFilter from './useDiscoverFilter'

function useFilterPerson({ filter, id, type }: SearchParams) {
  const enabled = filter === 'person' && Boolean(id && type)

  const params =
    enabled && id
      ? getDiscoverPersonParams(Number(id), 'popularity.desc', type)
      : undefined

  return useDiscoverFilter({ enabled, type, params })
}

export default useFilterPerson
