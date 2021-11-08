import { useEffect, useState } from "react"
import systemConfig from "../../config.json"
import axios from "axios"
import Swal from "sweetalert2"
import DatePicker from "react-datepicker"
import "react-datepicker/dist/react-datepicker.css"

export default function ExportHistory() {
	const [userDetail] = useState(() => {
		const userData = localStorage.getItem("userDetail")
		if (userData) {
			return JSON.parse(userData)
		} else {
			return null
		}
	})
	const [showDate, setShowDate] = useState(() => {
		const today = new Date().toLocaleString("en-GB")
		return today.substr(0, 10)
	})
	const months = [
		"มกราคม",
		"กุมภาพันธ์",
		"มีนาคม",
		"เมษายน",
		"พฤษภาคม",
		"มิถุนายน",
		"กรกฎาคม",
		"สิงหาคม",
		"กันยายน",
		"ตุลาคม",
		"พฤศจิกายน",
		"ธันวาคม",
	]
	const [data, setData] = useState([])
	const [isDocumentSet, setIsDocumentSet] = useState(false)
	const [bindData, setBindData] = useState([])
	const [downloadUrl, setDownloadUrl] = useState("")

	useEffect(() => {
		const config = {
			method: "post",
			url: `${systemConfig.MasterData.getTitleUrl}getExporttHistory`,
			headers: systemConfig.MasterData.headersList,
			data: {
				request_code: null,
				user_name: userDetail.username,
				ip_address: "",
			},
		}
		let isMounted = true
		axios(config)
			.then(function (response) {
				if (isMounted) {
					setData(response.data)
				}
			})
			.catch(function (error) {
				console.log(error)
			})
		return () => {
			isMounted = false
		}
	}, [userDetail])

	const onClickRow = (i) => {
		setIsDocumentSet(i.document_set_no ? true : false)
		setBindData(i)
		setDownloadUrl(`${systemConfig.MasterData.getTitleUrl}download/?request_code=${i.request_code}`)
		// generateFile(i.request_code)
	}
	const onHandleChange = (name) => (e) => {
		if (name === "document_set_date") {
			e = formatDate(e)
			setBindData({ ...bindData, [name]: e })
		} else {
			setBindData({ ...bindData, [name]: e.target.value })
		}
	}

	const onSaveDocumentSet = () => {
		const config = {
			method: "post",
			url: `${systemConfig.MasterData.getTitleUrl}saveDocumentSet`,
			headers: systemConfig.MasterData.headersList,
			data: {
				request_code: bindData.request_code,
				document_set_no: bindData.document_set_no,
				document_set_date: bindData.document_set_date,
				user_name: userDetail.user_name,
			},
		}
		axios(config)
			.then(function (res) {
				console.log(res)
				onSubmited("success")
			})
			.catch(function (err) {
				console.log(err)
				onSubmited("error")
			})
	}

	const generateFile = (request_code) => {
		const config = {
			method: "post",
			url: `${systemConfig.MasterData.getTitleUrl}getDataToExport`,
			headers: systemConfig.MasterData.headersList,
			data: {
				request_code: request_code,
				document_set_no: null,
				user_name: userDetail.user_name,
				ip_address: "",
			},
		}
		axios(config)
			.then(function (res) {
				console.log(res)
			})
			.catch(function (err) {
				console.log(err)
			})
	}

	console.log("doc= " + bindData.document_set_no, " date= " + bindData.document_set_date)
	return (
		<>
			<div className='card'>
				<div className='card-header bg-purple'>
					<h3 className='card-title'>ประวัติการส่งออกไฟล์เพื่อขอตรวจสอบบัญชีเงินฝาก</h3>
					<div className='card-tools'>
						<button
							type='button'
							className='btn btn-tool'
							data-card-widget='card-refresh'
							data-source='widgets.html'
							data-source-selector='#card-refresh-content'>
							<i className='fas fa-sync-alt' />
						</button>
					</div>
				</div>
				<div className='card-body flex-column text-center'>
					<div className='form-group text-center align-item-center'>
						<label className='col-form-label col2'>ชุดหนังสือ</label>
						<input className='form-control-lg col-4 mx-2'></input>
						<button className='btn-lg btn-primary'>ค้นหา</button>
					</div>
				</div>
			</div>

			<div className='card'>
				<div className='card-body'>
					<table className='table'>
						<thead>
							<tr>
								<th>เลขที่ชุด</th>
								<th>เลขที่หนังสือ</th>
								<th>วันที่หนังสือ</th>
								<th>วันเวลาที่ส่งออก</th>
								<th>รายการ</th>
							</tr>
						</thead>
						<tbody>
							{data
								? data.map((i) => (
										<tr key={i.request_code}>
											<td className='text-primary'>
												<span style={{ cursor: "pointer" }} data-toggle='modal' data-target='#popupEdit' onClick={() => onClickRow(i)}>
													{i.request_code}
												</span>
											</td>
											<td>{i.document_set_no}</td>
											<td>{i.document_set_date}</td>
											<td>{i.export_date}</td>
											<td>
												<button className='btn btn-info shadow-sm'>
													<i className='fas fa-list'></i>
												</button>
											</td>
										</tr>
								  ))
								: ""}
						</tbody>
					</table>
				</div>
			</div>
			{data.map((i) => (
				<div
					className='modal fade shadow-lg'
					id='popupEdit'
					data-backdrop='static'
					data-keyboard='false'
					tabIndex={-1}
					aria-labelledby='popupEditLabel'
					aria-hidden='true'
					key={i.request_code}>
					<div className='modal-dialog w-auto' style={{ maxWidth: "570px" }}>
						<div className='modal-content'>
							<h4 className='modal-header'>แก้ไขข้อมูล</h4>
							<div className='modal-body pt-5'>
								<div className='form-group row justify-content-center align-items-center'>
									<label className='col-form-label col-4 text-right'>ชุดหนังสือ</label>
									<input
										readOnly
										type='text'
										className='form-control form-control-lg col-6'
										value={bindData.request_code ? bindData.request_code : ""}
									/>
								</div>
								<div className='form-group row justify-content-center align-items-center'>
									<label className='col-form-label col-4 text-right'>วันที่ประมวลผล</label>
									<input readOnly type='text' className='form-control form-control-lg col-6' value={showDate} />
								</div>
								<div className='form-group row justify-content-center align-items-center'>
									<label className='col-form-label col-4 text-right' htmlFor='document_set_no'>
										เลขที่หนังสือ
									</label>
									<input
										id='document_set_no'
										name='document_set_no'
										type='text'
										className='form-control form-control-lg col-6'
										defaultValue='รง0625/ว.0'
										onChange={onHandleChange("document_set_no")}
									/>
								</div>
								<div className='form-group row justify-content-center align-items-center flex-nowrap'>
									<label className='col-form-label col-5 text-right'>วันที่หนังสือ</label>
									{/* <input type='date' className='form-control form-control-lg col-6' onChange={onHandleChange("document_set_date")} /> */}

									<DatePicker
										className='form-control form-control-lg col-7'
										onChange={onHandleChange("document_set_date")}
										dateFormat='dd/MM/yyyy'
										locale='en-GB'
										placeholderText={showDate}
										value={bindData.document_set_date}
										dropdownMode='select'
										peekNextMonth
									/>
								</div>

								<a href={downloadUrl} target='_blank' rel='noreferrer'>
									<button className='btn bg-gradient-white my-2'>
										สามารถดาวน์โหลดไฟล์ได้ที่นี่ {"  "}
										<i className='fas fa-download text-fuchsia' />
									</button>
								</a>
								{isDocumentSet ? (
									<button className='btn bg-gradient-white'>
										ทำการส่งออกไฟล์เรียบร้อย สามารถดาวน์โหลดไฟล์ เพื่อส่งธนาคารได้ที่นี่ {"  "}
										<i className='fas fa-download text-fuchsia' />
									</button>
								) : (
									""
								)}
							</div>

							<div className='modal-footer'>
								<div className='form-group'>
									<button type='button' className='btn btn-success mr-3 px-4' onClick={onSaveDocumentSet}>
										บันทึก
									</button>
									<button type='button' className='btn btn-secondary' data-dismiss='modal'>
										ย้อนกลับ
									</button>
								</div>
							</div>
						</div>
					</div>
				</div>
			))}
		</>
	)
}

const onSubmited = (result) => {
	if (result === "success") {
		Swal.fire({
			title: "บันทึกสำเร็จ",
			icon: "success",
			confirmButtonColor: "#119516",
			confirmButtonText: "ตกลง",
		}).then((result) => {
			if (result.isConfirmed) {
				refreshPage()
			}
		})
	} else {
		Swal.fire({
			title: "บันทึก ไม่สำเร็จ!!",
			text: result,
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

const formatDate = (e) => {
	e = new Date(e)
	let dd = String(e.getDate()).padStart(2, "0")
	let mm = String(e.getMonth() + 1).padStart(2, "0")
	let yyyy = e.getFullYear()
	e = dd + "/" + mm + "/" + yyyy

	return e
}
