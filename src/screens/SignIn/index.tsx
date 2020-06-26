import React from 'react'

import { useAuth } from '../../contexts/auth'

import { Container, SignOutButton } from './styles'

const SignIn: React.FC = () => {
  const { signIn } = useAuth()

  function handleSign () {
    signIn()
  }

  return (
    <Container>
      <SignOutButton
        title="Sign In"
        onPress={handleSign}
      />
    </Container>
  )
}
export default SignIn
