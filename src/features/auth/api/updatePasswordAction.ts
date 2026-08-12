'use server'

import { cookies } from 'next/headers'
import { revalidatePath } from 'next/cache'

import { routes } from '@/shared'
import { createClient } from '@/shared/api/supabase/server'
import { validatePasswordChange } from '../lib'
import type { ActionResponse } from './action.types'

export async function updatePasswordAction(
  _prevState: ActionResponse | null,
  formData: FormData,
): Promise<ActionResponse | null> {
  const supabase = createClient(await cookies())

  const password = formData.get('password')
  const passwordConfirm = formData.get('password-confirm')
  const hasEmailAuth = formData.get('hasEmailAuth') === 'true'

  const validationError = validatePasswordChange(password, passwordConfirm)
  if (validationError) {
    return {
      status: 'error',
      message: validationError.message,
      field: validationError.id,
    }
  }

  const { error: updateError } = await supabase.auth.updateUser({
    password: String(password),
  })

  if (updateError) {
    return {
      status: 'error',
      message: updateError.message,
    }
  }

  revalidatePath(routes.MYPAGE)

  return {
    status: 'success',
    message: hasEmailAuth
      ? '비밀번호가 변경되었습니다.'
      : '비밀번호가 등록되었습니다.',
  }
}
