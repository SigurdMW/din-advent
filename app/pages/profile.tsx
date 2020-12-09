import Button from "app/components/Button"
import { PricingItem } from "app/components/PricingItem"
import Spinner from "app/components/Spinner"
import { useCurrentUser } from "app/hooks/useCurrentUser"
import Layout from "app/layouts/ArticleLayout"
import { pricePlanAndFeatures } from "app/price"
import updateCurrentUserName from "app/users/mutations/updateCurrentUserName"
import getCurrentUserPayments from "app/users/queries/getCurrentUserPayments"
import { Link, useMutation, useQuery } from "blitz"
import React, { Suspense, useState } from "react"
import classes from "./profile.module.scss"

const NameField = ({ name, mutate }: { name: string | null; mutate: (name: string) => void }) => {
	const [newName, setNewName] = useState(name || "")
	const [error, setError] = useState("")
	const [updateCurrentUserNameMutation] = useMutation(updateCurrentUserName)

	const disabled = !newName ? true : name ? name === newName.trim() : false
	const update = async () => {
		try {
			if (!newName) return
			await updateCurrentUserNameMutation({ name: newName })
			await mutate(newName)
		} catch (e) {
			setError(e.message ? e.message : "Noe gikk galt. Vennligst forsøk igjen.")
		}
	}
	return (
		<>
			<label htmlFor="nameInputField">
				<strong>Navn:</strong>
			</label>
			<div style={{ display: "flex", marginBottom: "5px" }}>
				<input
					className={classes.input}
					id="nameInputField"
					type="text"
					placeholder="Fortell oss navnet ditt"
					value={newName}
					onChange={(e) => setNewName(e.target.value)}
				/>
				<Button type="primary" disabled={disabled} onClick={update}>
          Lagre
				</Button>
			</div>
			{error && <span style={{ color: "red" }}>{error}</span>}
		</>
	)
}

const Profile = () => {
	const { user, setQueryData } = useCurrentUser()
	const [payments, { isLoading }] = useQuery(getCurrentUserPayments, null)
	//   const [showDeleteModal, setShowDeleteModal] = useState(false)
	//   const [didCheck, setDidCheck] = useState(false)
	//   const router = useRouter()

	if (!user || isLoading) return <Spinner />

	const mutateName = async (name: string) => {
		user.name = name
		await setQueryData(user)
	}

	const userPayments = payments || []

	//   const handleDeleteUser = async () => {
	// 	await deleteUser({ id: user.id })
	// 	router.push("/")
	//   }

	return (
		<>
			<h1>Hei{user.name ? ", " + user.name : ""}!</h1>
			<h2>Om deg</h2>
			<div className={classes.field}>
				<div>
					<strong>E-postadresse:</strong>
				</div>
				{user.email}
			</div>
			<div className={classes.field}>
				<NameField name={user.name} mutate={mutateName} />
			</div>

			<hr className="da-divider" />

			<h2>Dine pakker og kjøp</h2>
			{user.plan ? (
				<>
					<p>Du har denne pakken:</p>
					<div style={{ maxWidth: "320px" }}>
						<PricingItem item={pricePlanAndFeatures[user.plan]} />
					</div>
				</>
			) : (
				<p>
          Du har ingen pakke enda.{" "}
					<Link href="/pricing">
						<a>Kjøp en pakke nå</a>
					</Link>
				</p>
			)}
			<h3>Dine betalinger</h3>
			{userPayments.length ? (
				<ul>
					{userPayments.map((payment) => (
						<li key={payment.id}>
              Du betalte {payment.amount / 100} kr den {payment.createdAt.toLocaleDateString()}
						</li>
					))}
				</ul>
			) : (
				<p>Du har ingen betalinger.</p>
			)}
			{/* <h2>Slett meg</h2>
	  <p>Slett all data om deg og dine kalendere fra dinadvent.no.</p>
	  <Alert type="danger">
		  <p>Dersom du sletter din bruker, kan ikke innholdet gjenopprettes.</p>
		<Button type="secondary" className={classes.delete} onClick={() => setShowDeleteModal(true)}>Slett meg</Button>
	  </Alert>
	  <Modal isOpen={showDeleteModal} requestClose={() => setShowDeleteModal(false)} label="Slett bruker">
		<div style={{ marginBottom: "1em", display: "block" }}>
			<h2>Slett bruker</h2>
			<p>Dersom du sletter din bruker, kan ikke innholdet gjenopprettes.</p>
			<label><input type="checkbox" onChange={() => setDidCheck(!didCheck)} />Ja, jeg har forstått</label>
			<Button
				type="secondary"
				className={classes.delete}
				onClick={handleDeleteUser}
				disabled={!didCheck}
			>Slett meg</Button>
		</div>
		</Modal> */}
		</>
	)
}

export const ProfilePage = () => (
	<Suspense fallback={<Spinner />}>
		<Profile />
	</Suspense>
)

ProfilePage.getLayout = (page) => <Layout title="Profil - Din Advent">{page}</Layout>

export default ProfilePage
