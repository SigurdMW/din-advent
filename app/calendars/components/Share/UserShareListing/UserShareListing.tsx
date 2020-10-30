import React, { FC } from "react"
import { Role, User } from "db"
import ShareItem from "../ShareItem"
import Button from "app/components/Button"
import deleteRole from "app/calendars/mutations/deleteRole"

type RoleWithUser = Role & { user: User }

interface UserShareListingProps {
  roles: RoleWithUser[]
  onDelete: (id: RoleWithUser["id"]) => void
}

const UserShareListing: FC<UserShareListingProps> = ({ roles, onDelete }) => {
	const handleDeleteRole = async (user: RoleWithUser) => {
		if (
			window.confirm(
				"Er du sikker på at du vil slette deling med " + (user.user.name || "") + user.user.email + "?"
			)
		) {
			await deleteRole({ id: user.id })
			onDelete(user.id)
		}
	}
	if (roles.length === 0) return null
	return (
		<>
			<h3>Delt med brukere</h3>
			{roles.length ? (
				<ul style={{ listStyle: "none", margin: "0", padding: "0" }}>
					{roles.map((role) => (
						<ShareItem
							key={role.id}
							actions={
								<Button type="secondary" onClick={() => handleDeleteRole(role)}>
                  Slett
								</Button>
							}
						>
							<div style={{ padding: "8px 0" }}>Delt med {role.user.name ? `${role.user.name} (${role.user.email})` : role.user.email}</div>
						</ShareItem>
					))}
				</ul>
			) : (
				<p>Du har ikke delt denne kalenderen med noen brukere enda.</p>
			)}
		</>
	)
}

export default UserShareListing
