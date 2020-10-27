import React from "react"
import { Link, BlitzPage } from "blitz"
import AdminForm from "app/admins/components/AdminForm"
import ArticleLayout from "app/layouts/ArticleLayout"
import createAdmin from "app/admins/mutations/createAdmin"

const NewAdminPage: BlitzPage = () => (
  <div>
    <h1>Ny admin</h1>

    <AdminForm
      initialValues={{}}
      onSubmit={async (values) => {
        try {
          await createAdmin({ data: values })
        } catch (error) {
          alert("Error creating admin " + JSON.stringify(error, null, 2))
        }
      }}
    />

    <p>
      <Link href="/admins">
        <a>Tilbake til admin-side</a>
      </Link>
    </p>
  </div>
)

NewAdminPage.getLayout = (page) => <ArticleLayout title={"Ny admin"}>{page}</ArticleLayout>

export default NewAdminPage
