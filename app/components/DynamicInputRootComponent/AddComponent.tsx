import { ComponentTranslations, DynamicInputTypes } from "app/interfaces/DynamicInputComponent"
import React from "react"
import Dropdown from "../Dropdown"
import classes from "./DynamicInputRootComponent.module.scss"

const translations: ComponentTranslations = {
	richtext: {
		name: "Tekstfelt",
	},
	confetti: {
		name: "Konfettiregn",
	},
	snow: {
		name: "Snøfall"
	},
	youtube: {
		name: "YouTube"
	}
}

export const AddComponent = ({ components, onSelect }: { components: DynamicInputTypes[], onSelect: (v: DynamicInputTypes) => void }) => {
	return (
		<Dropdown
			triggerContent={<span className={classes.fakeBtn}>+ Legg til</span>}
			id="componentdropdown"
			className={classes.dropdown}
		>
			<ul>
				{components.map((key) => (
					<li key={key}>
						<button 
							onClick={() => onSelect(key)}
							className={classes.dropBtn}
						>{translations[key].name}</button>
					</li>
				))}	
			</ul>
		</Dropdown>
	)
}

export default AddComponent