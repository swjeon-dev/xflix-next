import Link from 'next/link'
import { routes } from '@/shared'

export default function AuthCodeErrorPage() {
  return (
    <main className='flex min-h-screen flex-col items-center justify-center gap-4 bg-black px-4 text-center text-white'>
      <h1 className='text-xl font-semibold'>로그인에 실패했습니다</h1>
      <p className='text-sm text-white/60'>
        잠시 후 다시 시도해 주세요.
      </p>
      <Link
        href={routes.ROOT}
        className='mt-2 text-sm font-medium text-white underline underline-offset-4'
      >
        홈으로 돌아가기
      </Link>
    </main>
  )
}
