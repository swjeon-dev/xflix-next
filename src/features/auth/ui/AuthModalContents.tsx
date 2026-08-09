import JoinForm from './JoinForm'
import LoginForm from './LoginForm'
import SocialLoginButtons from './SocialLoginButtons'
import type { AuthType } from '../model'

export default function AuthModalContents({
  type,
  onTypeChange,
}: {
  onTypeChange: (type: AuthType) => void
  type: AuthType
}) {
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
      <SocialLoginButtons label={type === 'login' ? '계속하기' : '가입하기'} />
    </div>
  )
}
