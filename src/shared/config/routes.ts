import { buildSearchPath } from '@/shared'

export const routes = {
  ROOT: '/',
  MYPAGE: '/mypage',
  LOGIN_REQUIRED: '/login-required',
  MOVIE: {
    PARAMETER: '/:id',
    LIST: '/movie',
    DETAIL: (id: string | number) => `/movie/${id}`,
  },
  TV: {
    PARAMETER: '/:id',
    LIST: '/tv',
    DETAIL: (id: string | number) => `/tv/${id}`,
    SEASON: (tvId: string | number, season: string | number) =>
      `/tv/${tvId}/season/${season}`,
  },
  SEARCH: {
    LIST: '/search',
    path: buildSearchPath,
  },
  ERROR: {
    AUTH: '/auth/auth-code-error',
  },
} as const
