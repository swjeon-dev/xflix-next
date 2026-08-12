'use client'

import { useActionState, useEffect } from 'react'
import { useRouter, useSearchParams } from 'next/navigation'

import { useModal, getSafeNextPath } from '@/shared'
import { type AuthType, useValidLogin, useAuth } from '../model'
import { INPUT_CLASS, BUTTON_PRIMARY, BUTTON_SECONDARY } from '../model'
import ErrorMessage from './ErrorMessage'
import { loginAction } from '../api'

export default function LoginForm({
  onTypeChange,
}: {
  onTypeChange: (type: AuthType) => void
}) {
  const { closeModal } = useModal()
  const { refreshUser } = useAuth()
  const { error, handleSubmit } = useValidLogin()
  const [state, formAction, pending] = useActionState(loginAction, null)
  const router = useRouter()
  const searchParams = useSearchParams()

  useEffect(() => {
    if (state?.status === 'error') {
      alert(state.message)
      return
    }
    if (state?.status !== 'success') return

    void (async () => {
      closeModal()
      await refreshUser()
      const rawNext = searchParams.get('next')
      if (rawNext) {
        router.replace(getSafeNextPath(rawNext))
      }
    })()
  }, [state, closeModal, refreshUser, router, searchParams])

  return (
    <form
      action={formAction}
      className='flex flex-col gap-4'
      aria-labelledby='auth-modal-title'
      onSubmit={handleSubmit}
      noValidate
    >
      <fieldset className='flex flex-col gap-3' disabled={pending}>
        <legend className='sr-only'>로그인</legend>
        <label className='sr-only' htmlFor='login-email'>
          이메일
        </label>
        <input
          id='login-email'
          autoComplete='username'
          type='email'
          name='email'
          placeholder='이메일'
          className={INPUT_CLASS}
          required
          aria-invalid={state?.field === 'email'}
        />
        <label className='sr-only' htmlFor='login-password'>
          비밀번호
        </label>
        <input
          id='login-password'
          autoComplete='password'
          type='password'
          name='password'
          placeholder='6글자 이상 비밀번호'
          className={INPUT_CLASS}
          required
          aria-invalid={state?.field === 'password'}
        />
      </fieldset>

      <ErrorMessage error={error} type='login' />
      <div className='flex flex-col gap-2 pt-1'>
        <button type='submit' className={BUTTON_PRIMARY} disabled={pending}>
          {pending ? '로그인 중...' : '로그인'}
        </button>
        <button
          type='button'
          className={BUTTON_SECONDARY}
          onClick={() => onTypeChange('join')}
        >
          가입하기
        </button>
      </div>
    </form>
  )
}
