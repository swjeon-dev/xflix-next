'use client'

import { type AuthType, useValidLogin } from '../model'
import { INPUT_CLASS, BUTTON_PRIMARY, BUTTON_SECONDARY } from '../model'
import ErrorMessage from './ErrorMessage'

export default function LoginForm({
  onTypeChange,
}: {
  onTypeChange: (type: AuthType) => void
}) {
  const { error, handleSubmit } = useValidLogin()

  return (
    <form
      action=''
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
          type='email'
          name='email'
          placeholder='이메일'
          className={INPUT_CLASS}
          required
          aria-invalid={error?.id === 'email'}
        />
        <label className='sr-only' htmlFor='login-password'>
          비밀번호
        </label>
        <input
          id='login-password'
          type='password'
          name='password'
          placeholder='4글자 이상 비밀번호'
          className={INPUT_CLASS}
          required
          aria-invalid={error?.id === 'password'}
        />
      </div>
      <ErrorMessage error={error} type='login' />
      <div className='flex flex-col gap-2 pt-1'>
        <button type='submit' className={BUTTON_PRIMARY}>
          로그인
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
