/** Supabase `signInWithOAuth({ provider })` 에 전달하는 provider id */
export type SocialProviderId = 'google' | 'kakao' | 'github' // | 'apple'

export interface SocialProvider {
  id: SocialProviderId
  name: string
  /** 버튼 배경/텍스트용 Tailwind 클래스 */
  className: string
}

/** XFlix에서 노출할 Supabase 소셜 로그인 제공자 */
export const SOCIAL_PROVIDERS: SocialProvider[] = [
  {
    id: 'google',
    name: 'Google',
    className:
      'bg-white text-zinc-900 hover:bg-zinc-100 border border-white/10',
  },
  {
    id: 'kakao',
    name: '카카오',
    className: 'bg-[#FEE500] text-[#191919] hover:bg-[#F5DC00]',
  },
  // {
  //   id: 'apple',
  //   label: 'Apple로 계속하기',
  //   className: 'bg-white text-zinc-900 hover:bg-zinc-100',
  // },
  {
    id: 'github',
    name: 'GitHub',
    className:
      'bg-zinc-800 text-white hover:bg-zinc-700 border border-white/10',
  },
]
