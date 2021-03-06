import React, { createContext, useState, useEffect, useContext } from 'react'
import AsyncStorage from '@react-native-community/async-storage'

import * as auth from '../services/auth'

import api from '../services/api'

interface User {
  name: string;
  email: string;
}

interface AuthContextData {
  signed: boolean;
  user: User | null;
  loading: boolean;
  signIn(): Promise<void>;
  signOut(): void;
}

interface Props {
  children: React.ReactNode
}

const AuthContext = createContext<AuthContextData>({} as AuthContextData)

const AuthProvider: React.FC<Props> = ({ children }: Props) => {
  const [user, setUser] = useState<User | null>(null)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    async function loadStorageData () {
      const storagedUser = await AsyncStorage.getItem('@RNAuth:user')
      const storagedToken = await AsyncStorage.getItem('@RNAuth:token')

      if (storagedUser && storagedToken) {
        setUser(JSON.parse(storagedUser))

        api.defaults.headers.Authorization = `Bearer ${storagedToken}`
      }
      setLoading(false)
    }

    loadStorageData()
  }, [])

  async function signIn () {
    const response = await auth.signIn()
    setUser(response.user)

    api.defaults.headers.Authorization = `Bearer ${response.token}`

    await AsyncStorage.setItem('@RNAuth:user', JSON.stringify(response.user))
    await AsyncStorage.setItem('@RNAuth:token', response.token)
  }

  async function signOut () {
    await AsyncStorage.clear()
    setUser(null)
  }

  return (
    <AuthContext.Provider value={{ signed: !!user, user, loading, signIn, signOut }}>
      {children}
    </AuthContext.Provider>
  )
}

function useAuth () {
  const context = useContext(AuthContext)

  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider.')
  }

  return context
}

export { AuthProvider, useAuth }
