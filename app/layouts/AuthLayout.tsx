import Layout from "./Layout"
import classes from "./ArticleLayout.module.scss"
import IntervalJobs from "app/components/IntervalJobs"

export const AuthLayout = ({ title, children, useContainer = true }) => (
	<Layout title={title}>
		<IntervalJobs/>
		{useContainer ? <div className={classes.container}>{children}</div> : <div>{children}</div>}
	</Layout>
)

export default AuthLayout
