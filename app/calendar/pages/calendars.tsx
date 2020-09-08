import React from "react"
import { BlitzPage } from "blitz"
import AuthLayout from "app/layouts/AuthLayout"

const CalendarsPage: BlitzPage = () => <div>Calendars page</div>

CalendarsPage.getLayout = (page) => <AuthLayout title="Calendars">{page}</AuthLayout>

export default CalendarsPage
