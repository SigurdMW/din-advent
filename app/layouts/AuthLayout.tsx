import Layout from "./Layout"
import classes from "./ArticleLayout.module.scss"
import RequireAuth from "./RequireAuth"

export const AuthLayout = ({ title, children }) => (
  <Layout title={title}>
    <div className={classes.container}>
      <RequireAuth>{children}</RequireAuth>
    </div>
  </Layout>
)

export default AuthLayout
