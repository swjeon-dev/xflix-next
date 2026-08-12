'use client'
import Link from 'next/link'

import { ICONS, routes, useGetScrollY, useModal } from '@/shared'
import { useAuth } from '@/features/auth'
import { DesktopNav, HeaderMenu, UserAvatarMenu } from './ui'

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

function AppHeader() {
  const { user, isLoggedIn, loading } = useAuth()

  console.log('user', user)
  console.log('isLoggedIn', isLoggedIn)
  console.log('loading', loading)
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
        {isLoggedIn && user ? (
          <UserAvatarMenu user={user} disabled={loading} />
        ) : (
          <LoginButton disabled={loading} />
        )}
      </div>
    </header>
  )
}

export default AppHeader
