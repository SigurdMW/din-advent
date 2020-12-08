import { useEffect, useState } from "react"

const name = "previewState"

const getPreviewState = (): {[key: number]: boolean} => {
	if (!window.localStorage) return {}
	const st = localStorage.getItem(name)
	if (!st) return {}
	try {
		const state = JSON.parse(st)
		return state
	} catch (e) {
		return {}
	}
}

export const usePreviewState = (calendarId: number, initalState = false): [boolean, (va: boolean) => void] => {
	const [preview, setPreview] = useState(initalState)
	
	useEffect(() => {
		const state = getPreviewState()
		if (state.hasOwnProperty(calendarId)) {
			setPreview(state[calendarId])
		}
	}, [calendarId])

	const updatePreview = (prev: boolean) => {
		setPreview(prev)
		if (!window.localStorage) return
		const state = getPreviewState()
		localStorage.setItem(name, JSON.stringify({...state, [calendarId]: prev}))
	}

	return [
		preview,
		updatePreview
	]
}