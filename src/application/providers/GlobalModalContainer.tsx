'use client'
import { useEffect, useRef } from 'react'
import { usePathname } from 'next/navigation'
import dynamic from 'next/dynamic'

import { DialogWrapper, useModal, cn } from '@/shared'
import { MobileModalNavigation } from '@/widgets/mobile-nav'
import type { ModalState, ModalType } from '../model'

const TrailerModalLazy = dynamic(
  () => import('@/features/trailer/ui/TrailerModal'),
  { ssr: false },
)
const SearchModalLazy = dynamic(
  () => import('@/features/search/ui/SearchModal'),
  { ssr: false },
)
const AuthModalLazy = dynamic(() => import('@/features/auth/ui/AuthModal'), {
  ssr: false,
})
const EpisodesModalLazy = dynamic(
  () => import('@/features/episodes/ui/EpisodesModal'),
  { ssr: false },
)

const MODAL_DIALOG_CLASS: Record<ModalType, string> = {
  trailer: '',
  search: 'items-start bg-black/90 pt-[20vh]',
  mobileNavigation: 'backdrop:bg-black/100 text-white p-0 md:p-0',
  episodes: '',
  auth: '',
}

function ModalBody({
  modal,
  onClose,
}: {
  modal: ModalState
  onClose: () => void
}) {
  switch (modal.type) {
    case 'trailer':
      return <TrailerModalLazy {...modal.props} onClose={onClose} />
    case 'episodes':
      return <EpisodesModalLazy {...modal.props} onClose={onClose} />
    case 'search':
      return <SearchModalLazy onClose={onClose} />
    case 'mobileNavigation':
      return <MobileModalNavigation onClose={onClose} />
    case 'auth':
      return <AuthModalLazy onClose={onClose} />
  }
}

export default function GlobalModalContainer() {
  const { currentModal, closeModal } = useModal()
  const pathname = usePathname()
  const prevPathname = useRef(pathname)
  const modal = currentModal as ModalState | null

  useEffect(() => {
    if (prevPathname.current === pathname) return
    prevPathname.current = pathname
    closeModal()
  }, [pathname, closeModal])

  function handleClose() {
    closeModal()
  }

  if (!modal) return null

  return (
    <DialogWrapper
      isOpen
      onClose={handleClose}
      className={cn(MODAL_DIALOG_CLASS[modal.type], modal.className)}
    >
      <ModalBody modal={modal} onClose={handleClose} />
    </DialogWrapper>
  )
}
