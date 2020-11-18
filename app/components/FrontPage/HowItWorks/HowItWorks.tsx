import Container from "app/components/Container"
import React, { FC, ReactNode } from "react"
import classes from "./HowItWorks.module.scss"

export interface WorkItem {
	icon: ReactNode
	title: string
	text: ReactNode
}

const WorksItem: FC<Omit<WorkItem, "text">> = ({ icon, title, children }) => (
	<div className={classes.col}>
		<>{icon}</>
		<h3 className={classes.subTitle}>{title}</h3>
		{children}
	</div>
)

export const HowItWorks: FC<{ items: WorkItem[] }> = ({ items }) => (
	<div className={classes.section}>
		<Container>
			<h2>Hvordan fungerer det?</h2>
			<div className={classes.row}>
				{items.map((item) => <WorksItem key={item.title} {...item}>{item.text}</WorksItem>)}
			</div>
		</Container>
	</div>
)

export default HowItWorks