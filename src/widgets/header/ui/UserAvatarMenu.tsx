'use client'

import { useEffect, useRef, useState } from 'react'
import Link from 'next/link'
import { useRouter } from 'next/navigation'
import type { User } from '@supabase/supabase-js'

import { routes } from '@/shared'
import { createClient } from '@/shared/api/supabase/client'

function getAvatarUrl(user: User) {
  const meta = user.user_metadata
  const url = meta?.avatar_url ?? meta?.picture
  return typeof url === 'string' && url.length > 0 ? url : null
}

function getInitial(user: User) {
  const meta = user.user_metadata
  const name =
    (typeof meta?.name === 'string' && meta.name) ||
    (typeof meta?.full_name === 'string' && meta.full_name) ||
    user.email ||
    ''
  return name.trim().charAt(0).toUpperCase() || '?'
}

export default function UserAvatarMenu({
  user,
  disabled,
}: {
  user: User
  disabled: boolean
}) {
  const router = useRouter()
  const [open, setOpen] = useState(false)
  const rootRef = useRef<HTMLDivElement>(null)
  const avatarUrl = getAvatarUrl(user)

  useEffect(() => {
    if (!open) return

    function handlePointerDown(event: MouseEvent) {
      if (!rootRef.current?.contains(event.target as Node)) {
        setOpen(false)
      }
    }

    function handleKeyDown(event: KeyboardEvent) {
      if (event.key === 'Escape') setOpen(false)
    }

    document.addEventListener('mousedown', handlePointerDown)
    document.addEventListener('keydown', handleKeyDown)
    return () => {
      document.removeEventListener('mousedown', handlePointerDown)
      document.removeEventListener('keydown', handleKeyDown)
    }
  }, [open])

  async function handleLogout() {
    const confirmed = confirm('로그아웃 하시겠습니까?')
    if (!confirmed) return
    setOpen(false)
    const supabase = createClient()
    await supabase.auth.signOut()
    router.refresh()
  }

  return (
    <div ref={rootRef} className='relative shrink-0'>
      <button
        type='button'
        className='flex size-9 items-center justify-center overflow-hidden rounded-full bg-white/15 text-sm font-semibold text-white ring-1 ring-white/25 transition hover:ring-white/50 disabled:opacity-50'
        aria-label='계정 메뉴'
        aria-haspopup='menu'
        aria-expanded={open}
        disabled={disabled}
        onClick={() => setOpen(prev => !prev)}
      >
        {avatarUrl ? (
          <img
            src={avatarUrl}
            alt=''
            className='size-full object-cover'
            referrerPolicy='no-referrer'
          />
        ) : (
          <span className='flex size-full items-center justify-center bg-neutral-700'>
            {getInitial(user)}
          </span>
        )}
      </button>

      {open && (
        <div
          role='menu'
          className='absolute right-0 mt-2 min-w-36 overflow-hidden rounded-md border border-white/10 bg-neutral-950 py-1 shadow-lg'
        >
          <Link
            href={routes.MYPAGE}
            role='menuitem'
            className='block px-4 py-2.5 text-sm text-white hover:bg-white/10'
            onClick={() => setOpen(false)}
          >
            마이페이지
          </Link>
          <button
            type='button'
            role='menuitem'
            className='block w-full px-4 py-2.5 text-left text-sm text-white hover:bg-white/10'
            onClick={handleLogout}
          >
            로그아웃
          </button>
        </div>
      )}
    </div>
  )
}
