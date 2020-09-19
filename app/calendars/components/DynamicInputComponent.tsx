import {
  ComponentEmptyState,
  ComponentTranslations,
  DynamicComponent,
  DynamicInput,
  DynamicInputTypes,
} from "app/interfaces/DynamicInputComponent"
import React, { useEffect, useState } from "react"
import { ConfettiComponent } from "./ConfettiComponent"
import RichTextComponent from "./RichTextComponent"
import { ErrorBoundary } from "react-error-boundary"
import { queryCache } from "react-query"
import DynamicComponentFrame from "./DynamicComponentFrame"
import updateWindow from "../mutations/updateWindow"
import UnsavedChangesModal from "./UnsaveChangesModal"

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
      content: "",
    },
  },
  confetti: {
    type: DynamicInputTypes.confetti,
    props: {},
  },
}

export const DynamicInputComponent = ({ components = [], id }: DynamicInput) => {
  const [isSaving, setIsSaving] = useState(false)
  const [localComponents, setLocalComponents] = useState(components)
  const [isDirty, setIsDirty] = useState(false)
  const [selected, setSelected] = useState<keyof ComponentEmptyState | undefined>(undefined)
  const [restrictAdd, setRestrictAdd] = useState<DynamicInputTypes[]>([])

  useEffect(() => {
    setRestrictAdd([])
    localComponents.forEach((c) => {
      // To only allow 1 confetti per calenar window
      if (c.type === DynamicInputTypes.confetti) {
        setRestrictAdd([...restrictAdd, DynamicInputTypes.confetti])
      }
    })
    if (JSON.stringify(localComponents) !== JSON.stringify(components)) {
      setIsDirty(true)
    }
  }, [localComponents])

  const handleSave = async () => {
    try {
      setIsSaving(true)
      await updateWindow({
        where: { id },
        data: {
          content: JSON.stringify({ components: localComponents }),
        },
      })
    } catch (e) {
      console.error(e)
    } finally {
      setIsSaving(false)
    }
  }

  const getComponent = (component: DynamicComponent, index: number) => {
    component.props.onChange = (c) => {
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
        return <RichTextComponent {...component.props} />
      case DynamicInputTypes.confetti:
        return <ConfettiComponent />
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

  const componentWithFrame = (component: DynamicComponent, index) => {
    return (
      <DynamicComponentFrame remove={removeComponent(index)} key={index}>
        {getComponent(component, index)}
      </DynamicComponentFrame>
    )
  }

  const getAvailableComponents = () => {
    return Object.keys(DynamicInputTypes).filter(
      (key: DynamicInputTypes) => !restrictAdd.includes(key)
    )
  }

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
      <button onClick={handleSave} disabled={!isDirty || isSaving}>
        Lagre
      </button>
      <select
        value={selected}
        onChange={(e) => setSelected(e.target.value as keyof ComponentEmptyState)}
      >
        <option>Velg innhold å legge til</option>
        {getAvailableComponents().map((key) => (
          <option value={key}>{translations[key].name}</option>
        ))}
      </select>
      <button disabled={!selected} onClick={addComponent}>
        Legg til
      </button>
      <UnsavedChangesModal isOpen={false} onClose={() => null} />
    </ErrorBoundary>
  )
}
