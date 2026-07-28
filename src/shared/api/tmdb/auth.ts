import { unstable_cache } from 'next/cache'

import { API_ENDPOINT } from '../../config'
import { tmdbFetch } from './client'

interface IAuthResponse {
  status_code?: number
  status_message?: string
  success: boolean
}

export const isApiValid = unstable_cache(
  async () => {
    const { data, error } = await tmdbFetch<IAuthResponse>(
      API_ENDPOINT.AUTH_VALID,
      undefined,
      'FAIL_API_AUTH',
      { cache: 'no-store' },
    )

    if (error || !data?.success) {
      throw new Error(error || 'FAIL_API_AUTH')
    }

    return data
  },
  ['api-valid-check'],
  { revalidate: 3600 },
)

export async function apiValidCheck(): Promise<{
  data: IAuthResponse | null
  error: string | null
}> {
  try {
    const data = await isApiValid()
    return { data, error: null }
  } catch {
    return {
      data: null,
      error: 'FAIL_API_AUTH',
    }
  }
}
