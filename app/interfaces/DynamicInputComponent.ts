import { CalendarWindowUpdateInput } from "db"

export enum DynamicInputTypes {
  richtext = "richtext",
  confetti = "confetti",
  snow = "snow",
  youtube = "youtube"
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

export interface YouTube
  extends DynamicInputCommon<{
	youtubeId: string
	youtubeUrl: string
  }> {
  type: DynamicInputTypes.youtube
}

interface Confetti extends DynamicInputCommon<{}> {
  type: DynamicInputTypes.confetti
}

interface Snow extends DynamicInputCommon<{}> {
	type: DynamicInputTypes.snow
}

// type DropSome<T> = Omit<T, "onChange" | "editorMode">
export type DynamicComponent = RichText | Confetti | Snow | YouTube

export interface DynamicInput {
  components: Array<DynamicComponent> // TODO: this should be without editorMode and onChange that are purely frontend
  id: number
  save?: (v: CalendarWindowUpdateInput) => Promise<void>
  editorMode: boolean
}

export type ComponentEmptyState = Record<
  DynamicInputTypes,
  { type: DynamicInputTypes; props: Omit<DynamicComponent["props"], "onChange" | "editorMode"> }
>
export type ComponentTranslations = Record<DynamicInputTypes, { name: string }>
