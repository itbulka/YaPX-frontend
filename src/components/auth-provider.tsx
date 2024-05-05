import { useAuthStore } from '@/store/auth'
import { useRouter } from 'next/navigation'
import { ReactElement } from 'react'


type Props = {
  onlyOnAuth?: boolean
  children: ReactElement
}

export const AuthProvider = ({onlyOnAuth, children}: Props) => {
  const sessionId = useAuthStore(state => state.sessionId)
  const router = useRouter()

  if(onlyOnAuth && sessionId && typeof window !== 'undefined') {
    router.replace('/')
  }

  if(!onlyOnAuth && !sessionId && typeof window !== 'undefined') {
    router.replace('/login')
  }

  return children
}