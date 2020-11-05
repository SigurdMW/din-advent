import React, { Suspense, useState } from "react"
import { Link, BlitzPage, useQuery } from "blitz"
import ArticleLayout from "app/layouts/ArticleLayout"
import LabeledTextField from "app/components/LabeledTextField"
import Form, { FORM_ERROR } from "app/components/Form"
import { AdminInput, AdminInputType } from "app/admins/validations"
import getUserInfo from "app/admins/queries/getUserInfo"
import Button from "app/components/Button"

type UserInfoProps = {
  onSubmit: (values: { email: string }) => any
}

const UserInfoForm = ({ onSubmit }: UserInfoProps) => {
	return (
		<Form<{ email: string }>
			submitText="Søk"
			schema={AdminInput}
			disabled={false}
			initialValues={{ email: "" }}
			onSubmit={async (values) => {
				try {
					await onSubmit(values)
				} catch (error) {
					return {
						[FORM_ERROR]: {
							type: "danger",
							message: error && error.message ? error.message : "Beklager, en feil oppsto. Vennligst prøv igjen."
						}
					}
				}
			}}
		>
			<LabeledTextField name="email" label="E-post" id="email" placeholder="E-postadresse" />
		</Form>
	)
}

const UserInfo = ({ email, reset }) => {
	const [user] = useQuery(getUserInfo, email)
	if (!user) return (
		<>
			<h1>Ingen bruker funnet</h1>
			<Button type="primary" onClick={reset}>Nullstill</Button>
		</>
	)
	return (
		<>
			<h2>Om bruker</h2>
			{["name", "email", "id", "active", "plan"].map((k) => <div>{k}: {user[k]}</div>)}
			<h3>Roller</h3>
			<ul>
				{user.Role.length === 0 && <li>Bruker har ingen roller</li>}
				{user.Role.map((r) => (
					<li>
						rolle navn: {r.role}<br/>
						kalenderId: {r.calendarId}
					</li>
				))}
			</ul>
			<h3>Kalendere laget av bruker</h3>
			<ul>
				{user.Calendar.length === 0 && <li>Bruker har ingen kalendere</li>}
				{user.Calendar.map((c) => (
					<li>Kalender navn: {c.name} <br/>
					kalenderId: {c.id}<br/>
					laget {c.createdAt.toLocaleDateString()}
					</li>
				))}
			</ul>
			<h3>Fullførte betalinger</h3>
			<ul>
				{user.Payment.length === 0 && <li>Bruker har ingen fullførte betalinger</li>}
				{user.Payment.filter((p) => p.completed).map((p) => (
					<li>Bruker betalte {p.amount / 100} kr den {p.createdAt.toLocaleDateString()}</li>
				))}
			</ul>
			<Button type="primary" onClick={reset}>Nullstill</Button>
		</>
	)
}


const UserInfoPage: BlitzPage = () => {
	const [email, setEmail] = useState("")
	const handleSubmit = (val: AdminInputType) => {
		setEmail(val.email)
	}
	const reset = () => {
		setEmail("")
	}
	const content = (child: any) => {
		return (
			<div>
				<h1>Finn brukerinfo</h1>
				<p>Få brukerinfo med e-post</p>

				{child}

				<p>
					<Link href="/admins">
						<a>Tilbake til admin-side</a>
					</Link>
				</p>
			</div>
		)
	}
	if (!email) {
		return content(<UserInfoForm onSubmit={handleSubmit} />)
	}
	return (
		<div>
			<h1>Finn brukerinfo</h1>
			<p>Få brukerinfo med e-post</p>

			
			<Suspense fallback={<div>Laster...</div>}>
				<UserInfo email={email} reset={reset} />
			</Suspense>

			<p>
				<Link href="/admins">
					<a>Tilbake til admin-side</a>
				</Link>
			</p>
		</div>
	)
}

UserInfoPage.getLayout = (page) => <ArticleLayout title="Finn brukerinfo">{page}</ArticleLayout>

export default UserInfoPage
