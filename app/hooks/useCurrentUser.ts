import { useQuery } from "blitz"
import getCurrentUser from "app/users/queries/getCurrentUser"

export const useCurrentUser = () => {
	const [user, { mutate, refetch }] = useQuery(getCurrentUser, null)
	return { user, mutate, refetch }
}
