'use server'

import { cookies } from 'next/headers'

import { createClient } from '@/shared/api/supabase/server'
import { validateJoin } from '../lib'
import type { ActionResponse } from './action.types'

export async function joinAction(
  _prevState: ActionResponse | null,
  formData: FormData,
): Promise<ActionResponse | null> {
  const supabase = createClient(await cookies())
  const origin = String(formData.get('origin') ?? '')
  const email = String(formData.get('email'))
  const password = String(formData.get('password'))
  const passwordConfirm = String(formData.get('password-confirm'))
  const name = String(formData.get('name'))

  if (!origin) {
    return {
      status: 'error',
      message: '요청 정보를 확인할 수 없습니다. 잠시 후 다시 시도해 주세요.',
    }
  }

  const validationError = validateJoin(email, name, password, passwordConfirm)
  if (validationError) {
    return {
      status: 'error',
      message: validationError.message,
      field: validationError.id,
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

  return { status: 'success', message: '회원 가입에 성공했습니다.' }
}
