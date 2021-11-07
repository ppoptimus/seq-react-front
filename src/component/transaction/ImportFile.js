import { useState } from 'react'
import XLSX from 'xlsx'
import Swal from 'sweetalert2'
import axios from "axios"
import systemConfig from "../../config.json"

export default function ImportFile() {
	const [userDetail] = useState(() => {
		const userData = localStorage.getItem('userDetail')
		if (userData) {
			return JSON.parse(userData)
		} else {
			return null
		}
	})
	const [selectedFile, setSelectedFile] = useState([])
	let [importObject, setimportObject] = useState([])
	let [dataset, setDataset] = useState([])

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
				position: 'center',
				icon: 'success',
				title: 'นำเข้าไฟล์ สำเร็จ',
				showConfirmButton: false,
				timer: 3000,
			})
			console.log(data)
			setSelectedFile(data)
		})
	}

	const onInputTextFile = (e) => {
		try {
			const ext = e.target.files[0].type
			if (!!ext && (ext === 'text/plain' || ext === 'text/csv')) {
				ReadTextFile(e)
			} else {
				refreshPage()
			}
		} catch {
			refreshPage()
		}
	}

	const ReadTextFile = (e) => {
		const reader = new FileReader()
		reader.onload = (e) => {
			const text = e.target.result
			try {
				const arr = text.toString().replace(/\r\n/g, '\n').split('\n')
				setimportObject({
					request_code: arr[0].substr(0, 5),
					document_set: arr[0].substr(5, 20).trim(),
					bank_code: arr[0].substr(185, 3),
					user_name: userDetail.user_name,
					dataset:[{}]
				})

				for (let i = 0; i < arr.length - 1; i++) {
					let document_date = arr[i].substr(25, 10)
					let employee_account = arr[i].substr(35, 10)
					let title_name = arr[i].substr(45, 20)
					let fisrt_name = arr[i].substr(65, 50)
					let last_name = arr[i].substr(115, 50)
					let refference_id = arr[i].substr(165, 20)
					let branch_code = arr[i].substr(188, 4)
					let status_code = arr[i].substr(192, 1)
					let branch_name = arr[i].substr(193, 50)
					let account_type_code = arr[i].substr(243, 3)
					let account_no = arr[i].substr(245, 20)
					let account_name = arr[i].substr(265, 100)
					let balance = arr[i].substr(366, 17)
					let investigate_date = arr[i].substr(383, 30)
					let remark = arr[i].substr(413, 50)


					dataset.push({
						document_date: document_date,
						employee_account: employee_account,
						title_name: title_name.trim(),
						fisrt_name: fisrt_name.trim(),
						last_name: last_name.trim(),
						refference_id: refference_id.trim(),
						branch_code: branch_code,
						status_code: status_code,
						branch_name: branch_name.trim(),
						account_type_code: account_type_code,
						account_no: account_no,
						account_name: account_name.trim(),
						balance: balance,
						investigate_date: investigate_date,
						remark: remark.trim(),
					})
					
				}
			} catch (err) {
				console.log(err)
				Swal.fire({
					title: 'นำเข้าไฟล์ไม่สำเร็จ!!',
					text: err,
					icon: 'error',
					confirmButtonColor: '#d33',
					confirmButtonText: 'ตกลง',
				}).then((result) => {
					if (result.isConfirmed) {
						refreshPage()
					}
				})
			} finally {}
		}
		reader.readAsText(e.target.files[0], 'TIS-620')
	}
	const test = () => {
		importObject.dataset.push({...dataset})
		console.log(dataset)
		// const config = {
		// 	method: "post",
		// 	url: `${systemConfig.MasterData.getTitleUrl}importbank`,
		// 	headers: systemConfig.MasterData.headersList,
		// 	data: importObject,
		// }

		// axios(config)
		// 	.then(function (res) {
		// 		console.log(res)
				
		// 	})
		// 	.catch(function (err) {
		// 		console.log(err)
		// 	})
	}
	return (
		<>
			<div className='row flex justify-content-around'>
				<div className='custom-file col-5'>
					<input
						type='file'
						className='custom-file-input'
						id='exampleInputFile'
						accept='.csv, application/vnd.openxmlformats-officedocument.spreadsheetml.sheet, application/vnd.ms-excel'
						onChange={(e) => onReadExcelFile(e.target.files[0])}
					/>
					<label className='custom-file-label' htmlFor='exampleInputFile'>
						อัพโหลด Excel
					</label>
				</div>
				<div className='custom-file col-5'>
					<input type='file' className='custom-file-input' id='exampleInputFile' accept='.csv, .txt, text/plain' onChange={(e) => onInputTextFile(e)} />
					<label className='custom-file-label' htmlFor='exampleInputFile'>
						อัพโหลด Text File
					</label>
				</div>
			</div>
			<button onClick={test}>test</button>
		</>
	)
}
const refreshPage = () => {
	window.location.reload(false)
}
