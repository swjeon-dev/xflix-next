'use client'

import './globals.css'
import Link from 'next/link'

function ErrorPage({ reset }: { reset: () => void }) {
  return (
    <main className='min-h-screen bg-black'>
      <section className='w-screen min-h-screen flex justify-center items-center'>
        <div className='flex flex-col gap-8 justify-center items-center px-8 py-10'>
          <p className='text-5xl text-white text-center leading-snug'>
            요청을 처리하는 중 오류가 발생했습니다. 잠시 후 다시 시도해 주세요.
          </p>
          <div className='flex gap-4'>
            <button
              type='button'
              onClick={reset}
              className='text-2xl font-bold text-white bg-red-600 px-4 py-3 rounded-md'
            >
              다시 시도
            </button>
            <Link
              href='/'
              className='text-2xl font-bold text-white bg-red-600 px-4 py-3 rounded-md'
              replace
            >
              홈으로
            </Link>
          </div>
        </div>
      </section>
    </main>
  )
}

export default ErrorPage
