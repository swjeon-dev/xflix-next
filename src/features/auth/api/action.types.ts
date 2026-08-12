import type { ValidationErrorId } from '../model'

interface ActionResponse {
  status: 'success' | 'error'
  message: string
  field?: ValidationErrorId
}

export type { ActionResponse }
