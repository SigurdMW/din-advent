import {User, Role} from "db"
import {DefaultCtx, SessionContext} from "blitz"

declare module "blitz" {
	export interface PublicData extends Pick<User, "email" | "id" | "plan" | "role"> {
		source: string
		userId: any
		roles: string[]
	}

	export interface Ctx extends DefaultCtx {
		session: SessionContext
	  }

	export interface PrivateData {
		roles: Role[]
		updated: number
	}
} 