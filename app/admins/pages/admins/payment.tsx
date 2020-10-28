import React, { useEffect, useState } from "react"
import { BlitzPage } from "blitz"
import ArticleLayout from "app/layouts/ArticleLayout"
import LabeledTextField from "app/components/LabeledTextField"
import Form, { Field, FORM_ERROR } from "app/components/Form"
import { UpgradeUserInput, UpgradeUserInputType } from "app/admins/validations"
import { price } from "app/price"
import upgradeUser from "app/admins/mutations/upgradeUser"

const AdminPayment: BlitzPage = () => {
	const [upgraded, setUpgraded] = useState<null | UpgradeUserInputType>(null)

	useEffect(() => {
		if (upgraded) {
			setTimeout(() => {
				setUpgraded(null)
			}, 4000)
		}
	}, [upgraded])
	return (
		<div>
			<h1>Oppgrader bruker</h1>
			<Form<UpgradeUserInputType>
				submitText="Oppgrader bruker"
				schema={UpgradeUserInput}
				disabled={false}
				onSubmit={async (values) => {
					try {
						await upgradeUser({ data: values })
						setUpgraded(values)
					} catch (error) {
						return {
							[FORM_ERROR]: "Beklager, en feil oppsto. Vennligst prøv igjen. - " + error.toString(),
						}
					}
				}}
			>
				<LabeledTextField name="email" label="E-post" id="email" placeholder="E-postadresse" />
				<Field name="plan" component="select">
					<option value="">Velg en</option>
					{Object.keys(price).map((key) => {
						return (
							<option value={key} key={key}>
								{key}
							</option>
						)
					})}
				</Field>
				{upgraded && (
					<p>
            Bruker {upgraded.email} ble oppgradert til {upgraded.plan}
					</p>
				)}
			</Form>
		</div>
	)
}

AdminPayment.getLayout = (page) => <ArticleLayout title="Betaling">{page}</ArticleLayout>

export default AdminPayment
