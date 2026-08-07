import type { AuthType, ValidationError } from '../model'

export default function ErrorMessage({
  error,
  type,
}: {
  error: ValidationError
  type: AuthType
}) {
  return (
    error && (
      <p
        id={`${type}-form-error-${error?.id}`}
        role='alert'
        className='rounded-md border border-red-500/40 bg-red-500/15 px-3 py-2 text-xs text-red-300 sm:text-sm'
      >
        {error.message}
      </p>
    )
  )
}
