'use client'

import { usePathname } from 'next/navigation'
import Link from 'next/link'

import { isNavActive } from '@/shared'
import { NAV_ITEMS } from '../config/navItems'

function DesktopNav() {
  const pathname = usePathname()

  return (
    <ol className='hidden gap-8 sm:flex text-xl'>
      {NAV_ITEMS.map(item => (
        <li key={item.id}>
          <Link
            href={item.path}
            className={`hover:opacity-80 pb-2 ${isNavActive(pathname, item.path) && 'border-b-2 border-white'}`}
          >
            {item.label}
          </Link>
        </li>
      ))}
    </ol>
  )
}

export default DesktopNav
