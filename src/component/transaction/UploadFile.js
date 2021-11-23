import React, { useState } from "react"
import axios from "axios"
import systemConfig from "../../config.json"

export default function UploadFile() {
	let [selectedFile, setSelectedFile] = useState()
	let [filePath, setFilePath] = useState()

	const onSelectFile = (e) => {
		setSelectedFile(e.target.files[0])
	}

	const uploadFile = async () => {
		const data = new FormData()
		data.append("file", selectedFile, 'testFile'+'.txt')
		await axios
			.post(`${systemConfig.MasterData.getTitleUrl}uploadAttachFile`, data, {})
			.then((res) => {
				setFilePath(`http://localhost:3000/api/downloadAttachFile/?file_name=${res.data.file_name}`)
				console.log(res.data.file_name)
			})
			.catch((err) => {
				console.log(err)
			})
	}

	return (
		<div>
			<div>
				<input type='file' name='file' id='exampleInputFile' onChange={onSelectFile} />
				<button onClick={uploadFile}>Upload</button>
				<a href={filePath} target='_blank' rel='noopener noreferrer'>
					<button>Download</button>
				</a>
			</div>
		</div>
	)
}
