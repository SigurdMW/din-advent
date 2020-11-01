export const allowedToViewCalendarWindow = (day?: number) => {
	if (!day) return false
	const date = new Date()
	if (date.getMonth() === 11) {
		const currentDay = date.getDate()
		return day <= currentDay
	}
	return false
}
