export enum DynamicInputTypes {
  richtext,
  confetti,
}

interface DynamicInputCommon<T> {
  type: DynamicInputTypes
  props: T
}

export interface RichTextProps {
  content: string
}
export interface RichText extends DynamicInputCommon<RichTextProps> {
  type: DynamicInputTypes.richtext
}

export interface ConfettiProps {}
interface Confetti extends DynamicInputCommon<ConfettiProps> {
  type: DynamicInputTypes.confetti
}

export interface DynamicInput {
  components: Array<RichText | Confetti>
}
