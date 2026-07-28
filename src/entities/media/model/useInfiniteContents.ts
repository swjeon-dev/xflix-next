import { useCallback, useMemo } from 'react'

import { BaseMedia, useInfinitePagination, usePaginatedList } from '@/shared'
import useGetContents from './useGetContents'

type ReturnType<T extends BaseMedia> = {
  loaderRef: (node: HTMLElement | null) => void
  contents: T[]
  isLoading: boolean
  isFetchingMore: boolean
  hasMore: boolean
  error: string | null
  refetch: () => void
}
type UseInfiniteContentsProps = {
  endPoint: string
  params?: Record<string, string | number | boolean>
  scrollRef?: React.RefObject<HTMLUListElement | null>
  direction?: 'horizontal' | 'vertical'
  enabled?: boolean
}

function useInfiniteContents<T extends BaseMedia>({
  endPoint,
  params,
  scrollRef,
  direction = scrollRef ? 'horizontal' : 'vertical',
  enabled = true,
}: UseInfiniteContentsProps): ReturnType<T> {
  const queryKey = JSON.stringify({ endPoint, params })
  const mode =
    direction === 'horizontal' ? 'horizontal-carousel' : 'vertical-list'

  const pagination = usePaginatedList<T>({ queryKey, enabled })

  const { isLoading, isFetching, error, contents, refetch } = useGetContents<T>(
    endPoint,
    { ...params, page: pagination.page },
    { enabled },
  )

  const fetchContents = useMemo(() => {
    if (!contents?.results) return null

    return {
      incoming: contents.results,
      page: contents.page,
      totalPages: contents.total_pages,
    }
  }, [contents])

  const { loaderRef, resetSession } = useInfinitePagination({
    pagination,
    mode,
    scrollRef,
    pause: isLoading,
    isFetching,
    fetchContents,
    enabled,
  })

  const handleRefetch = useCallback(() => {
    resetSession()
    refetch()
  }, [refetch, resetSession])

  return {
    loaderRef,
    contents: pagination.items,
    isLoading: enabled && isLoading,
    isFetchingMore: enabled && isFetching && pagination.page > 1,
    hasMore: pagination.hasMore,
    error: enabled ? error : null,
    refetch: handleRefetch,
  }
}

export default useInfiniteContents
