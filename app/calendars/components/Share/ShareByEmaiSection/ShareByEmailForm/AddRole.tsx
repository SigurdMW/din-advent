import { AvailableRoles } from "app/calendars/utils"
import React from "react"
import { Field } from "react-final-form"

// TODO: find a way to type this so that it needs to have every role from type AvailableRoles
const allRoles: AvailableRoles[] = [
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

const getText = (r: string) => {
	if (r === "editor") return "Redigeringsrettigheter"
	if (r === "admin") return "Administratorrettigheter"
	return r
}

export const AddRole = () => {
	return (
		<Field 
			name="role"
		>
			{(input, meta) => (
				<div>
					<label htmlFor="roleselect">Rolle</label>
					<div style={{ display: "flex" }}>
						<select id="roleselect">
							<option value="">Velg en</option>
							{allRoles.filter((r) => r !== "reader").map((r) => (
								<option value={r} key={r}>
									{r.includes("editor/") ? "Redigeringsrettigheter for luke " + r.split("editor/")[1] : getText(r)}
								</option>
							))}
						</select>
					</div>
				</div>
			)}
		</Field>
	)
}

export default AddRole