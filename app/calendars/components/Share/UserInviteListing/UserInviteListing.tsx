import React, { FC } from "react"
import { UserInvite } from "db"
import ShareItem from "../ShareItem"
import Button from "app/components/Button"
import deleteUserInvite from "app/calendars/mutations/deleteUserInvite"

interface UserShareListingProps {
  invites: UserInvite[]
  onDelete: (id: UserInvite["id"]) => void
}

const UserShareListing: FC<UserShareListingProps> = ({ invites, onDelete }) => {
	const handleDeleteInvite = async (invite: UserInvite) => {
		if (window.confirm("Er du sikker på at du vil slette invitasjonen til " + invite.email + "?")) {
			await deleteUserInvite({ id: invite.id })
			onDelete(invite.id)
		}
	}
	if (invites.length === 0) return null
	return (
		<>
			<h2>Delingsinvitasjoner</h2>
			<p>
        En delingsinvitasjon oppstår når du deler en kalender med en e-postadresse som ikke er
        registrert som bruker på Din Advent enda. Mottaker godtar ved å opprette en bruker på
        dinadvent.no med e-posten som ble brukt i invitasjonen.
			</p>
			{invites.length ? (
				<ul style={{ listStyle: "none", margin: "0", padding: "0" }}>
					{invites.map((invite) => (
						<ShareItem
							key={invite.id}
							actions={
								<Button type="secondary" onClick={() => handleDeleteInvite(invite)}>
                  Slett
								</Button>
							}
						>
							<div style={{ padding: "8px 0" }}>Delt med {invite.email}</div>
						</ShareItem>
					))}
				</ul>
			) : (
				<p>Denne kalenderen har ingen aktive delingsinvitasjoner akkurat nå.</p>
			)}
		</>
	)
}

export default UserShareListing
