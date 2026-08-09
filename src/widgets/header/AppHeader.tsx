'use client'
import Link from 'next/link'
import { useRouter } from 'next/navigation'

import { ICONS, routes, useGetScrollY, useModal } from '@/shared'
import { DesktopNav, HeaderMenu } from './ui'
import { useAuth } from '@/features/auth'
import { createClient } from '@/shared/api/supabase/client'

function LoginButton({ disabled }: { disabled: boolean }) {
  const { openModal } = useModal()

  return (
    <button
      type='button'
      className='block whitespace-nowrap font-medium text-white'
      aria-label='login'
      onClick={() => openModal({ type: 'auth' })}
      disabled={disabled}
    >
      LOGIN
    </button>
  )
}
function LogoutButton({ disabled }: { disabled: boolean }) {
  const router = useRouter()

  const handleClick = () => {
    const confirmed = confirm('로그아웃 하시겠습니까?')
    if (!confirmed) return
    const supabase = createClient()
    supabase.auth.signOut()
    router.refresh()
  }

  return (
    <button
      type='button'
      className='block whitespace-nowrap font-medium text-white'
      aria-label='logout'
      onClick={handleClick}
      disabled={disabled}
    >
      LOGOUT
    </button>
  )
}

function AppHeader() {
  const { isLoggedIn, loading } = useAuth()

  const scrollY = useGetScrollY()
  const isScroll = scrollY > 20

  return (
    <header
      className={`fixed top-0 w-full flex items-center gap-16 p-4 z-20 transition-colors duration-500 ease-in-out
          ${!isScroll ? 'bg-gradient-to-b from-black/80 to-transparent' : 'bg-black'}`}
    >
      <Link href={routes.ROOT} className='shrink-0'>
        {ICONS.logo}
      </Link>

      <div className='w-full flex items-center justify-end gap-4'>
        <nav className='flex w-full items-center text-white font-medium justify-end sm:justify-between'>
          <DesktopNav />
          <HeaderMenu />
        </nav>
        {isLoggedIn ? (
          <LogoutButton disabled={loading} />
        ) : (
          <LoginButton disabled={loading} />
        )}
      </div>
    </header>
  )
}

export default AppHeader
