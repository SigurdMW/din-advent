export enum CalendarBackgroundColorTheme {
  light = "light",
  dark = "dark",
}

export interface CalendarOptions {
  background?: {
    image?: string
    colorTheme?: CalendarBackgroundColorTheme
  }
}
