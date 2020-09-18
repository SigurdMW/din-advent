import {
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

export const DynamicInputComponent = ({ components = [], id }: DynamicInput) => {
  const [isSaving, setIsSaving] = useState(false)
  const [localComponents, setLocalComponents] = useState(components)
  const [isDirty, setIsDirty] = useState(false)

  useEffect(() => {
    if (JSON.stringify(localComponents) !== JSON.stringify(components)) {
      setIsDirty(true)
    }
  }, [localComponents])

  const handleSave = async () => {
    try {
      console.log("HandlingSave: start")
      setIsSaving(true)
      await updateWindow({
        where: { id },
        data: {
          content: JSON.stringify({ components: localComponents }),
        },
      })
      console.log("HandlingSave: success")
    } catch (e) {
      console.error(e)
      console.log("HandlingSave: error")
    } finally {
      setIsSaving(false)
      console.log("HandlingSave: finished")
    }
  }

  if (components.length === 0) {
    // TODO: log here
    return null
  }

  const getComponent = (component: DynamicComponent, index: number) => {
    component.props.onChange = (c) => {
      console.log("running onChange from component", c)
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

  const removeComponent = (index: number) => {
    console.log("remove", index)
  }

  const componentWithFrame = (component: DynamicComponent, index) => {
    return (
      <DynamicComponentFrame remove={removeComponent(index)} key={index}>
        {getComponent(component, index)}
      </DynamicComponentFrame>
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
    </ErrorBoundary>
  )
}
