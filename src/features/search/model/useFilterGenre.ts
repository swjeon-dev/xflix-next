import { getDiscoverParams } from '@/shared'

import type { SearchParams } from './search.types'
import useDiscoverFilter from './useDiscoverFilter'

function useFilterGenre({ filter, id, type }: SearchParams) {
  const enabled = Boolean(filter === 'genre' && id && type)

  const params =
    enabled && id
      ? getDiscoverParams(Number(id), 'popularity.desc', type)
      : undefined

  return useDiscoverFilter({ enabled, type, params })
}

export default useFilterGenre
