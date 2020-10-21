import { useQuery } from "blitz"
import getCurrentUser from "app/users/queries/getCurrentUser"

export const useCurrentUser = () => {
  const [user, { mutate }] = useQuery(getCurrentUser, null)
  return { user, mutate }
}
