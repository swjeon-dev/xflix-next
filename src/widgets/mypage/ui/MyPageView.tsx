'use client'

import { useState } from 'react'
import Link from 'next/link'
import { useRouter } from 'next/navigation'

import { routes } from '@/shared'
import { createClient } from '@/shared/api/supabase/client'
import {
  BUTTON_PRIMARY,
  BUTTON_SECONDARY,
  INPUT_CLASS,
  validatePasswordChange,
  type ValidationError,
} from '@/features/auth'

export type MyPageProfile = {
  email: string
  name: string
}

export default function MyPageView({ profile }: { profile: MyPageProfile }) {
  const router = useRouter()
  const [error, setError] = useState<ValidationError>(null)
  const [pending, setPending] = useState(false)

  async function handlePasswordSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault()
    const form = e.currentTarget
    const formData = new FormData(form)
    const password = formData.get('password')
    const passwordConfirm = formData.get('password-confirm')

    const validationError = validatePasswordChange(password, passwordConfirm)
    if (validationError) {
      setError(validationError)
      return
    }

    setError(null)
    setPending(true)

    const supabase = createClient()
    const { error: updateError } = await supabase.auth.updateUser({
      password: String(password),
    })

    setPending(false)

    if (updateError) {
      alert(updateError.message)
      return
    }

    form.reset()
    alert('비밀번호가 저장되었습니다.')
  }

  async function handleLogout() {
    const confirmed = confirm('로그아웃 하시겠습니까?')
    if (!confirmed) return
    const supabase = createClient()
    await supabase.auth.signOut()
    // router.replace(routes.ROOT)
    router.refresh()
  }

  return (
    <section className='mx-auto w-full max-w-lg px-4 py-24 sm:py-28'>
      <h1 className='text-2xl font-semibold tracking-tight text-white sm:text-3xl'>
        마이페이지
      </h1>
      <p className='mt-2 text-sm text-white/50'>
        계정 정보를 확인하고 비밀번호를 등록·변경할 수 있습니다.
      </p>

      <form
        className='mt-10 space-y-4 border-t border-white/10 pt-8'
        onSubmit={handlePasswordSubmit}
        noValidate
      >
        <div className='flex flex-col gap-1.5'>
          <label htmlFor='mypage-name' className='text-sm text-white/45'>
            이름
          </label>
          <input
            id='mypage-name'
            type='text'
            name='name'
            defaultValue={profile.name || '이름 없음'}
            disabled
            className={`${INPUT_CLASS} disabled:cursor-not-allowed disabled:opacity-50`}
          />
        </div>

        <div className='flex flex-col gap-1.5'>
          <label htmlFor='mypage-email' className='text-sm text-white/45'>
            이메일
          </label>
          <input
            id='mypage-email'
            type='email'
            name='email'
            defaultValue={profile.email}
            disabled
            className={`${INPUT_CLASS} disabled:cursor-not-allowed disabled:opacity-50`}
          />
        </div>

        <div className='flex flex-col gap-1.5'>
          <label htmlFor='mypage-password' className='text-sm text-white/45'>
            비밀번호
          </label>
          <input
            id='mypage-password'
            type='password'
            name='password'
            placeholder='4글자 이상 비밀번호'
            autoComplete='new-password'
            disabled={pending}
            aria-invalid={error?.id === 'password'}
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
            disabled={pending}
            aria-invalid={error?.id === 'password-confirm'}
            className={INPUT_CLASS}
          />
        </div>

        {error && (
          <p className='text-sm text-red-400' role='alert'>
            {error.message}
          </p>
        )}

        <p className='text-xs text-white/40'>
          소셜 로그인 계정도 비밀번호를 등록하면 이메일로 로그인할 수 있습니다.
        </p>

        <button type='submit' className={BUTTON_PRIMARY} disabled={pending}>
          {pending ? '저장 중...' : '비밀번호 변경'}
        </button>
      </form>

      <div className='mt-6 flex flex-col gap-3 sm:flex-row'>
        <Link href={routes.ROOT} className={BUTTON_SECONDARY}>
          홈으로
        </Link>
        <button
          type='button'
          onClick={handleLogout}
          className={BUTTON_SECONDARY}
        >
          로그아웃
        </button>
      </div>
    </section>
  )
}
