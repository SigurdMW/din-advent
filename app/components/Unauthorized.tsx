import { Link } from "blitz"

export const Unauthorized = () => (
	<>
		<h1>Logg inn for å se denne siden</h1>
		<p>
      Du må være innlogget for å se denne siden.{" "}
			<Link href="/login">
				<a>Logg inn her</a>
			</Link>
		</p>
	</>
)

export default Unauthorized
