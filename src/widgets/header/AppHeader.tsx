'use client'
import Link from 'next/link'
import { useState } from 'react'

import { ICONS, routes, useGetScrollY, useModal } from '@/shared'
import { DesktopNav, HeaderMenu } from './ui'

function LoginButton() {
  const { openModal } = useModal()

  return (
    <button
      type='button'
      className='block whitespace-nowrap font-medium text-white'
      aria-label='login'
      onClick={() => openModal({ type: 'auth' })}
    >
      LOGIN
    </button>
  )
}
function LogoutButton({ handleClick }: { handleClick: () => void }) {
  return (
    <button
      type='button'
      className='block whitespace-nowrap font-medium text-white'
      aria-label='logout'
      onClick={handleClick}
    >
      LOGOUT
    </button>
  )
}

function AppHeader() {
  const [auth, setAuth] = useState(true)
  const scrollY = useGetScrollY()
  const isScroll = scrollY > 20

  const clickedLogout = () => {
    setAuth(false)
  }
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
        {auth ? <LogoutButton handleClick={clickedLogout} /> : <LoginButton />}
      </div>
    </header>
  )
}

export default AppHeader
