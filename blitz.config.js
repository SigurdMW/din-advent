const { sessionMiddleware, unstable_simpleRolesIsAuthorized } = require("@blitzjs/server")
// Use the hidden-source-map option when you don't want the source maps to be
// publicly available on the servers, only to the error reporting
const withSourceMaps = require("@zeit/next-source-maps")


const styleSrc = "; style-src 'self' 'unsafe-inline' fonts.googleapis.com https://cdn.jsdelivr.net/emojione/2.2.7/assets/css/emojione.min.css *.googletagmanager.com *.google-analytics.com"
const scriptSrc = "; script-src 'self' 'unsafe-inline' data polyfill.io *.tawk.to https://cdn.jsdelivr.net/emojione/2.2.7/lib/js/emojione.min.js *.googletagmanager.com *.google-analytics.com"
const imgSrc = "; img-src 'self' data: *.cloudinary.com *.jsdelivr.net *.googletagmanager.com *.google-analytics.com *.tawk.to"
const connectSrc = "; connect-src 'self' wss://*.tawk.to *.tawk.to *.googletagmanager.com *.google-analytics.com"
const reportTo = "; report-to https://c255e9556ec6a33714eee5bf1d3fbe00.report-uri.com/r/d/csp/enforce"
const cspString = "default-src 'self' fonts.gstatic.com *.tawk.to *.youtube.com *.youtu.be 'sha256-AJhf7SfDbCOGtG4Jt4Dyynp7aRDJsVMm0zBtXbYpHW8=' *.googletagmanager.com *.google-analytics.com" + styleSrc + scriptSrc + imgSrc + connectSrc + reportTo

const cspHeader = {
	key: "Content-Security-Policy",
	value: cspString
}

// Use the SentryWebpack plugin to upload the source maps during build step
const SentryWebpackPlugin = require("@sentry/webpack-plugin")
const {
	SENTRY_DSN,
	SENTRY_ORG,
	SENTRY_PROJECT,
	SENTRY_AUTH_TOKEN,
	NODE_ENV,
	RENDER_GIT_COMMIT
} = process.env

module.exports = withSourceMaps({
	env: {
	  SENTRY_DSN: process.env.SENTRY_DSN
	},
  
	serverRuntimeConfig: {
	  rootDir: __dirname
	},
  
	middleware: [
		sessionMiddleware({
			unstable_isAuthorized: unstable_simpleRolesIsAuthorized,
		}),
	],
	poweredByHeader: false,
	
	// Thanks to https://github.com/vercel/next.js/discussions/14092
	async headers() {
		return [{
			source: "/",
			headers: [cspHeader]
		}, {
			source: "/:all*",
			headers: [cspHeader]
		}]
	},
  
	webpack: (config, { isServer }) => {
	  // In `pages/_app.js`, Sentry is imported from @sentry/browser. While
	  // @sentry/node will run in a Node.js environment. @sentry/node will use
	  // Node.js-only APIs to catch even more unhandled exceptions.
	  //
	  // This works well when Next.js is SSRing your page on a server with
	  // Node.js, but it is not what we want when your client-side bundle is being
	  // executed by a browser.
	  //
	  // Luckily, Next.js will call this webpack function twice, once for the
	  // server and once for the client. Read more:
	  // https://nextjs.org/docs/api-reference/next.config.js/custom-webpack-config
	  //
	  // So ask Webpack to replace @sentry/node imports with @sentry/browser when
	  // building the browser's bundle
	  if (!isServer) {
			config.resolve.alias["@sentry/node"] = "@sentry/browser"
	  }
  
	  // When all the Sentry configuration env variables are available/configured
	  // The Sentry webpack plugin gets pushed to the webpack plugins to build
	  // and upload the source maps to sentry.
	  // This is an alternative to manually uploading the source maps
	  // Note: This is disabled in development mode.
	  if (
			SENTRY_DSN &&
		SENTRY_ORG &&
		SENTRY_PROJECT &&
		SENTRY_AUTH_TOKEN &&
		RENDER_GIT_COMMIT &&
		NODE_ENV === "production"
	  ) {
			config.plugins.push(
				new SentryWebpackPlugin({
					include: ".next",
					ignore: ["node_modules"],
					stripPrefix: ["webpack://_N_E/"],
					urlPrefix: `~/_next`,
					release: RENDER_GIT_COMMIT
				})
			)
	  }
  
	  return config
	}
})
