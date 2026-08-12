'use server'

import { cookies } from 'next/headers'

import { createClient } from '@/shared/api/supabase/server'
import { validateLogin } from '../lib'
import type { ActionResponse } from './action.types'

export async function loginAction(
  _prevState: ActionResponse | null,
  formData: FormData,
): Promise<ActionResponse | null> {
  const email = String(formData.get('email') ?? '')
  const password = String(formData.get('password') ?? '')

  const validationError = validateLogin(email, password)
  if (validationError) {
    return {
      status: 'error',
      message: validationError.message,
      field: validationError.id,
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
