import { ValidationError } from '../model'

function validateEmail(email: string): ValidationError {
  const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/

  if (!email) return { id: 'email', message: '이메일을 입력해 주세요.' }
  if (!emailPattern.test(email))
    return { id: 'email', message: '올바른 이메일 형식이 아닙니다.' }

  return null
}

function validateName(name: string): ValidationError {
  if (!name) return { id: 'name', message: '이름을 입력해 주세요.' }
  if (name.length < 3)
    return { id: 'name', message: '이름은 3자 이상이어야 합니다.' }
  return null
}

function validatePassword(password: string): ValidationError {
  if (!password) return { id: 'password', message: '비밀번호를 입력해 주세요.' }
  if (password.length < 6)
    return { id: 'password', message: '비밀번호는 6자 이상이어야 합니다.' }
  return null
}

function validatePasswordConfirm(
  password: string,
  password2: string,
): ValidationError {
  if (password !== password2)
    return { id: 'password-confirm', message: '비밀번호가 일치하지 않습니다.' }
  return null
}

function validateLogin(
  email: FormDataEntryValue | null,
  password: FormDataEntryValue | null,
): ValidationError {
  const emailString = email?.toString().trim() ?? ''
  const passwordString = password?.toString() ?? ''

  const passwordError = validatePassword(passwordString)
  const emailError = validateEmail(emailString)

  if (emailError) return emailError
  if (passwordError) return passwordError

  return null
}

function validateJoin(
  email: FormDataEntryValue | null,
  name: FormDataEntryValue | null,
  password: FormDataEntryValue | null,
  passwordConfirm: FormDataEntryValue | null,
): ValidationError {
  const emailString = email?.toString().trim() ?? ''
  const nameString = name?.toString().trim() ?? ''
  const passwordString = password?.toString() ?? ''
  const passwordConfirmString = passwordConfirm?.toString() ?? ''

  const emailError = validateEmail(emailString)
  const passwordError = validatePassword(passwordString)
  const passwordConfirmError = validatePasswordConfirm(
    passwordString,
    passwordConfirmString,
  )
  const nameError = validateName(nameString)

  if (emailError) return emailError
  if (nameError) return nameError
  if (passwordError) return passwordError
  if (passwordConfirmError) return passwordConfirmError

  return null
}

function validatePasswordChange(
  password: FormDataEntryValue | null,
  passwordConfirm: FormDataEntryValue | null,
): ValidationError {
  const passwordString = password?.toString() ?? ''
  const passwordConfirmString = passwordConfirm?.toString() ?? ''

  const passwordError = validatePassword(passwordString)
  const passwordConfirmError = validatePasswordConfirm(
    passwordString,
    passwordConfirmString,
  )

  if (passwordError) return passwordError
  if (passwordConfirmError) return passwordConfirmError

  return null
}

export { validateLogin, validateJoin, validatePasswordChange }
