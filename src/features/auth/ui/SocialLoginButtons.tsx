import { cn, ICONS } from '@/shared'
import { SOCIAL_PROVIDERS, type SocialProviderId } from '../config'

const PROVIDER_ICONS: Record<SocialProviderId, React.ReactNode> = {
  google: ICONS.google,
  github: ICONS.github,
}

interface SocialLoginButtonsProps {
  onSelect: (provider: SocialProviderId) => void
  label: string
}

function SocialLoginButtons({ onSelect, label }: SocialLoginButtonsProps) {
  return (
    <div className='flex flex-col gap-2' role='group' aria-label='소셜 로그인'>
      {SOCIAL_PROVIDERS.map(provider => (
        <button
          key={provider.id}
          type='button'
          onClick={() => onSelect(provider.id)}
          className={cn(
            `flex w-full items-center justify-center gap-2 rounded px-4 py-2 text-sm font-semibold transition-colors`,
            provider.className,
          )}
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
