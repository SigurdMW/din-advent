import React, { useState } from "react"
import { useQuery, Link } from "blitz"
import getCalendar from "app/calendars/queries/getCalendar"
import classes from "./CalendarRenderer.module.scss"
import Calendar from "app/components/Calendar"
import CalendarSettingsModal from "app/calendars/components/CalendarSettingsModal"
import getCalendarRoles from "app/calendars/queries/getCalendarRoles"
import Alert from "app/components/Alert"
import { getRoleText } from "app/utils/roles"
import Tag from "app/components/Tag"
import Container from "app/components/Container"
import PreviewEditFab from "app/calendars/components/PreviewEditFab"
import HeroBanner from "app/components/HeroBanner"
import { cooperateIcon, settingsSvg, shareIcon } from "app/components/icons"
import Button from "app/components/Button"
import getEmptyWindows from "app/calendars/queries/getEmptyWindows"
import { usePreviewState } from "app/utils/usePreviewState"

export const CalendarRenderer = ({ calendarId }) => {
	const [calendar] = useQuery(getCalendar, { where: { id: calendarId } })
	const [calendarRoles] = useQuery(getCalendarRoles, { calendarId })
	const [emptyWindows] = useQuery(getEmptyWindows, calendarId)
	const [openSettingModal, setOpenSettingsModal] = useState(false)
	const [previewMode, setPreviewMode] = usePreviewState(calendarId)

	const allowedToEdit = calendarRoles.includes("admin") || calendarRoles.includes("editor*")
	const otherEditRights = calendarRoles.filter((r) => r !== "reader").length > 0

	return (
		<>
			<HeroBanner>
				<h1>{calendar.name}</h1>
				<p style={{ maxWidth: "500px", marginBottom: "4em" }}>Tips til innhold: Del en vits, en gåte, et minne, et morsomt YouTube-klipp eller gjør noe annet hyggelig for den som mottar denne kalenderen!</p>
				{!previewMode && 
					<>
						{allowedToEdit ? (
							<div className={classes.share}>
								<Link href={`/calendars/${calendarId}/share`} passHref>
									<Button anchor={true} type="green">{shareIcon}Del kalender</Button>
								</Link>
								<Link href={`/calendars/${calendarId}/collaborate`} passHref>
									<Button anchor={true} type="purple">{cooperateIcon}Samarbeid</Button>
								</Link>
								<Button type="purple" onClick={() => setOpenSettingsModal(true)}>
									{settingsSvg}Innstillinger
								</Button>
							</div>
						) : (
							<>
								{otherEditRights &&
									<Container>
										<Alert type="info">
											Du har følgende rettigheter for denne kalenderen:<br/>
											{calendarRoles.map((r) => <Tag key={r}>{getRoleText(r)}</Tag>)}
										</Alert>
									</Container>
								}
							</>
						)}
					</>
				}
			</HeroBanner>
			<div style={{ position: "relative" }}>
				<Calendar calendar={calendar} emptyWindows={emptyWindows} editMode={!previewMode} />
				{allowedToEdit && <PreviewEditFab preview={previewMode} onChange={setPreviewMode} />}
				{allowedToEdit &&
					<CalendarSettingsModal
						isOpen={openSettingModal}
						onClose={() => setOpenSettingsModal(false)}
						calendarId={calendarId}
					/>
				}
			</div>
		</>
	)
}

export default CalendarRenderer
