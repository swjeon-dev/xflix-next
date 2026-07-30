'use client'
import {
  useCallback,
  useEffect,
  useLayoutEffect,
  useRef,
  type RefObject,
} from 'react'

const ROOT_MARGIN = {
  horizontal: '0px 100px 0px 0px',
  vertical: '0px 0px 100px 0px',
} as const

type InfiniteScrollDirection = 'horizontal' | 'vertical'

type UseInfiniteScrollOptions = {
  enabled?: boolean
  hasMore: boolean
  isFetching: boolean
  onLoadMore: () => void
  onBeforeLoadMore?: () => void
  scrollRootRef?: RefObject<Element | null>
  direction?: InfiniteScrollDirection
  threshold?: number
  rootMargin?: string
  pause?: boolean
  watchKey?: number
}

function useInfiniteScroll({
  enabled = true,
  hasMore,
  isFetching,
  onLoadMore,
  onBeforeLoadMore,
  scrollRootRef,
  direction = 'vertical',
  threshold = 0,
  rootMargin,
  pause = false,
  watchKey = 0,
}: UseInfiniteScrollOptions) {
  const canLoadMoreRef = useRef(true)
  const loaderNodeRef = useRef<HTMLElement | null>(null)
  const observerRef = useRef<IntersectionObserver | null>(null)
  const wasFetchingRef = useRef(isFetching)
  const gateRef = useRef({ hasMore, isFetching, enabled })

  gateRef.current = { hasMore, isFetching, enabled }

  const resolvedRootMargin = rootMargin ?? ROOT_MARGIN[direction]

  const disconnect = useCallback(() => {
    observerRef.current?.disconnect()
    observerRef.current = null
  }, [])

  const tryLoadMore = useCallback(() => {
    const gate = gateRef.current

    if (
      !gate.enabled ||
      !gate.hasMore ||
      gate.isFetching ||
      !canLoadMoreRef.current
    ) {
      return
    }

    canLoadMoreRef.current = false
    onBeforeLoadMore?.()
    onLoadMore()
  }, [onBeforeLoadMore, onLoadMore])

  const observe = useCallback(() => {
    const target = loaderNodeRef.current
    if (!target || pause || !gateRef.current.hasMore) return

    // 캐러셀은 scrollRef 부착보다 observe가 먼저 돌 수 있다.
    // sentinel 부모(스크롤 ul)를 root 폴백으로 쓴다.
    const root =
      scrollRootRef?.current ??
      (direction === 'horizontal' ? target.parentElement : null)

    if (direction === 'horizontal' && !root) return

    disconnect()

    observerRef.current = new IntersectionObserver(
      ([entry]) => {
        if (!entry) return

        if (!entry.isIntersecting) {
          canLoadMoreRef.current = true
          return
        }

        tryLoadMore()
      },
      {
        root,
        threshold,
        rootMargin: resolvedRootMargin,
      },
    )

    observerRef.current.observe(target)
  }, [
    direction,
    disconnect,
    pause,
    resolvedRootMargin,
    scrollRootRef,
    threshold,
    tryLoadMore,
  ])

  const loaderRef = useCallback(
    (node: HTMLElement | null) => {
      loaderNodeRef.current = node

      if (!node) {
        disconnect()
        return
      }

      // 첫 페이지 적용 후 sentinel이 늦게 마운트돼도 관찰을 시작한다
      if (!pause && gateRef.current.enabled && gateRef.current.hasMore) {
        observe()
      }
    },
    [disconnect, observe, pause],
  )

  const reset = useCallback(() => {
    canLoadMoreRef.current = true
  }, [])

  useLayoutEffect(() => {
    if (pause || !hasMore || !enabled) {
      wasFetchingRef.current = isFetching
      disconnect()
      return
    }

    // loadMore 직후·fetch 시작 전(isFetching이 아직 false)에 게이트를 열면
    // 페이지가 동기적으로 연속 증가하며 요청이 취소된다.
    // fetch가 끝난 전이(true → false)에만 다시 연다.
    const fetchJustFinished = wasFetchingRef.current && !isFetching
    wasFetchingRef.current = isFetching

    if (fetchJustFinished) {
      canLoadMoreRef.current = true
    }

    observe()
  }, [disconnect, enabled, hasMore, isFetching, observe, pause, watchKey])

  useEffect(() => {
    return () => disconnect()
  }, [disconnect])

  return {
    loaderRef,
    reset,
  }
}

export { ROOT_MARGIN, useInfiniteScroll }
export type { InfiniteScrollDirection, UseInfiniteScrollOptions }
