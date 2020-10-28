import Layout from "./Layout"
import classes from "./ArticleLayout.module.scss"

export const AuthLayout = ({ title, children }) => (
	<Layout title={title}>
		<div className={classes.container}>{children}</div>
	</Layout>
)

export default AuthLayout
