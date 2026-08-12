import Link from 'next/link'
import { routes } from '@/shared'
import { BUTTON_SECONDARY, useAuth } from '@/features/auth'
import { createClient } from '@/shared/api/supabase/client'

export default function MyPageFooter() {
  const { clearUser } = useAuth()

  async function handleLogout() {
    const confirmed = confirm('로그아웃 하시겠습니까?')
    if (!confirmed) return
    const supabase = createClient()
    await supabase.auth.signOut()
    clearUser()
  }

  return (
    <div className='mt-6 flex flex-col gap-3 sm:flex-row'>
      <Link href={routes.ROOT} className={BUTTON_SECONDARY}>
        홈으로
      </Link>
      <button type='button' onClick={handleLogout} className={BUTTON_SECONDARY}>
        로그아웃
      </button>
    </div>
  )
}
