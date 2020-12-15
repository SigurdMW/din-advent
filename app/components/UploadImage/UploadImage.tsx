import { uploadImageCallBack } from "app/utils/uploadImage"
import React, { FC, FormEvent, useState } from "react"
import Alert from "../Alert"
import Button from "../Button"
import SelectImage from "../SelectImage"
import classes from "./UploadImage.module.scss"
import Sentry from "integrations/sentry"

interface UploadImageProps {
  onSubmit: (v: string) => void
}

export const UploadImage: FC<UploadImageProps> = ({ onSubmit }) => {
	const [isLoading, setIsLoading] = useState(false)
	const [isValid, setIsValid] = useState(false)
	const [error, setError] = useState("")
	const [file, setFile] = useState<File | undefined>()

	const id = "daimageupload"
	const formId = "daimageuploadform"

	const upload = async (e: FormEvent) => {
		e.preventDefault()

		if (file) {
			setError("")
			setIsLoading(true)
			try {
				const result = await uploadImageCallBack(file)
				onSubmit(result.data.link)
				const form = document.querySelector<HTMLFormElement>(`#${formId}`)
				if (!form) return
				setIsValid(false)
				setFile(undefined)
				form.reset()
			} catch (e) {
				Sentry.captureMessage("Error when trying to upload image")
				Sentry.captureException(e)
				setError(
					"Whoops, noe gikk galt når vi forsøkte å laste opp bildet. Vennligst forsøk igjen."
				)
			} finally {
				setIsLoading(false)
			}
		}
	}
	const handleChange = (file: File | null) => {
		const max = 10 // MB
		const mbInBytes = 1048576
		if (file && file.size > (max * mbInBytes)) {
			setIsValid(false)
			setError(`Whoops, bildet er for stort. Maks størrelse er ${max}MB. Ditt bilde var ${Math.round(file.size / mbInBytes)}MB.`)
		} else {
			setIsValid(true)
			setError("")
		}
		setFile(file || undefined)
	}

	return (
		<form encType="multipart/form-data" onSubmit={upload} className={classes.container} id={formId}>
			<SelectImage
				isValid={isValid}
				file={file}
				onChange={handleChange}
				id="changeimage"
			/>
			{error && <Alert type="danger">{error}</Alert>}
			<Button type="green" disabled={!isValid || isLoading} buttonType="submit">Ja, lagre</Button>
		</form>
	)
}

export default UploadImage
