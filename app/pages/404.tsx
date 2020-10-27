import ArticleLayout from "app/layouts/ArticleLayout"

const Page404 = () => (
	<>
		<h1>404 - Side ikke funnet 😕</h1>
		<p>Beklager, siden ble ikke funnet.</p>
	</>
)

Page404.getLayout = (page) => <ArticleLayout title="404 - Din Advent">{page}</ArticleLayout>

export default Page404
