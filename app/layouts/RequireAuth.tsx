import { useSession } from "blitz"
import { Suspense } from "react"
import Unauthorized from "app/components/Unauthorized"

const Auth = ({ children }) => {
  const session = useSession()
  if (!session.userId) {
    return <Unauthorized />
  }
  return children
}

export const RequireAuth = ({ children }) => (
  <Suspense fallback={<div>Laster...</div>}>
    <Auth>{children}</Auth>
  </Suspense>
)

export default RequireAuth
