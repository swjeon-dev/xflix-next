'use client'

import { useActionState, useEffect } from 'react'

import {
  BUTTON_PRIMARY,
  INPUT_CLASS,
  updatePasswordAction,
} from '@/features/auth'

export default function PasswordForm({
  hasEmailAuth,
}: {
  hasEmailAuth: boolean
}) {
  const [state, formAction, pending] = useActionState(
    updatePasswordAction,
    null,
  )

  const passwordActionLabel = hasEmailAuth ? '비밀번호 변경' : '비밀번호 등록'
  const passwordHelpText = hasEmailAuth
    ? '새 비밀번호로 변경합니다.'
    : '소셜 로그인 계정도 비밀번호를 등록하면 이메일로 로그인할 수 있습니다.'

  useEffect(() => {
    if (!state?.message) return
    alert(state?.message)
  }, [state])

  return (
    <form
      action={formAction}
      className='mt-8 space-y-4 border-t border-white/10 pt-8'
      noValidate
    >
      <input
        type='hidden'
        name='hasEmailAuth'
        value={hasEmailAuth ? 'true' : 'false'}
      />

      <fieldset className='space-y-4' disabled={pending}>
        <legend className='text-base font-medium text-white'>
          {passwordActionLabel}
        </legend>
        <p className='text-xs text-white/40'>{passwordHelpText}</p>

        <div className='flex flex-col gap-1.5'>
          <label htmlFor='mypage-password' className='text-sm text-white/45'>
            비밀번호
          </label>
          <input
            id='mypage-password'
            type='password'
            name='password'
            placeholder='6글자 이상 비밀번호'
            autoComplete='new-password'
            aria-invalid={state?.field === 'password'}
            className={INPUT_CLASS}
          />
        </div>

        <div className='flex flex-col gap-1.5'>
          <label
            htmlFor='mypage-password-confirm'
            className='text-sm text-white/45'
          >
            비밀번호 확인
          </label>
          <input
            id='mypage-password-confirm'
            type='password'
            name='password-confirm'
            placeholder='비밀번호 확인'
            autoComplete='new-password'
            aria-invalid={state?.field === 'password-confirm'}
            className={INPUT_CLASS}
          />
        </div>
      </fieldset>

      {state?.status === 'error' && (
        <p className='text-sm text-red-400' role='alert'>
          {state.message}
        </p>
      )}

      <button type='submit' className={BUTTON_PRIMARY} disabled={pending}>
        {pending ? '저장 중...' : passwordActionLabel}
      </button>
    </form>
  )
}
