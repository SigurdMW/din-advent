import Button from "app/components/Button"
import { YouTube } from "app/interfaces/DynamicInputComponent"
import React, { useState } from "react"
import classes from "./YouTubeComponent.module.scss"

function getParameterByName(name, url = window.location.href) {
	name = name.replace(/[\[\]]/g, '\\$&');
	var regex = new RegExp('[?&]' + name + '(=([^&#]*)|&|#|$)'),
		results = regex.exec(url);
	if (!results) return null;
	if (!results[2]) return '';
	return decodeURIComponent(results[2].replace(/\+/g, ' '));
}

export const YouTubeComponent = ({ editorMode, youtubeId, youtubeUrl, onChange }:  YouTube["props"]) => {
	const [error, setError] = useState("")
	const [edit, setEdit] = useState(false)
	const [url, setUrl] = useState(youtubeUrl || "")

	const handleYoutubeLink = () => {
		setError("")
		const toHandle = url.trim()
		if (toHandle.includes("youtube.com/watch")) {
			const p = getParameterByName("v", toHandle)
			if (p) {
				onChange({
					youtubeId: p,
					youtubeUrl: toHandle
				})
				setEdit(false)
			} else {
				setError("Beklager, vi klarte ikke finne hvilken YouTube video du ville legge inn. Lim inn en link som ligner på denne: https://www.youtube.com/watch?v=1gJzzUBt1ys")
			}
			return
		}

		try {
			const urlObj = new URL(toHandle);
			if (urlObj.pathname) {
				const id = urlObj.pathname.replace(/\//, "")
				if(id) {
					onChange({
						youtubeId: id,
						youtubeUrl: toHandle
					})
					setEdit(false)
					return
				} else {
					setError("Beklager, vi klarte ikke finne hvilken YouTube video du ville legge inn. Lim inn en link som ligner på denne: https://www.youtube.com/watch?v=1gJzzUBt1ys")
				}
			}
		} catch(e) {
			setError("Beklager, vi klarte ikke finne hvilken YouTube video du ville legge inn. Lim inn en link som ligner på denne: https://www.youtube.com/watch?v=1gJzzUBt1ys")
		}
	}

	if (editorMode) {
		if (!youtubeUrl || edit) {
			return (
				<div className={classes.root}>
					<label>Kopier YouTube-link her:<br/>
						<input type="text" value={url} onChange={(e) => setUrl(e.target.value)} placeholder="Legg inn link til YouTube video her"/>
					</label>
					{error && <><span>{error}</span><br/><br/></>}
					<Button type="primary" onClick={() => handleYoutubeLink()}>Legg til</Button>{" "}{youtubeUrl && <Button type="secondary" onClick={() => setEdit(false)}>Avbryt</Button>}
				</div>
			)
		}
		return (
			<div className={classes.root}>
				Viser YouTube film:<br />
				<iframe width="560" height="315" title="YouTube film" src={`https://www.youtube-nocookie.com/embed/${youtubeId}?modestbranding=1&showinfo=0&rel=0&iv_load_policy=3`} frameBorder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" allowFullScreen></iframe>
				<br/>
				<Button type="subtle" onClick={() => setEdit(true)}>Endre</Button>
			</div>
		)
	}
	if (!youtubeId) return null
	return (
		<div className={classes.root}>
			<iframe width="560" height="315" title="YouTube film" src={`https://www.youtube-nocookie.com/embed/${youtubeId}?modestbranding=1&showinfo=0&rel=0&iv_load_policy=3`} frameBorder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" allowFullScreen></iframe>
		</div>
	)
}

export default YouTubeComponent