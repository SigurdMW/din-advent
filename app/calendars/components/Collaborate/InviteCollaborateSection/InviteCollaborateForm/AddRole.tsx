import Button from "app/components/Button"
import Tag from "app/components/Tag"
import { allRoles, getRoleText } from "app/utils/roles"
import React from "react"
import { Field } from "react-final-form"

const TagInput = ({ value = [], onChange }) => {
	const realValue: string[] = Array.isArray(value) ? value : []
	return (
		<div>
			<label htmlFor="roleselect">Denne brukeren skal kunne</label>
			<div style={{ display: "flex" }}>
				<select id="roleselect" onChange={(e) => onChange([...realValue, e.target.value])}>
					<option value="">Velg en</option>
					{allRoles.filter((r) => !["reader", "admin"].includes(r)).filter((r) => !realValue.includes(r)).map((r) => (
						<option value={r} key={r}>
							{getRoleText(r)}
						</option>
					))}
				</select>
				<Button type="secondary" style={{ minWidth: "100px" }}>Legg til</Button>
			</div>
			<ul style={{ listStyle: "none", padding: "0" }}>
				{realValue.map((r) => (
					<li key={"list" + r} style={{ display: "inline-block" }}>
						<Tag
							onRemove={() => onChange(realValue.filter((v) => v !== r))}
							ariaLabel={"Fjern " + r}
						>
							{getRoleText(r)}
						</Tag>
					</li>
				))}
			</ul>
		</div>
	)
}

export const AddRole = () => {
	return (
		<Field 
			name="roles"
		>
			{({ input }) => (
				<TagInput {...input} />
			)}
		</Field>
	)
}

export default AddRole