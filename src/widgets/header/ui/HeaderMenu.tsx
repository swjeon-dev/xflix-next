'use client'
import { ICONS, useModal } from '@/shared'

function HeaderMenu() {
  const { openModal } = useModal()
  return (
    <div className='flex gap-4'>
      <button
        type='button'
        aria-label='검색'
        onClick={() => openModal({ type: 'search' })}
      >
        {ICONS.search}
      </button>
      <button
        type='button'
        className='block sm:hidden'
        aria-label='메뉴 열기'
        onClick={() => openModal({ type: 'mobileNavigation' })}
      >
        {ICONS.hamburgerMenu}
      </button>
    </div>
  )
}

export default HeaderMenu
