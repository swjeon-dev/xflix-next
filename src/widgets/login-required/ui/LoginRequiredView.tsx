'use client'

import Link from 'next/link'

import { routes, useModal } from '@/shared'
import { BUTTON_PRIMARY, BUTTON_SECONDARY } from '@/features/auth'

export default function LoginRequiredView() {
  const { openModal } = useModal()

  return (
    <section className='mx-auto flex w-full max-w-md flex-col items-center px-4 py-24 text-center sm:py-32'>
      <h1 className='text-2xl font-semibold tracking-tight text-white sm:text-3xl'>
        로그인이 필요한 페이지입니다
      </h1>
      <p className='mt-3 text-sm text-white/50'>
        계속하려면 로그인해 주세요. 로그인 후 요청하신 페이지로 이동합니다.
      </p>

      <div className='mt-10 flex w-full flex-col gap-3'>
        <button
          type='button'
          className={BUTTON_PRIMARY}
          onClick={() => openModal({ type: 'auth' })}
        >
          로그인
        </button>
        <Link href={routes.ROOT} className={BUTTON_SECONDARY}>
          홈으로
        </Link>
      </div>
    </section>
  )
}
