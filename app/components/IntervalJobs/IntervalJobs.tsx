import React, { Suspense } from "react" 

const CurrentUser = () => {
	// do nothing for now
	return null
}

export const IntervalJobs = () => (
	<Suspense fallback={null}>
		<CurrentUser />
	</Suspense>
)

export default IntervalJobs