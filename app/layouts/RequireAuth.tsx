import { useSession } from "blitz"
import { Suspense } from "react"
import Unauthorized from "app/components/Unauthorized"
import Spinner from "app/components/Spinner"

const Auth = ({ children }) => {
	const session = useSession()
	if (!session.userId) {
		return <Unauthorized />
	}
	return children
}

export const RequireAuth = ({ children }) => (
	<Suspense fallback={<Spinner />}>
		<Auth>{children}</Auth>
	</Suspense>
)

export default RequireAuth
