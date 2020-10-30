import React, { Suspense } from "react"
import { useParam, BlitzPage, useQuery, Link } from "blitz"
import AuthLayout from "app/layouts/AuthLayout"
import Spinner from "app/components/Spinner"
import ShareByEmailSection from "app/calendars/components/Share/ShareByEmaiSection"
import ShareByLinkSection from "app/calendars/components/Share/ShareByLinkSection"
import { useCurrentUser } from "app/hooks/useCurrentUser"
import Alert from "app/components/Alert"
import getCalendarShares from "app/calendars/queries/getCalendarShares"
import UserShareListing from "app/calendars/components/Share/UserShareListing"
import ShareLinkListing from "app/calendars/components/Share/ShareLinkListing"
import UserInviteListing from "app/calendars/components/Share/UserInviteListing"

const GetSharePage = ({ calendarId }) => {
	const [{ shareKeys, roles, userInvites }, { mutate, refetch }] = useQuery(getCalendarShares, {
		calendarId,
	})
	const { user } = useCurrentUser()

	const handleDeleteRole = async (roleId: number) => {
		const newRoles = roles.filter((r) => r.id !== roleId)
		await mutate({ shareKeys, roles: newRoles, userInvites })
	}
	const handleDeleteInvite = async (inviteId: number) => {
		const newInvites = userInvites.filter((i) => i.id !== inviteId)
		await mutate({ shareKeys, roles, userInvites: newInvites })
	}
	const onShared = async () => await refetch()

	const hasNoShares = shareKeys.length === 0 && roles.length === 0 && userInvites.length === 0

	return (
		<div>
			<h1>Del kalender</h1>
		</div>
	)
}

const CalendarSharePage: BlitzPage = () => {
	const calendarId = useParam("calendarId", "number")

	return (
		<Suspense fallback={<Spinner />}>
			<GetSharePage calendarId={calendarId} />
		</Suspense>
	)
}

CalendarSharePage.getLayout = (page) => <AuthLayout title="Deling - Din Advent">{page}</AuthLayout>

export default CalendarSharePage
