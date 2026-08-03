import Link from 'next/link'

import { routes } from '@/shared'
import type { FilterType, IFilterTag, MediaType } from '@/shared'

interface TagLinkProps {
  filter: FilterType
  tag: IFilterTag
  type: MediaType
}

const LINK_CLASS_NAME =
  'rounded-full border border-white/50 bg-gray-500/40 px-3 py-1 text-sm font-bold text-white transition-colors hover:border-white hover:bg-white hover:text-gray-900'

// filter: person
function ToSearch({ filter, tag, type }: TagLinkProps) {
  return (
    <Link
      href={routes.SEARCH.path({
        type,
        filter,
        id: tag.id,
        label: tag.name,
      })}
      className={LINK_CLASS_NAME}
    >
      {tag.name}
    </Link>
  )
}

// filter: genre
function ToList({ tag, type }: TagLinkProps) {
  const params = new URLSearchParams()
  params.set('genre', tag.id.toString())

  const base = type === 'movie' ? routes.MOVIE.LIST : routes.TV.LIST
  const path = `${base}?${params.toString()}`
  return (
    <Link href={path} className={LINK_CLASS_NAME}>
      {tag.name}
    </Link>
  )
}

function TagLink(props: TagLinkProps) {
  return props.filter === 'genre' ? (
    <ToList {...props} />
  ) : (
    <ToSearch {...props} />
  )
}

export default TagLink
