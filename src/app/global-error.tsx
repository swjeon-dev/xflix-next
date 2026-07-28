'use client'
import Link from 'next/link'

export default function GlobalError({
  error,
  reset,
}: {
  error: Error
  reset: () => void
}) {
  const isApiAuthError = error.message.includes('API_AUTH')
  const message = isApiAuthError
    ? '서비스 연결에 실패했습니다. API 인증을 확인해 주세요.'
    : '페이지를 불러오는 중 문제가 발생했습니다. 잠시 후 다시 시도해 주세요.'

  return (
    <html lang='ko'>
      <body className='min-h-screen bg-black text-white'>
        <main className='min-h-screen bg-black'>
          <section className='w-screen min-h-screen flex justify-center items-center'>
            <div className='flex flex-col gap-8 justify-center items-center px-8 py-10'>
              <p className='text-5xl text-white text-center leading-snug'>
                {message}
              </p>
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
          </section>
        </main>
      </body>
    </html>
  )
}
