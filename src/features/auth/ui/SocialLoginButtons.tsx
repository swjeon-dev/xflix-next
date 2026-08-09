'use client'
import { cn, ICONS } from '@/shared'
import { SOCIAL_PROVIDERS, type SocialProviderId } from '../config'
import { createClient } from '@/shared/api/supabase/client'
import { useState } from 'react'

const PROVIDER_ICONS: Record<SocialProviderId, React.ReactNode> = {
  google: ICONS.google,
  github: ICONS.github,
}

interface SocialLoginButtonsProps {
  label: string
}

function SocialLoginButtons({ label }: SocialLoginButtonsProps) {
  const [pending, setPending] = useState(false)
  async function handleSocial(provider: SocialProviderId) {
    setPending(true)
    const supabase = createClient()

    const { error } = await supabase.auth.signInWithOAuth({
      provider,
      options: {
        redirectTo: `${location.origin}/auth/callback`,
      },
    })

    if (error) {
      setPending(false)
      return alert(error.message)
    }
  }
  return (
    <div className='flex flex-col gap-2' role='group' aria-label='소셜 로그인'>
      {SOCIAL_PROVIDERS.map(provider => (
        <button
          key={provider.id}
          type='button'
          onClick={() => handleSocial(provider.id)}
          className={cn(
            `flex w-full items-center justify-center gap-2 rounded px-4 py-2 text-sm font-semibold transition-colors disabled:opacity-50`,
            provider.className,
          )}
          disabled={pending}
          aria-disabled={pending}
        >
          <span className='flex size-4 shrink-0 items-center justify-center [&_svg]:size-4'>
            {PROVIDER_ICONS[provider.id]}
          </span>
          {provider.name} {label}
        </button>
      ))}
    </div>
  )
}

export default SocialLoginButtons
