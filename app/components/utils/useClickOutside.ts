import { MutableRefObject, useEffect, MouseEvent } from "react"

const useClickOutside = (ref: MutableRefObject<Element | null>, callback: () => void) => {
	const handleClick = (e: MouseEvent) => {
		const target = e.target as any
		if (ref.current && !ref.current.contains(target)) {
			callback()
		}
	}

	useEffect(() => {
		document.addEventListener("click", handleClick as any)

		return () => {
			document.removeEventListener("click", handleClick as any)
		}
	})
}

export default useClickOutside
