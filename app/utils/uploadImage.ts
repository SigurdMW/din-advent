import { getAntiCSRFToken } from "blitz"

export async function uploadImageCallBack(file: File): Promise<{ data: { link: string } }> {
	const data = new FormData()
	data.append("image", file)
	const antiCSRFToken = getAntiCSRFToken()
	const response = await window.fetch("/api/upload", {
		method: "POST",
		credentials: "include",
		headers: {
			"anti-csrf": antiCSRFToken,
		},
		body: data,
	})
	const json = await response.json()
	return json
}
