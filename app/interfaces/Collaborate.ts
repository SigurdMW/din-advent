import { AvailableRoles } from "app/calendars/utils";
import { User, Role, UserInvite } from "db"

export interface InviteWithRole extends Omit<UserInvite, "role"> {
	role: AvailableRoles
}

export interface EmailAndInvite {
	email: string
	invites: InviteWithRole[]
}

export interface UserAndRoles {
	user: User,
	roles: Role[]
}