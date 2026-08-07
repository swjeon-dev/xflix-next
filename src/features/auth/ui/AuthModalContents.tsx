'use client'
import { SocialProviderId } from '../config'
import JoinForm from './JoinForm'
import LoginForm from './LoginForm'
import SocialLoginButtons from './SocialLoginButtons'
import type { AuthType } from '../model'
import { createClient } from '@/shared/api/supabase/client'

export default function AuthModalContents({
  type,
  onTypeChange,
}: {
  onTypeChange: (type: AuthType) => void
  type: AuthType
}) {
  async function handleLogin(provider: SocialProviderId) {
    const supabase = createClient()

    const { error } = await supabase.auth.signInWithOAuth({
      provider,
      options: {
        redirectTo: `${location.origin}/auth/callback`,
      },
    })

    if (error) {
      return alert(error.message)
    }
  }

  return (
    <div className='flex flex-col gap-5 px-4 py-5'>
      {type === 'login' ? (
        <LoginForm onTypeChange={onTypeChange} />
      ) : (
        <JoinForm onTypeChange={onTypeChange} />
      )}
      <div className='flex items-center gap-3 text-xs text-white/40'>
        <span className='h-px flex-1 bg-white/10' />
        또는
        <span className='h-px flex-1 bg-white/10' />
      </div>
      <SocialLoginButtons
        onSelect={handleLogin}
        label={type === 'login' ? '계속하기' : '가입하기'}
      />
    </div>
  )
}
