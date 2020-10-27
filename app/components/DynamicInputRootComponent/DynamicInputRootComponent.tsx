import {
	ComponentEmptyState,
	ComponentTranslations,
	DynamicComponent,
	DynamicInput,
	DynamicInputTypes,
} from "app/interfaces/DynamicInputComponent"
import React, { useEffect, useState } from "react"
import { ErrorBoundary } from "react-error-boundary"
import { queryCache } from "react-query"
import DynamicComponentFrame from "../DynamicComponentFrame"
// import UnsavedChangesModal from "./UnsaveChangesModal"
import classes from "./DynamicInputRootComponent.module.scss"
import { ConfettiComponent } from "../DynamicComponents/ConfettiComponent"
import RichTextComponent from "../DynamicComponents/RichTextComponent"

const translations: ComponentTranslations = {
	richtext: {
		name: "Riktekst",
	},
	confetti: {
		name: "Konfettiregn",
	},
}

const componentEmptyState: ComponentEmptyState = {
	richtext: {
		type: DynamicInputTypes.richtext,
		props: {
			content: undefined,
		},
	},
	confetti: {
		type: DynamicInputTypes.confetti,
		props: {},
	},
}

/**
 * Ideer:
 * Snøfall: https://codepen.io/bsehovac/pen/GPwXxq og https://codepen.io/ibrahimjabbari/pen/XWrqWLy
 * https://codepen.io/danwilson/pen/zveqab
 * https://codepen.io/machaidze/pen/WNbMBZP
 * https://codepen.io/dylangggg/pen/zYxwbrx
 */

export const DynamicInputRootComponent = ({
	components = [],
	id,
	save,
	editorMode,
}: DynamicInput) => {
	const [isSaving, setIsSaving] = useState(false)
	const [localComponents, setLocalComponents] = useState(components)
	const [isDirty, setIsDirty] = useState(false)
	const [selected, setSelected] = useState<keyof ComponentEmptyState | undefined>(undefined)
	const [restrictAdd, setRestrictAdd] = useState<DynamicInputTypes[]>([])

	useEffect(() => {
		setRestrictAdd([])
		localComponents.forEach((c) => {
			// To only allow 1 confetti per calendar window
			if (c.type === DynamicInputTypes.confetti) {
				setRestrictAdd([...restrictAdd, DynamicInputTypes.confetti])
			}
		})
		if (JSON.stringify(localComponents) !== JSON.stringify(components)) {
			// console.log("Components are different")
			setIsDirty(true)
		} else {
			// console.log("Components are similar")
			setIsDirty(false)
		}
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, [localComponents, components])

	const handleSave = async () => {
		if (!save) return
		try {
			setIsSaving(true)
			await save({
				content: JSON.stringify({ components: localComponents }),
			})
			setIsDirty(false)
		} catch (e) {
			console.error(e)
		} finally {
			setIsSaving(false)
		}
	}

	//   const handleDiscard = () => {
	//     setLocalComponents(components)
	//   }

	const getComponent = (component: DynamicComponent, index: number) => {
		const onChange = (c) => {
			const newComponents = localComponents.map((component, i) => {
				if (i === index) {
					return {
						...component,
						props: {
							...(component.props || {}),
							...c,
						},
					}
				}
				return component
			})
			setLocalComponents(newComponents)
		}

		switch (component.type) {
		case DynamicInputTypes.richtext:
			return (
				<RichTextComponent {...component.props} editorMode={editorMode} onChange={onChange} />
			)
		case DynamicInputTypes.confetti:
			return <ConfettiComponent editorMode={editorMode} />
		default:
			return null
		}
	}

	const removeComponent = (index: number) => () => {
		setLocalComponents(localComponents.filter((c, i) => i !== index))
	}

	const addComponent = () => {
		if (!selected) return
		const newComp = componentEmptyState[selected] as any
		setLocalComponents([...localComponents, newComp])
	}

	const componentWithFrame = (component: DynamicComponent, index) => (
		<DynamicComponentFrame remove={removeComponent(index)} key={index} editMode={editorMode}>
			{getComponent(component, index)}
		</DynamicComponentFrame>
	)

	const getAvailableComponents = () => {
		return Object.keys(DynamicInputTypes).filter(
			(key: DynamicInputTypes) => !restrictAdd.includes(key)
		)
	}

	const editorContent = (
		<>
			<div className={classes.addComponent}>
				<select
					value={selected}
					onChange={(e) => setSelected(e.target.value as keyof ComponentEmptyState)}
				>
					<option value="">Velg innhold å legge til</option>
					{getAvailableComponents().map((key) => (
						<option value={key} key={key}>
							{translations[key].name}
						</option>
					))}
				</select>
				<button disabled={!selected} onClick={addComponent} className="da-button da-golden-btn">
          Legg til
				</button>
			</div>
			<div className={classes.actions}>
				<button
					onClick={handleSave}
					disabled={!isDirty || isSaving}
					className="da-button da-golden-btn"
				>
          Lagre
				</button>
			</div>
			{/* <button onClick={handleDiscard}>Forkast</button> */}
			{/* <UnsavedChangesModal isDirty={isDirty} save={handleSave} discard={handleDiscard} /> */}
		</>
	)

	return (
		<ErrorBoundary
			FallbackComponent={() => <div>Klarte ikke å laste dette innholdet :/</div>}
			onReset={() => {
				// This ensures the Blitz useQuery hooks will automatically refetch
				// data any time you reset the error boundary
				queryCache.resetErrorBoundaries()
			}}
		>
			{localComponents.map(componentWithFrame)}
			{editorMode ? editorContent : null}
		</ErrorBoundary>
	)
}
