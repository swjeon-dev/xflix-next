'use server'

import { cookies } from 'next/headers'
import { createClient } from '@/shared/api/supabase/server'
import { validateJoin, validateLogin } from '../lib'

interface LoginResponse {
  status: 'success' | 'error'
  message: string
}

interface JoinResponse {
  status: 'success' | 'error'
  message: string
}

export async function loginAction(
  _prevState: LoginResponse | null,
  formData: FormData,
): Promise<LoginResponse | null> {
  const email = String(formData.get('email') ?? '')
  const password = String(formData.get('password') ?? '')

  const validationError = validateLogin(email, password)
  if (validationError) {
    return {
      status: 'error',
      message: validationError.message,
    }
  }

  const supabase = createClient(await cookies())
  const { error } = await supabase.auth.signInWithPassword({
    email,
    password,
  })

  if (error) {
    return {
      status: 'error',
      message: '이메일 또는 비밀번호가 일치하지 않습니다',
    }
  }

  return {
    status: 'success',
    message: '로그인 성공',
  }
}

export async function joinAction(
  _prevState: JoinResponse | null,
  formData: FormData,
): Promise<JoinResponse | null> {
  const supabase = createClient(await cookies())

  const origin = String(formData.get('origin'))
  const email = String(formData.get('email'))
  const password = String(formData.get('password'))
  const passwordConfirm = String(formData.get('password-confirm'))
  const name = String(formData.get('name'))

  const validationError = validateJoin(email, name, password, passwordConfirm)
  if (validationError) {
    return {
      status: 'error',
      message: validationError.message,
    }
  }

  const { error } = await supabase.auth.signUp({
    email,
    password,
    options: {
      data: { name },
      emailRedirectTo: `${origin}/auth/callback`,
    },
  })

  if (error?.code === 'user_already_exists') {
    return {
      status: 'error',
      message:
        '이미 가입된 이메일입니다. 로그인 또는 소셜 로그인을 이용해 주세요.',
    }
  }

  if (error) {
    return {
      status: 'error',
      message:
        '회원가입에 실패했습니다. 입력 정보를 확인한 뒤 다시 시도해 주세요.',
    }
  }

  return { status: 'success', message: '회원가입 성공' }
}
