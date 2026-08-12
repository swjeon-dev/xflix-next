'use client'

import { INPUT_CLASS } from '@/features/auth'
import MyPageHeader from './MyPageHeader'
import PasswordForm from './PasswordForm'
import MyPageFooter from './MyPageFooter'

export type MyPageProfile = {
  email: string
  name: string
}

export default function MyPageView({
  profile,
  hasEmailAuth,
}: {
  profile: MyPageProfile
  hasEmailAuth: boolean
}) {
  return (
    <section className='mx-auto w-full max-w-lg px-4 py-24 sm:py-28'>
      <MyPageHeader />

      <div className='mt-10 space-y-4 border-t border-white/10 pt-8'>
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
      </div>

      <PasswordForm hasEmailAuth={hasEmailAuth} />

      <MyPageFooter />
    </section>
  )
}
