import type { Metadata } from 'next'
import Link from 'next/link'

export const metadata: Metadata = {
  title: '페이지를 찾을 수 없음',
  description:
    '요청하신 페이지를 찾을 수 없습니다. XFlix 홈으로 이동해 주세요.',
  robots: 'noindex, follow',
}

export default function NotFound() {
  return (
    <main className='min-h-screen bg-black'>
      <section className='w-screen min-h-screen flex justify-center items-center'>
        <div className='flex flex-col gap-8 justify-center items-center px-8 py-10'>
          <p className='text-5xl text-white text-center leading-snug'>
            알 수 없는 페이지입니다. 경로를 확인해주세요.
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
