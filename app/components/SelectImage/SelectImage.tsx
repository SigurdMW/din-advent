import React, { FC, useEffect, useState } from "react"
import classes from "./SelectImage.module.scss"

interface SelectImageProps {
	id: string
	file?: File
	onChange: (f: File | null) => any
	isValid: boolean
	invalidMessage?: string
	uploadText?: string
	hasImageText?: string
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

export const SelectImage: FC<SelectImageProps> = ({ 
	invalidMessage, isValid, id, file, onChange, uploadText = "Last opp bilde ved å klikke eller dra bilde hit", hasImageText = "Vil du laste opp dette bildet?"
}) => {
	return (
		<>
			<div className={classes.inputContainer}>
				<input
					type="file"
					name="inputfile"
					className={classes.input}
					onChange={(e) => {
						const files = e.target.files
						if (files && files[0]) {
							onChange(files[0])
						}
					}}
					id={id}
					accept="image/*"
					aria-invalid={!isValid}
				/>
				{(isValid && file) ? (
					<div className={classes.preview}>
						<p>{hasImageText}</p>
						<ImagePreview file={file} />
						<button aria-label={"Fjern bilde " + file.name} title={"Fjern bilde " + file.name} onClick={() => onChange(null)}>x</button>
					</div>
				) : (
					<p>{uploadText}</p>
				)}
			</div>
			{invalidMessage && 
				<div className={classes.red}>{invalidMessage}</div>
			}
		</>
	)
}

export default SelectImage