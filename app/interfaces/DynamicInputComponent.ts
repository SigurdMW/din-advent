export enum DynamicInputTypes {
  richtext = "richtext",
  confetti = "confetti",
}

interface DynamicInputCommon<T> {
  type: DynamicInputTypes
  props: {
    onChange: (val: T) => void
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

export type DynamicComponent = RichText | Confetti

export interface DynamicInput {
  components: Array<DynamicComponent>
  id: number
  mutate: any
}

export type ComponentEmptyState = Record<
  DynamicInputTypes,
  { type: DynamicInputTypes; props: Omit<DynamicComponent["props"], "onChange"> }
>
export type ComponentTranslations = Record<DynamicInputTypes, { name: string }>
