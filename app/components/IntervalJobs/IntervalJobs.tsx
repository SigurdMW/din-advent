import { useCurrentUser } from "app/hooks/useCurrentUser"
import React, { Suspense, useEffect } from "react" 

const CurrentUser = () => {
	const { refetch } = useCurrentUser()

	useEffect(() => {
		let timer
		try {
			const time = 1000 * 60 * 1 // refetch user info every minute
			timer = setInterval(refetch, time)
		} catch (e) {
			// do nothing
		}
		return () => {
			if (timer) clearInterval(timer)
		}
	}, [])
	return null
}

export const IntervalJobs = () => (
	<Suspense fallback={null}>
		<CurrentUser />
	</Suspense>
)

export default IntervalJobs