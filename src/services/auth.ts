interface Response {
  token: string
  user: {
    name: string,
    email: string
  }
}

export function signIn (): Promise<Response> {
  return new Promise(resolve => {
    setTimeout(() => {
      resolve({
        token: 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiIxMjM0NTY3ODkwIiwibmFtZSI6IkpvaG4gRG9lIiwiaWF0IjoxNTE2MjM5MDIyfQ.SflKxwRJSMeKKF2QT4fwpMeJf36POk6yJV_adQssw5c',
        user: {
          name: 'Gabriel',
          email: 'gabrielgoncalvesmachado@hotmail.com'
        }
      })
    }, 2000)
  })
}
