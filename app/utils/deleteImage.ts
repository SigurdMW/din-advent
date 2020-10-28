import { getAntiCSRFToken } from "blitz"

export const deleteImage = async (url: string) => {
	const antiCSRFToken = getAntiCSRFToken()
	const response = await window.fetch("/api/deleteImage", {
		method: "DELETE",
		credentials: "include",
		headers: {
			"anti-csrf": antiCSRFToken,
		},
		body: JSON.stringify({ url }),
	})
	const json = await response.json()
	return json
}
