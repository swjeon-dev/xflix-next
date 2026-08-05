'use client'
import { useState } from 'react'
import AuthModalWrapper from './AuthModalWrapper'
import AuthModalContents from './AuthModalContents'
import type { AuthType } from '../model'

interface AuthModalProps {
  onClose: () => void
}

export default function AuthModal({ onClose }: AuthModalProps) {
  const [type, setType] = useState<AuthType>('login')

  function handleTypeChange(type: AuthType) {
    setType(type)
  }

  return (
    <AuthModalWrapper onClose={onClose} type={type}>
      <AuthModalContents type={type} onTypeChange={handleTypeChange} />
    </AuthModalWrapper>
  )
}
