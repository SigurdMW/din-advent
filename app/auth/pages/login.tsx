import React from "react"
import { useRouter, BlitzPage } from "blitz"
import { LoginForm } from "app/auth/components/LoginForm"
import ArticleLayout from "app/layouts/ArticleLayout"

const LoginPage: BlitzPage = () => {
  const router = useRouter()

  return (
    <div>
      <LoginForm onSuccess={() => router.push("/login-request")} />
    </div>
  )
}

LoginPage.getLayout = (page) => <ArticleLayout title="Logg inn - Din Advent">{page}</ArticleLayout>

export default LoginPage
