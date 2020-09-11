import { AppProps } from "blitz"
import { ErrorBoundary } from "react-error-boundary"
import { queryCache } from "react-query"
import LoginForm from "app/auth/components/LoginForm"
import "./style.scss"
import ErrorComponent from "app/components/ErrorComponent"
import ArticleLayout from "app/layouts/ArticleLayout"
import { Router } from "blitz"
import { useEffect } from "react"

export default function App({ Component, pageProps }: AppProps) {
  const getLayout = Component.getLayout || ((page) => page)

  return (
    <ErrorBoundary
      FallbackComponent={RootErrorFallback}
      onReset={() => {
        // This ensures the Blitz useQuery hooks will automatically refetch
        // data any time you reset the error boundary
        queryCache.resetErrorBoundaries()
      }}
    >
      {getLayout(<Component {...pageProps} />)}
    </ErrorBoundary>
  )
}

function RootErrorFallback({ error, resetErrorBoundary }) {
  useEffect(() => {
    Router.events.on("beforeHistoryChange", resetErrorBoundary)
    return () => {
      Router.events.off("beforeHistoryChange", resetErrorBoundary)
    }
  }, [resetErrorBoundary])
  if (error.name === "AuthenticationError") {
    return (
      <ArticleLayout title="Logg inn for å se siden - Din Advent">
        <LoginForm onSuccess={resetErrorBoundary} />
      </ArticleLayout>
    )
  } else if (error.name === "AuthorizationError") {
    return (
      <ArticleLayout title="Ingen tilgang - Din Advent">
        <ErrorComponent title="Beklager, du har ikke tilgang til denne siden.">
          <p>Du har ikke tilgang til denne siden. Er du sikker på at du er på rett URL?</p>
          <button onClick={resetErrorBoundary}>Prøv igjen</button>
        </ErrorComponent>
      </ArticleLayout>
    )
  } else {
    return (
      <ArticleLayout title="Serverfeil - Din Advent">
        <ErrorComponent statusCode={error.statusCode || 400} title={error.message || error.name} />
      </ArticleLayout>
    )
  }
}
