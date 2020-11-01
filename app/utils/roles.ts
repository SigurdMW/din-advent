import { AvailableRoles } from "app/calendars/utils"

export const getRoleText = (r: string) => {
	if (r === "reader") return "Lese innhold"
	if (r === "editor") return "Redigere alt innhold"
	if (r.startsWith("editor/")) {
		return "Redigere innhold i luke " + r.split("editor/")[1]
	}
	return r
}

// TODO: find a way to type this so that it needs to have every role from type AvailableRoles
export const allRoles: AvailableRoles[] = [
	"reader",
	"editor",
	"admin",
	"editor/1",
	"editor/2",
	"editor/3",
	"editor/4",
	"editor/5",
	"editor/6",
	"editor/7",
	"editor/8",
	"editor/9",
	"editor/10",
	"editor/11",
	"editor/12",
	"editor/13",
	"editor/14",
	"editor/15",
	"editor/16",
	"editor/17",
	"editor/18",
	"editor/19",
	"editor/20",
	"editor/21",
	"editor/22",
	"editor/23",
	"editor/24"
]