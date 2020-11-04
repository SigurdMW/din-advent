import FAB from "app/components/FAB"
import React, { useEffect, useState } from "react"

const penSvg = (
	<svg x="0px" y="0px" viewBox="0 0 383.947 383.947" width="19" height="19">
		<g>
			<polygon points="0,303.947 0,383.947 80,383.947 316.053,147.893 236.053,67.893 			"/>
			<path d="M377.707,56.053L327.893,6.24c-8.32-8.32-21.867-8.32-30.187,0l-39.04,39.04l80,80l39.04-39.04
				C386.027,77.92,386.027,64.373,377.707,56.053z"/>
		</g>
	</svg>
)

const eyeSvg = (
	<svg width="40" height="40" viewBox="0 0 40 40">
		<path fill="#522888" d="M12,4.5A11.827,11.827,0,0,0,1,12a11.817,11.817,0,0,0,22,0A11.827,11.827,0,0,0,12,4.5ZM12,17a5,5,0,1,1,5-5A5,5,0,0,1,12,17Zm0-8a3,3,0,1,0,3,3A3,3,0,0,0,12,9Z" transform="translate(8 8.5)"/>
	</svg>
)

export const PreviewEditFab = ({ defaultPreview = false, onChange }) => {
	const [previewMode, setPreviewMode] = useState(defaultPreview)
	
	useEffect(() => {
		onChange(previewMode)
	}, [previewMode])

	return (
		<FAB
			onClick={() => setPreviewMode(!previewMode)}
			style={{ position: "fixed", bottom: "185px", right: "45px" }}
			title={previewMode ? "Bytt til redigeringsmodus" : "Bytt til forhåndsvisning"}
			aria-label={previewMode ? "Bytt til redigeringsmodus" : "Bytt til forhåndsvisning"}
		>
			{previewMode ? penSvg : eyeSvg}
		</FAB>
	)
}

export default PreviewEditFab