import { cookies } from 'next/headers'
import { redirect } from 'next/navigation'
import type { Metadata } from 'next'

import { createClient } from '@/shared/api/supabase/server'
import { routes } from '@/shared'
import { MyPageView } from '@/widgets/mypage'

export const metadata: Metadata = {
  title: '마이페이지',
}

export default async function MyPage() {
  const supabase = createClient(await cookies())
  const {
    data: { user },
  } = await supabase.auth.getUser()

  if (!user) {
    redirect(
      `${routes.LOGIN_REQUIRED}?next=${encodeURIComponent(routes.MYPAGE)}`,
    )
  }

  const name =
    (typeof user.user_metadata?.name === 'string' && user.user_metadata.name) ||
    (typeof user.user_metadata?.full_name === 'string' &&
      user.user_metadata.full_name) ||
    ''

  const providers = user.app_metadata?.providers
  const hasEmailAuth = Array.isArray(providers) && providers.includes('email')

  return (
    <MyPageView
      profile={{
        email: user.email ?? '',
        name,
      }}
      hasEmailAuth={hasEmailAuth}
    />
  )
}
