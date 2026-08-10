'use client'

import { useActionState, useEffect } from 'react'
import { useRouter, useSearchParams } from 'next/navigation'

import { useModal } from '@/shared'
import { type AuthType, useValidLogin, useAuth } from '../model'
import { INPUT_CLASS, BUTTON_PRIMARY, BUTTON_SECONDARY } from '../model'
import { getSafeNextPath } from '@/shared/lib'
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
    }
    if (state?.status === 'success') {
      void (async () => {
        const rawNext = searchParams.get('next')
        closeModal()
        await refreshUser()
        if (rawNext) {
          router.replace(getSafeNextPath(rawNext))
        }
        router.refresh()
      })()
    }
  }, [state, closeModal, refreshUser, router, searchParams])

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
          aria-invalid={error?.id === 'email'}
          disabled={pending}
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
          aria-invalid={error?.id === 'password'}
          disabled={pending}
        />
      </div>
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
