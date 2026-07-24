'use client'
import { ICONS } from '@/shared'
import { useRouter } from 'next/navigation'

function FloatingBackButton() {
  const router = useRouter()

  return (
    <button
      className='fixed top-20 left-4 md:left-10 rounded-full bg-black/60 backdrop-blur-sm text-white pl-2 pr-4 py-2 flex items-center gap-2 fill-white z-20'
      onClick={() => router.back()}
    >
      {ICONS.leftArrow}
      <span>뒤로 가기</span>
    </button>
  )
}

export default FloatingBackButton
