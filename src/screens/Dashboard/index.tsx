import React from 'react'

import { useAuth } from '../../contexts/auth'

import { Container, UserText, SignOutButton } from './styles'

const Dashboard: React.FC = () => {
  const { user, signOut } = useAuth()

  function handleSignOut () {
    signOut()
  }

  return (
    <Container>
      <UserText>{user?.name}</UserText>
      <SignOutButton
        title="Sign Out"
        onPress={handleSignOut}
      />
    </Container>
  )
}

export default Dashboard
