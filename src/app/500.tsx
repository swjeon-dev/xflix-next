import type { Metadata } from 'next'
import Link from 'next/link'

export const metadata: Metadata = {
  title: '서버 오류',
  description: '서버 오류가 발생했습니다. XFlix 홈으로 이동해 주세요.',
  robots: 'noindex, follow',
}

export default function ServerError() {
  return (
    <main className='min-h-screen bg-black'>
      <section className='w-screen min-h-screen flex justify-center items-center'>
        <div className='flex flex-col gap-8 justify-center items-center px-8 py-10'>
          <p className='text-5xl text-white text-center leading-snug'>
            서버 오류가 발생했습니다. 잠시 후 다시 시도해주세요.
          </p>
          <Link
            href='/'
            className='text-2xl font-bold text-white bg-red-600 px-4 py-3 rounded-md'
            replace
          >
            홈으로
          </Link>
        </div>
      </section>
    </main>
  )
}
