import React, { Suspense } from "react"
import { useParam, BlitzPage, useQuery, Link } from "blitz"
import AuthLayout from "app/layouts/AuthLayout"
import Spinner from "app/components/Spinner"
import InviteCollaborateSection from "app/calendars/components/Collaborate/InviteCollaborateSection"
import getCalendarCollaborators from "app/calendars/queries/getCalendarCollaborators"
import ShareItem from "app/calendars/components/Share/ShareItem"
import Button from "app/components/Button"
import Tag from "app/components/Tag"
import { getRoleText } from "app/utils/roles"
import deleteRoles from "app/calendars/mutations/deleteRoles"
import deleteInvites from "app/calendars/mutations/deleteInvites"
import { EmailAndInvite, UserAndRoles } from "app/interfaces/Collaborate"

const GetCollaboratePage = ({ calendarId }) => {
	const [{ users, invites }, { mutate, refetch }] = useQuery(getCalendarCollaborators, {
		calendarId,
	})

	const deleteUserRoles = async (user: UserAndRoles) => {
		const oldUsers = [...users]
		const newUsers = users.filter((u) => u.user.id !== user.user.id)
		await mutate({ users: newUsers, invites })
		try {
			await deleteRoles({ calendarId, roles: user.roles })
			await refetch() // TODO: figure out why this is needed
		} catch (e) {
			await mutate({ users: oldUsers, invites })
		}
	}

	const handleDeleteUserRoles = (user: UserAndRoles) => {
		const displayName = user.user.name ? user.user.name + " (" + user.user.email + ")" : user.user.email
		if (window.confirm("Er du sikker på at du vil slette samarbeidspartneren " + displayName + "?")) {
			deleteUserRoles(user)
		}
	}

	const deleteUserInvites = async (invite: EmailAndInvite) => {
		const oldInvites = [...invites]
		const newInvites = invites.filter((i) =>i.email !== invite.email)
		await mutate({ users, invites: newInvites })
		try {
			await deleteInvites({ calendarId, invites: invite.invites })
			await refetch() // TODO: figure out why this is needed
		} catch (e) {
			await mutate({ users, invites: oldInvites })
		}
	}
	const handleDeleteInvite = (invite: EmailAndInvite) => {
		if (window.confirm("Er du sikker på at du vil slette invitasjonen til " + invite.email + "?")) {
			deleteUserInvites(invite)
		}
	}
	const onShared = async () => await refetch()

	const hasUsers = users.length > 0
	const hasInvites = invites.length > 0

	return (
		<div>
			<h1>Samarbeid</h1>
			<p>Du kan samarbeide med andre brukere på Din Advent om lage denne kalenderen. Det finnes følgende muligheter for samarbeid:</p>
			<ul>
				<li>
					<strong>Redigeringstilgang</strong>
					<p>Bruker kan redigere alt innhold i kalenderen som kalendernavn, bakgrunnsbilde, og innhold i alle kalenderluker.</p>
				</li>
				<li>
					<strong>Lukeredigeringstilgang</strong>
					<p>Hvis du gir en bruker Lukeredigeringstilgang, kan brukern redigere alt innholdet i luken du gir tilgang til, men kan ikke redigere eller se innholdet i de andre lukene. Han kan heller ikke endre ting som kalendertittel eller bakgrunnsbilde.</p>
				</li>
			</ul>
			<InviteCollaborateSection calendarId={calendarId} onShared={onShared} />
			{(!hasUsers && !hasInvites) && <p><br/>Du har ingen samarbeidspartnere enda.</p>}
			
			{hasUsers && (
				<>
					<h3>Brukere som samarbeider</h3>
					<ul style={{ listStyle: "none", margin: "0", padding: "0" }}>
						{users.map((user) => (
							<ShareItem
								key={user.user.id}
								actions={<Button type="secondary" onClick={() => handleDeleteUserRoles(user)}>Slett</Button>}
							>
								<div style={{ padding: "8px 0" }}>
									{user.user.name ? (
										<>
											<strong>{user.user.name}</strong> ({user.user.email})
										</>
									) : (
										<strong>{user.user.email}</strong>
									)}
								</div>
								<ul style={{ listStyle: "none", margin: "0", padding: "0" }}>
									{user.roles.map((r) => (
										<li key={r.id} style={{ display: "inline-block" }}>
											<Tag>
												{getRoleText(r.role)}
											</Tag>
										</li>
									))}
								</ul>
							</ShareItem>
						))}
					</ul>
				</>
			)}
			
			{hasInvites && 
				<>
					<h3>Samabeidsinvitasjoner</h3>
					<p>En samarbeidsinvitasjon oppstår når du inviterer en person til samarbeid som ikke er registrert som bruker på Din Advent enda. Mottaker godtar invitasjonen ved å opprette en bruker på dinadvent.no med e-posten som ble brukt i invitasjonen.</p>
					<ul style={{ listStyle: "none", margin: "0", padding: "0" }}>
						{invites.map((invite) => (
							<ShareItem
								key={invite.email}
								actions={<Button type="secondary" onClick={() => handleDeleteInvite(invite)}>Slett</Button>}
							>
								<div style={{ padding: "8px 0" }}>
									<strong>{invite.email}</strong>
								</div>
								<ul style={{ listStyle: "none", margin: "0", padding: "0" }}>
									{invite.invites.map((i) => (
										<li key={i.id} style={{ display: "inline-block" }}>
											<Tag>
												{getRoleText(i.role)}
											</Tag>
										</li>
									))}
								</ul>
							</ShareItem>
						))}
					</ul>
				</>
			}
			<br/>
			<Link href={`/calendars/${calendarId}`}>
				<a>Tilbake til kalender</a>
			</Link>
		</div>
	)
}

const CalendarCollaboratePage: BlitzPage = () => {
	const calendarId = useParam("calendarId", "number")

	return (
		<Suspense fallback={<Spinner />}>
			<GetCollaboratePage calendarId={calendarId} />
		</Suspense>
	)
}

CalendarCollaboratePage.getLayout = (page) => <AuthLayout title="Deling - Din Advent">{page}</AuthLayout>

export default CalendarCollaboratePage
