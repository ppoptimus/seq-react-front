import { useState } from 'react'
import XLSX from 'xlsx'
import Swal from "sweetalert2"

export default function ImportFile() {
	let [selectedFile, setSelectedFile] = useState([])

	const onReadExcelFile = (file) => {
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
			Swal.fire({
				title: "สร้างเลขชุดหนังสือสำเร็จ",
				icon: "success",
				confirmButtonColor: "#119516",
				confirmButtonText: "ตกลง",
			}).then((result) => {
				if (result.isConfirmed) {
					
				}
			})
			console.log(data)
			setSelectedFile(data)
		})
	}

	const onReadTextFile = (e) => {
		const reader = new FileReader()
		reader.onload = (e) => {
			const text = e.target.result
			const arr = text.toString().replace(/\r\n/g,'\n').split('\n');
			for(let row of arr) {
				console.log(row);
			}

		}
		reader.readAsText(e.target.files[0])
	}
	return (
		<>
			<div className='row flex justify-content-around'>
				<div className='custom-file col-5'>
					<input type='file' className='custom-file-input' id='exampleInputFile' onChange={(e) => onReadExcelFile(e.target.files[0])} />
					<label className='custom-file-label' htmlFor='exampleInputFile'>
						อัพโหลด Excel
					</label>
				</div>
				<div className='custom-file col-5'>
					<input type='file' className='custom-file-input' id='exampleInputFile' onChange={(e) => onReadTextFile(e)} />
					<label className='custom-file-label' htmlFor='exampleInputFile'>
						อัพโหลด Text File
					</label>
				</div>
			</div>
		</>
	)
}
