'use client'
import { useActionState, useEffect } from 'react'
import { useRouter } from 'next/navigation'

import { useModal } from '@/shared'
import { type AuthType, useAuth, useValidJoin } from '../model'
import { INPUT_CLASS, BUTTON_PRIMARY, BUTTON_SECONDARY } from '../model'
import ErrorMessage from './ErrorMessage'
import { joinAction } from '../api'

export default function JoinForm({
  onTypeChange,
}: {
  onTypeChange: (type: AuthType) => void
}) {
  const { error, handleSubmit } = useValidJoin()
  const [state, formAction, pending] = useActionState(joinAction, null)
  const { refreshUser } = useAuth()
  const { closeModal } = useModal()
  const router = useRouter()

  useEffect(() => {
    if (state?.status === 'error') {
      alert(state.message)
    }
    if (state?.status === 'success') {
      alert('회원 가입에 성공했습니다.')
      void (async () => {
        closeModal()
        await refreshUser()
        router.refresh()
      })()
    }
  }, [state, closeModal, refreshUser, router])

  return (
    <form
      action={formAction}
      className='flex flex-col gap-4'
      id='form-modal'
      aria-labelledby='form-modal'
      onSubmit={handleSubmit}
      noValidate
    >
      <div className='flex flex-col gap-3'>
        <label className='sr-only' htmlFor='join-origin'>
          Origin
        </label>
        <input
          id='join-origin'
          type='hidden'
          name='origin'
          value={location.origin}
        />
        <label className='sr-only' htmlFor='join-email'>
          이메일
        </label>
        <input
          id='join-email'
          type='email'
          name='email'
          placeholder='이메일'
          className={INPUT_CLASS}
          required
          aria-invalid={error?.id === 'email'}
        />
        <label className='sr-only' htmlFor='join-password'>
          비밀번호
        </label>
        <input
          id='join-password'
          type='password'
          name='password'
          placeholder='6글자 이상 비밀번호'
          className={INPUT_CLASS}
          required
          aria-invalid={error?.id === 'password'}
        />
        <label className='sr-only' htmlFor='join-password-confirm'>
          비밀번호 확인
        </label>
        <input
          id='join-password-confirm'
          type='password'
          name='password-confirm'
          placeholder='6글자 이상 비밀번호'
          className={INPUT_CLASS}
          required
          aria-invalid={error?.id === 'password-confirm'}
        />
        <label className='sr-only' htmlFor='join-name'>
          이름
        </label>
        <input
          id='join-name'
          type='text'
          name='name'
          placeholder='이름'
          className={INPUT_CLASS}
          required
          aria-invalid={error?.id === 'name'}
        />
      </div>
      <ErrorMessage error={error} type='join' />
      <div className='flex flex-col gap-2 pt-1'>
        <button type='submit' className={BUTTON_PRIMARY} disabled={pending}>
          가입
        </button>
        <button
          type='button'
          className={BUTTON_SECONDARY}
          onClick={() => onTypeChange('login')}
        >
          로그인 하기
        </button>
      </div>
    </form>
  )
}
