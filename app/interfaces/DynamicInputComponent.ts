import { CalendarWindowUpdateInput } from "db"

export enum DynamicInputTypes {
  richtext = "richtext",
  confetti = "confetti",
  snow = "snow"
}

interface DynamicInputCommon<T> {
  type: DynamicInputTypes
  props: {
    onChange: (val: T) => void
    editorMode: boolean
  } & T
}

export interface RichText
  extends DynamicInputCommon<{
    content: any[]
  }> {
  type: DynamicInputTypes.richtext
}

interface Confetti extends DynamicInputCommon<{}> {
  type: DynamicInputTypes.confetti
}

interface Snow extends DynamicInputCommon<{}> {
	type: DynamicInputTypes.snow
}

export type DynamicComponent = RichText | Confetti | Snow

export interface DynamicInput {
  components: Array<DynamicComponent>
  id: number
  save?: (v: CalendarWindowUpdateInput) => Promise<void>
  editorMode: boolean
}

export type ComponentEmptyState = Record<
  DynamicInputTypes,
  { type: DynamicInputTypes; props: Omit<DynamicComponent["props"], "onChange" | "editorMode"> }
>
export type ComponentTranslations = Record<DynamicInputTypes, { name: string }>
