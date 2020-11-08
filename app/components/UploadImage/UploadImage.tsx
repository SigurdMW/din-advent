import { uploadImageCallBack } from "app/utils/uploadImage"
import React, { FC, FormEvent, useEffect, useState } from "react"
import Alert from "../Alert"
import Button from "../Button"
import classes from "./UploadImage.module.scss"

interface UploadImageProps {
  onSubmit: (v: string) => void
}

const ImagePreview = ({ file }: { file: File }) => {
	const [isLoading, setIsLoading] = useState(false)
	const [base, setBase] = useState<null | string>(null)

	useEffect(() => {
		const read = async () => {
			try {
				setIsLoading(true)
				const res = await toBase64(file)
				setBase(res)
			} catch (e) {
				// nothing
			} finally {
				setIsLoading(false)
			}
		}
		read()
	}, [file])
	
	const toBase64 = (file) => new Promise<string | null>((resolve, reject) => {
		const reader = new FileReader();
		reader.readAsDataURL(file);
		reader.onload = () => {
			const res = reader.result
			if (res instanceof ArrayBuffer) {
				resolve(res.toString())
				return
			}
			resolve(res)
		}
		reader.onerror = error => reject(error);
	});
	
	if (isLoading || !base) {
		return null
	}
	return (
		<img src={base} alt="" />
	)
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
				setFile(undefined)
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
		setFile(element.files[0])
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
				{(isValid && file) ? (
					<div className={classes.preview}>
						<p>Vil du laste opp {file.name}?</p>
						<ImagePreview file={file} />
					</div>
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
