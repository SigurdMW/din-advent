export enum CalendarBackgroundColorTheme {
  light = "light",
  dark = "dark",
}

export enum CalendarBackgroundPosition {
	cover = "cover",
	fillHeight = "fillheight",
	fillWidth = "fillwidth"
}

export interface CalendarOptions {
  background?: {
    image?: string
	colorTheme?: CalendarBackgroundColorTheme
	position?: CalendarBackgroundPosition
  }
}
