export type Credentials = {
  username: string
  password: string
}

export type Entitlements = {
  roles?: string[]
}

export type Signature = {
  iat: number
  exp: number
}

export type User = Credentials & Entitlements

export type PassportUser = Omit<Credentials, 'password'> & Entitlements

export type JWT = Signature & PassportUser
