import { useState } from "react"
import XLSX from "xlsx"
import Swal from "sweetalert2"

export default function ImportFile() {
	let [selectedFile, setSelectedFile] = useState([])
	let textObject = {
		request_code: "",
		bank_code: "",
		document_set: "",
		ip_address: "",
		user_name: "",
		dataset: [
			{
				document_date: "",
				employer_account: "",
				title_name: "",
				first_name: "",
				last_name: "",
				refference_id: "",
				branch_code: "",
				status_code: "",
				branch_name: "",
				account_type_code: "",
				account_no: "",
				account_name: "",
				balance: "",
				investigate_date: "",
				remark: "",
			},
		],
	}
	const onReadExcelFile = (file) => {
		const promise = new Promise((resolve, reject) => {
			const fileReader = new FileReader()
			fileReader.readAsArrayBuffer(file)

			fileReader.onload = (e) => {
				const bufferArray = e.target.result

				const wb = XLSX.read(bufferArray, { type: "buffer" })
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
			const arr = text.toString().replace(/\r\n/g, "\n").split("\n")
			for (let row of arr) {
				let request_code = row.substr(0, 5)
				let document_set_no = row.substr(5, 20)
				let document_date = row.substr(25, 10)
				let employee_account = row.substr(35, 10)
				let title_name = row.substr(45, 20)
				let fisrt_name = row.substr(65, 50)
				let last_name = row.substr(115, 50)
				let refference_id = row.substr(165, 20)
				let bank_code = row.substr(185, 3)
				let branch_code = row.substr(188, 4)
				let status_code = row.substr(192, 1)
				let branch_name = row.substr(193, 50)
				let account_type_code = row.substr(243, 2)
				let account_no = row.substr(245, 20)
				let account_name = row.substr(265, 100)
				let balance = row.substr(366, 17)
				let investigate_date = row.substr(383, 30)
				let remark = row.substr(413, 50)
				textObject.dataset.push(...{title_name:title_name})

				console.log(textObject)
			}
		}
		reader.readAsText(e.target.files[0], "TIS-620")
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
