'use client'

import { useActionState, useEffect, useState } from 'react'
import { useRouter, useSearchParams } from 'next/navigation'

import { useModal, getSafeNextPath } from '@/shared'
import { type AuthType, useAuth, useValidJoin } from '../model'
import { INPUT_CLASS, BUTTON_PRIMARY, BUTTON_SECONDARY } from '../model'
import ErrorMessage from './ErrorMessage'
import { joinAction } from '../api'

export default function JoinForm({
  onTypeChange,
}: {
  onTypeChange: (type: AuthType) => void
}) {
  const [origin, setOrigin] = useState('')
  const { error, handleSubmit } = useValidJoin()
  const [state, formAction, pending] = useActionState(joinAction, null)
  const { refreshUser } = useAuth()
  const { closeModal } = useModal()
  const router = useRouter()
  const searchParams = useSearchParams()

  useEffect(() => {
    setOrigin(window.location.origin)
  }, [])

  useEffect(() => {
    if (state?.status === 'error') {
      alert(state.message)
      return
    }
    if (state?.status !== 'success') return

    void (async () => {
      closeModal()
      const user = await refreshUser()
      // 이메일 확인 옵션 사용시 이메일 인증 후 로그인해 주세요. 알림 메시지
      if (!user) {
        alert('가입되었습니다. 이메일 인증 후 로그인해 주세요.')
        return
      }
      alert(state.message)
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
      <input type='hidden' name='origin' value={origin} />

      <fieldset className='flex flex-col gap-3' disabled={pending}>
        <legend className='sr-only'>회원가입</legend>
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
          aria-invalid={state?.field === 'email'}
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
          aria-invalid={state?.field === 'password'}
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
          aria-invalid={state?.field === 'password-confirm'}
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
          aria-invalid={state?.field === 'name'}
        />
      </fieldset>

      <ErrorMessage error={error} type='join' />
      <div className='flex flex-col gap-2 pt-1'>
        <button
          type='submit'
          className={BUTTON_PRIMARY}
          disabled={pending || !origin}
        >
          {pending ? '가입 처리중...' : '가입'}
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
