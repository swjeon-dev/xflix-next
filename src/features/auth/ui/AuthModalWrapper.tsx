import {
  MODAL_HEADER_CLASS,
  MODAL_HEADER_TITLE_CLASS,
  ModalCloseButton,
  ModalWrapper,
} from '@/shared'
import type { AuthType } from '../model'

interface AuthModalWrapperProps {
  onClose: () => void
  children: React.ReactNode
  type: AuthType
}

function AuthModalWrapper({ onClose, children, type }: AuthModalWrapperProps) {
  return (
    <ModalWrapper className='w-full max-w-md overflow-hidden rounded-xl bg-zinc-900 text-white shadow-2xl'>
      <header className={MODAL_HEADER_CLASS}>
        <h2 id='auth-modal-title' className={MODAL_HEADER_TITLE_CLASS}>
          {type === 'login' ? '로그인' : '회원가입'}
        </h2>
        <ModalCloseButton onClose={onClose} />
      </header>
      {children}
    </ModalWrapper>
  )
}

export default AuthModalWrapper
