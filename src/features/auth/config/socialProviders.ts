export type SocialProviderId = 'google' | 'github'

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
    id: 'github',
    name: 'GitHub',
    className:
      'bg-zinc-800 text-white hover:bg-zinc-700 border border-white/10',
  },
]
