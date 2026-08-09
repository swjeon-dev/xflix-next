import { useEffect, useState } from 'react'
import { validateJoin } from '../lib'
import type { ValidationError } from './auth.types'

function useValidJoin() {
  const [error, setError] = useState<ValidationError>(null)

  function handleSubmit(event: React.SubmitEvent<HTMLFormElement>) {
    const formData = new FormData(event.currentTarget)
    const email = formData.get('email')
    const name = formData.get('name')
    const password = formData.get('password')
    const passwordConfirm = formData.get('password-confirm')

    const error = validateJoin(email, name, password, passwordConfirm)
    if (error) {
      event.preventDefault()
      setError(error)
      return
    }
  }

  useEffect(() => {
    let timer: NodeJS.Timeout | null = null

    timer = setTimeout(() => {
      setError(null)
    }, 1500)

    return () => {
      if (timer) {
        clearTimeout(timer)
      }
    }
  }, [error])

  return { error, handleSubmit }
}

export default useValidJoin
