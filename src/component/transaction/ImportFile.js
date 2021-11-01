import { useState } from 'react'
import XLSX from 'xlsx'

export default function ImportFile() {
	let [selectedFile, setSelectedFile] = useState([])
	const onReadFile = (file) => {
		const promise = new Promise((resolve, reject) => {
			const fileReader = new FileReader()
			fileReader.readAsArrayBuffer(file)

			fileReader.onload = (e) => {
				const bufferArray = e.target.result

				const wb = XLSX.read(bufferArray, { type: 'buffer' })
				const wsname = wb.SheetNames[0]

				const ws = wb.Sheets[wsname]
				const data = XLSX.utils.sheet_to_json(ws)
				resolve(data)
			}
			fileReader.onerror = (err) => {
				reject(err)
			}
		})
		promise.then((data) => {
			console.log(data)
			setSelectedFile(data)
		})
	}
	return (
		<>
			<input type='file' onChange={(e) => onReadFile(e.target.files[0])}></input>
		</>
	)
}
