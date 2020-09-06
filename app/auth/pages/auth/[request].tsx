import React, { useEffect, useState } from "react"
import { useRouter, BlitzPage, Link } from "blitz"
import Layout from "app/layouts/Layout"
import login from "app/auth/mutations/login"

const LoginRequestPage: BlitzPage = () => {
  const router = useRouter()
  const requestId = (router.params as any).request
  const [isLoggingIn, setIsLoggingIn] = useState(true)
  const [error, setError] = useState("")

  useEffect(() => {
    const query = async () => {
      try {
        await login({ request: requestId })
        router.push("/")
      } catch (error) {
        setError(error.toString())
      } finally {
        setIsLoggingIn(false)
      }
    }
    query()
  })

  if (isLoggingIn) {
    return <div>Logger deg inn...</div>
  }
  return (
    <div>
      <h1>
        Noe gikk galt <span aria-label="test">😥</span>
      </h1>
      <p>Her gikk visst noe galt. Prøv å logge deg inn på nytt:</p>
      <p>
        <Link href="/login">
          <a>Logg inn</a>
        </Link>
      </p>
      <br />
      <p>Dersom du har opplevd feilen flere ganger:</p>
      <ul>
        <li>Er du helt sikker på at du har opprettet en bruker?</li>
        <li>Kan dette være en link fra en gammel e-post?</li>
        <li>
          Ved gjentakende problemer,{" "}
          <Link href="/contact">
            <a>ta kontakt.</a>
          </Link>
        </li>
      </ul>
      <p style={{ fontSize: "0.85em", color: "rgba(255,255,255,0.4)" }}>Feilmelding: {error}</p>
    </div>
  )
}

LoginRequestPage.getLayout = (page) => <Layout title="Log In">{page}</Layout>

export default LoginRequestPage
