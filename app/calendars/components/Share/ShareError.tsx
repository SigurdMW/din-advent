import React, { FC } from "react"
import { ErrorName } from "app/utils/errors"
import Alert from "app/components/Alert"
import { Link } from "blitz"

interface ShareErrorProps {
  errorType: ErrorName
}

const ExeededPlanError = () => (
	<Alert type="warning">
		<p>
      Whoops, det ser ut som du er over begrensningene som ligger i din pakke.{" "}
			<Link href="/pricing">
				<a>Se priser og oppgrader her</a>
			</Link>
		</p>
	</Alert>
)

const GeneralError = () => (
	<Alert type="danger">
		<p>
      Oisann! Her gikk noe galt. Vennligst forsøk å logge ut og deretter prøv på nytt. Dersom
      problemet vedvarer,{" "}
			<Link href="/contact">
				<a>ta kontakt</a>
			</Link>
		</p>
	</Alert>
)

const ShareError: FC<ShareErrorProps> = ({ errorType }) => {
	if (errorType === ErrorName.ExceededPlanError) {
		return <ExeededPlanError />
	}
	if (errorType === ErrorName.ValidationError) {
		return <Alert type="warning">Obs, noe gikk feil med valideringen.</Alert>
	}
	return <GeneralError />
}

export default ShareError
