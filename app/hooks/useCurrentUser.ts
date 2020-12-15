import { useQuery } from "blitz"
import getCurrentUser from "app/users/queries/getCurrentUser"

export const useCurrentUser = () => {
	const [user, { setQueryData, refetch }] = useQuery(getCurrentUser, null)
	return { user, setQueryData, refetch }
}
