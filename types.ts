import {User, Role} from "db"

declare module "blitz" {
	export interface PublicData extends Pick<User, "email" | "id" | "plan" | "role"> {
		source: string
		userId: any
		roles: string[]
	}

	export interface PrivateData {
		roles: Role[]
		updated: number
	}
} 