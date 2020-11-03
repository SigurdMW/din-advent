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
	const handleDeleteLink = async (shareKeyId: number) => {
		const newLinks = shareKeys.filter((s) => s.id !== shareKeyId)
		await mutate({ shareKeys: newLinks, roles, userInvites })
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
			<p>Det finnes 2 måter å dele en kalender på:</p>
			<ol>
				<li>Del med e-post (anbefalt)</li>
				<li>Del med link</li>
			</ol>
			<p>
        Deling med e-post er anbefalt da det innebærer at innholdet i kalenderen holdes privat.
        Dersom du velger å dele med link, kan alle som har linken åpne og se innholdet i kalenderen.
			</p>
			{user?.plan ? (
				<>
					<ShareByEmailSection calendarId={calendarId} onShared={onShared} />
					<br />
					<br />
					<ShareByLinkSection calendarId={calendarId} onShared={onShared} />
				</>
			) : (
				<Alert type="warning">
					<p>
            For å dele denne kalenderen, må du kjøpe en pakke først.{" "}
						<Link href="/pricing">
							<a>Se priser og pakker her</a>
						</Link>
					</p>
				</Alert>
			)}

			<hr className="da-divider" />

			<h2>Delinger</h2>
			{hasNoShares && <p>Du har ikke delt denne kalenderen enda.</p>}
			<UserShareListing roles={roles.filter((r) => r.role === "reader")} onDelete={handleDeleteRole} />
			<ShareLinkListing shareLinks={shareKeys} onDelete={handleDeleteLink} />
			<UserInviteListing invites={userInvites} onDelete={handleDeleteInvite} />

			<br />
			<Link href={`/calendars/${calendarId}`}>
				<a>Tilbake til kalender</a>
			</Link>
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
