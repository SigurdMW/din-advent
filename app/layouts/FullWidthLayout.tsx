import Layout from "./Layout"

export const FullWidthLayout = ({ title, children }) => (
	<Layout title={title}>
		{children}
	</Layout>
)

export default FullWidthLayout
