import { useState } from "react"
import XLSX from "xlsx"
import Swal from "sweetalert2"
import axios from "axios"
import systemConfig from "../../config.json"
import UserDetail from "../../UserDetail"

export default function ImportFile() {
	const [userDetail] = useState(UserDetail)
	const [selectedFile, setSelectedFile] = useState([])
	let [importObject, setimportObject] = useState([])
	let [dataset] = useState([])

	const onSelectFile = (file) => {
		if (file.target.files[0].type === "text/plain" || file.target.files[0].type === "text/csv") {
			ReadTextFile(file)
		} else if (
			file.target.files[0].type === "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet" ||
			file.target.files[0].type === "application/vnd.ms-excel"
		) {
			onReadExcelFile(file.target.files[0])
		} else {
			console.log("err")
		}
	}
	const onReadExcelFile = (file) => {
		const promise = new Promise((resolve, reject) => {
			const fileReader = new FileReader()
			fileReader.readAsArrayBuffer(file)

			fileReader.onload = (e) => {
				const bufferArray = e.target.result
				const wb = XLSX.read(bufferArray, { type: "binary" })
				const wsname = wb.SheetNames[0]
				const ws = wb.Sheets[wsname]
				try {
					if (ws.A1.w.length > 5) {
						let range = XLSX.utils.decode_range(ws["!ref"])
						range.s.r = 1
						ws["!ref"] = XLSX.utils.encode_range(range)
					}

					const data = XLSX.utils.sheet_to_json(ws, {
						header: [
							"request_code",
							"document_set_no",
							"document_date",
							"employer_account",
							"title_name",
							"first_name",
							"last_name",
							"refference_id",
							"bank_code",
							"branch_code",
							"status_code",
							"branch_name",
							"account_type_code",
							"account_no",
							"account_name",
							"rating",
							"balance",
							"investigate_date",
							"remark",
						],
					})

					setimportObject({
						request_code: ws.A2.w,
						document_set: ws.B2.w.trim(),
						bank_code: ws.I2.w,
						user_name: userDetail.username,
					})

					for (const item of data) {
						dataset.push({
							document_date: item.document_date,
							employer_account: item.employer_account.toString(),
							title_name: item.title_name ? item.title_name.trim() : null,
							first_name: item.first_name ? item.first_name.trim() : null,
							last_name: item.last_name ? item.last_name.trim() : null,
							refference_id: item.refference_id === undefined ? null : item.refference_id.toString().trim(),
							branch_code: item.branch_code ? item.branch_code : null,
							status_code: item.status_code,
							branch_name: item.branch_name === undefined ? null : item.branch_name.toString().trim(),
							account_type_code: item.account_type_code === undefined ? null : item.account_type_code,
							account_no: item.account_no === undefined ? null : item.account_no.toString().trim(),
							account_name: item.account_name === undefined ? null : item.account_name.toString().trim(),
							balance: item.balance === undefined ? null : item.balance,
							investigate_date: ws.R2.w,
							remark: item.remark === undefined ? null : item.remark.toString().trim(),
						})
					}
					resolve(data)
				} catch (err) {
					console.log(err)
				}
			}
			fileReader.onerror = (err) => {
				reject(err)
			}
		})
		promise.then(() => {})
	}

	const ReadTextFile = (e) => {
		const reader = new FileReader()
		reader.onload = (e) => {
			const text = e.target.result
			try {
				const arr = text.toString().replace(/\r\n/g, "\n").split("\n")
				// console.log(["1", "2", "3", "4"].includes(arr[0].substr(192, 1)))

				setimportObject({
					request_code: arr[0].substr(0, 5),
					document_set: arr[0].substr(5, 20).trim(),
					bank_code: arr[0].substr(185, 3),
					user_name: userDetail.username,
				})
			console.log(arr[0].substr(185, 3))
				for (let i = 0; i < arr.length - 1; i++) {
					let document_date = arr[i].substr(25, 10)
					let employer_account = arr[i].substr(35, 10)
					let title_name = arr[i].substr(45, 20).trim()
					let first_name = arr[i].substr(65, 50).trim()
					let last_name = arr[i].substr(115, 50).trim()
					let refference_id = arr[i].substr(165, 20)

					let branch_code = (!arr[0].substr(185, 3)==='006') ? arr[i].substr(188, 4) : arr[i].substr(188, 6).trim()
					let status_code = (!arr[0].substr(185, 3)==='006') ? arr[i].substr(192, 1) : arr[i].substr(194, 1)
					let branch_name = (!arr[0].substr(185, 3)==='006') ? arr[i].substr(193, 50) : arr[i].substr(195, 50).trim()
					let account_type_code = (!arr[0].substr(185, 3)==='006') ? arr[i].substr(243, 2) : arr[i].substr(245, 2).trim()
					let account_no = (!arr[0].substr(185, 3)==='006') ? arr[i].substr(245, 20) : arr[i].substr(247, 20).trim()
					let account_name = (!arr[0].substr(185, 3)==='006') ? arr[i].substr(265, 100) : arr[i].substr(267, 100).trim()
					let balance = (!arr[0].substr(185, 3)==='006') ? arr[i].substr(366, 17) : arr[i].substr(368, 17).trim()
					let investigate_date = (!arr[0].substr(185, 3)==='006') ? arr[i].substr(382, 30) : arr[i].substr(384, 30).trim()
					let remark = (!arr[0].substr(185, 3)==='006') ? arr[i].substr(413, 50) : arr[i].substr(415, 50).trim()

					dataset.push({
						document_date: document_date,
						employer_account: employer_account,
						title_name: title_name.trim(),
						first_name: first_name.trim(),
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
					title: "นำเข้าไฟล์ไม่สำเร็จ!!",
					text: err,
					icon: "error",
					confirmButtonColor: "#d33",
					confirmButtonText: "ตกลง",
				}).then((result) => {
					if (result.isConfirmed) {
						refreshPage()
					}
				})
			}
		}
		reader.readAsText(e.target.files[0], "TIS-620")
	}

	const onUpload = () => {
		console.log(dataset)
		const result = { dataset, ...importObject }
		const config = {
			method: "post",
			url: `${systemConfig.MasterData.getTitleUrl}importbank`,
			headers: systemConfig.MasterData.headersList,
			data: result,
		}
		axios(config)
			.then(function (res) {
				if (res.status === 208) {
					onSubmited(208)
				} else {
					onSubmited(200)
				}
			})
			.catch(function (err) {
				console.log(err)
				onSubmited(err)
			})
	}
	return (
		<>
			<div className='row flex justify-content-around'>
				<div className='custom-file col-5'>
					<input
						type='file'
						className='custom-file-input'
						id='exampleInputFile'
						accept='.csv, application/vnd.openxmlformats-officedocument.spreadsheetml.sheet, application/vnd.ms-excel, .txt, text/plain'
						onChange={(e) => onSelectFile(e)}
					/>
					<label className='custom-file-label' htmlFor='exampleInputFile'>
						ไฟล์ข้อมูลจากธนาคาร
					</label>
				</div>
				<div className='custom-file col-5'>
					<input
						type='file'
						className='custom-file-input'
						id='exampleInputFile'
						accept='.csv, .txt, text/plain'
						onChange={(e) => onSelectFile(e)}
					/>
					<label className='custom-file-label' htmlFor='exampleInputFile'>
						อัพโหลดไฟล์แนบ
					</label>
				</div>
			</div>
			<hr />
			<div className='container text-center m-3'>
				<button className='btn-lg btn-primary' onClick={onUpload}>
					นำเข้าไฟล์
				</button>
			</div>
		</>
	)
}
const onSubmited = (param) => {
	console.log(param)
	if (param === 200) {
		Swal.fire({
			title: "นำเข้าข้อมูลสำเร็จ",
			icon: "success",
			confirmButtonColor: "#119516",
			confirmButtonText: "ตกลง",
		}).then((result) => {
			if (result.isConfirmed) {
				refreshPage()
			}
		})
	} else if (param === 208) {
		Swal.fire({
			title: "นำเข้าข้อมูล ไม่สำเร็จ!!",
			text: "เลขชุดหนังสือนี้มีการนำเข้าข้อมูลไปแล้ว",
			icon: "warning",
			confirmButtonColor: "#9c1e1e",
			confirmButtonText: "ตกลง",
		}).then((result) => {
			if (result.isConfirmed) {
				refreshPage()
			}
		})
	} else {
		Swal.fire({
			title: "นำเข้าข้อมูล ไม่สำเร็จ!!",
			text: param,
			icon: "error",
			confirmButtonColor: "#9c1e1e",
			confirmButtonText: "ตกลง",
		}).then((result) => {
			if (result.isConfirmed) {
				refreshPage()
			}
		})
	}
}
const refreshPage = () => {
	window.location.reload(false)
}
