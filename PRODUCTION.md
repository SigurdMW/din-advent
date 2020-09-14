# Checklist before production

Make sure the following environment variables are in place:

- BASE_URL - url the site is running on
- FACEBOOK_APP_ID
- FACEBOOK_APP_SECRET
- GOOGLE_CLIENT_ID
- GOOGLE_CLIENT_SECRET
- NODE_ENV
- SESSION_SECRET_KEY
- MAILGUN_API_KEY
- MAILGUN_DOMAIN
- MAILGUN_URL (api.mailgun.net or api.eu.mailgun.net)
- VIPPS_CLIENT_ID
- VIPPS_CLIENT_SECRET
- VIPPS_SUBSCRIPTION_KEY
- VIPPS_URL (https://apitest.vipps.no or https://api.vipps.no)
- VIPPS_MERCHANT_NUMBER

## Automatic variables when running on render.com

- DATABASE_URL - this is automatically created when using the render.yaml file
