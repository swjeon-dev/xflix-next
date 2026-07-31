import type { IGenre } from '@/shared'

function resolveGenreId(
  genre: string | undefined,
  genreList: IGenre[],
): number {
  if (genre == null || genre === '') return 0

  const id = Number(genre)
  if (!Number.isFinite(id) || id <= 0) return 0

  return genreList.some(g => g.id === id) ? id : 0
}

export { resolveGenreId }
