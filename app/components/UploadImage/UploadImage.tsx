import { uploadImageCallBack } from "app/utils/uploadImage"
import React, { FC, FormEvent, useState } from "react"
import Alert from "../Alert"
import Button from "../Button"
import classes from "./UploadImage.module.scss"

interface UploadImageProps {
  onSubmit: (v: string) => void
}

export const UploadImage: FC<UploadImageProps> = ({ onSubmit }) => {
	const [isLoading, setIsLoading] = useState(false)
	const [isValid, setIsValid] = useState(false)
	const [error, setError] = useState("")
	const [filename, setFilename] = useState<string>("")

	const id = "daimageupload"
	const formId = "daimageuploadform"

	const upload = async (e: FormEvent) => {
		e.preventDefault()
		const element = document.querySelector<HTMLInputElement>(`#${id}`)
		if (!element) return
		const files = element.files

		if (files && files[0]) {
			setError("")
			setIsLoading(true)
			try {
				const result = await uploadImageCallBack(files[0])
				onSubmit(result.data.link)
				const form = document.querySelector<HTMLFormElement>(`#${formId}`)
				if (!form) return
				setIsValid(false)
				setFilename("")
				element.value = ""
				form.reset()
			} catch (e) {
				console.error(e)
				setError(
					"Whoops, noe gikk galt når vi forsøkte å laste opp bildet. Vennligst forsøk igjen."
				)
			} finally {
				setIsLoading(false)
			}
		}
	}
	const handleChange = () => {
		setIsValid(true)
		const element = document.querySelector<HTMLInputElement>(`#${id}`)
		if (!element || !element.files) return
		setFilename(element.files[0].name)
	}
	return (
		<form encType="multipart/form-data" onSubmit={upload} className={classes.container} id={formId}>
			<div className={classes.inputContainer}>
				<input
					type="file"
					name="inputfile"
					className={classes.input}
					onChange={handleChange}
					id={id}
					accept="image/*"
					aria-invalid={!isValid}
				/>
				{isValid ? (
					<p>Vil du laste opp {filename}?</p>
				) : (
					<p>Last opp bilde ved å klikke eller dra bilde hit</p>
				)}
			</div>
			{error && <Alert type="danger">{error}</Alert>}
			<Button type="secondary" disabled={!isValid || isLoading} buttonType="submit">Ja, lagre</Button>
		</form>
	)
}

export default UploadImage
