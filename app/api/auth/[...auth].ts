import { createOrUpdateUser, getPublicData } from "app/users/utils"
import { passportAuth } from "blitz"
import FacebookStrategy from "passport-facebook"
import GoogleStrategy from "passport-google-oauth20"

const isProduction = process.env.NODE_ENV === "production"
const prodUrl = process.env.BASE_URL

const getCallbackUrl = (providerName: string) => {
	const path = `/api/auth/${providerName}/callback`
	return isProduction
		? (prodUrl as string).replace(/\/$/, "") + path
		: "http://localhost:3000" + path
}

const { FACEBOOK_APP_ID, FACEBOOK_APP_SECRET, GOOGLE_CLIENT_ID, GOOGLE_CLIENT_SECRET } = process.env

const auth = async (req, res) => {
	const afterLoginUrl = "/calendars"
	const returnTo = req.query.returnTo || afterLoginUrl

	// const session = await getSessionContext(req, res)
	// // console.log(session)

	// session.setPublicData({
	// 	...session.publicData,
	// 	returnTo
	// })

	// console.log("Session is", {
	// 	data: session.publicData
	// })

	return passportAuth({
		successRedirectUrl: afterLoginUrl,
		errorRedirectUrl: "/error",
		strategies: [
			{
				strategy: new FacebookStrategy(
					{
						clientID: FACEBOOK_APP_ID,
						clientSecret: FACEBOOK_APP_SECRET,
						callbackURL: getCallbackUrl("facebook"),
						profileFields: ["id", "displayName", "email"],
						scope: ["email"],
					},
					async function (_token, _tokenSecret, profile, done) {
						const email = profile.emails && profile.emails[0]?.value
						if (!email) {
							return done(new Error("Facebook OAuth response doesn't have email."))
						}
						const user = await createOrUpdateUser({ email, name: profile.displayName, active: true })
						const publicData = getPublicData(user, "facebook")
						done(null, { publicData, redirectUrl: returnTo })
					}
				)
			},
			{
				strategy: new GoogleStrategy(
					{
						clientID: GOOGLE_CLIENT_ID,
						clientSecret: GOOGLE_CLIENT_SECRET,
						callbackURL: getCallbackUrl("google"),
						scope: ["profile", "email"],
					},
					async function (_token, _tokenSecret, profile, done) {
						const email = profile.emails && profile.emails[0]?.value
						if (!email) {
							return done(new Error("Google OAuth response doesn't have email."))
						}
						const user = await createOrUpdateUser({ email, name: profile.displayName, active: true })
						const publicData = getPublicData(user, "google")
						done(null, { publicData, redirectUrl: returnTo })
					}
				)
			}
		],
	})(req, res)
}

export default auth
