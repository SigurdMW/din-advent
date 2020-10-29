import Layout from "./Layout"

export const ShareLayout = ({ title, children }) => (
	<Layout title={title}>
		<div>{children}</div>
	</Layout>
)

export default ShareLayout
