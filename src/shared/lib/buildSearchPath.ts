type SearchRouteParams = Record<string, string | number | boolean | null>

function buildSearchPath(params: SearchRouteParams) {
  const searchParams = new URLSearchParams()

  for (const [key, value] of Object.entries(params)) {
    if (value == null) continue
    searchParams.set(key, String(value))
  }

  const query = searchParams.toString()
  return query ? `/search?${query}` : '/search'
}

export { buildSearchPath }
