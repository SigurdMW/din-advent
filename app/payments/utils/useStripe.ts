import { useEffect, useState } from "react"

interface Stripe {
  redirectToCheckout: (s: { sessionId: string }) => void
}

export const useStripe = () => {
	const [isReady, setIsReady] = useState(false)
	const [stripe, setStripe] = useState<null | Stripe>(null)

	useEffect(() => {
		if (!(window as any).Stripe) {
			const script = document.createElement("script")
			const onLoaded = () => {
				setIsReady(true)
			}
			script.addEventListener("load", onLoaded)
			script.async = true
			script.src = "https://js.stripe.com/v3/"
			document.head.appendChild(script)
			return () => {
				script.removeEventListener("load", onLoaded)
			}
		}
	})

	useEffect(() => {
		if (isReady) {
			setStripe((window as any).Stripe(process.env.NEXT_PUBLIC_STRIPE_PUBLIC_KEY))
		}
	}, [isReady])

	return {
		isReady,
		Stripe: stripe,
	}
}
