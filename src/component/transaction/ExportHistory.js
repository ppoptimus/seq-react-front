import { useEffect, useState } from "react"
import systemConfig from "../../config.json"
import axios from "axios"
import Swal from "sweetalert2"
import DatePicker from "react-datepicker"
import "react-datepicker/dist/react-datepicker.css"
import UserDetail from '../../UserDetail'

export default function ExportHistory() {
	const [userDetail] = useState(UserDetail)
	const [showDate] = useState(() => {
		const today = new Date().toLocaleString("en-GB")
		const day = today.substr(0,2)
		const month = today.substr(3,2)
		const year = parseInt(today.substr(6,4)) + 543
		const fullDate = `${day}/${month}/${year}`
		return fullDate
	})
	const [exportHistory, setExportHistory] = useState([])
	const [exportHistoryDetail, setExportHistoryDetail] = useState([])
	const [detailCount, setDetailCount] = useState(0)
	const [isDocumentSet, setIsDocumentSet] = useState(false)
	const [bindData, setBindData] = useState([])
	const [downloadUrl, setDownloadUrl] = useState("")
	const [searchInput, setSearchInput] = useState("")
	const [filteredResults, setFilteredResults] = useState([])

	useEffect(() => {
		const config = {
			method: "post",
			url: `${systemConfig.MasterData.getTitleUrl}getExportHistory`,
			headers: systemConfig.MasterData.headersList,
			data: {
				request_code: null,
				user_name: userDetail.username,
				ip_address: "",
			},
		}
		let isMounted = true
		axios(config)
			.then(function (res) {
				if (isMounted) {
					setExportHistory(res.data)
				}
			})
			.catch(function (error) {
				console.log(error)
			})
		return () => {
			isMounted = false
		}
	}, [userDetail])

	const onInputTextSearch = (i) => {
		setSearchInput(i)
	}
	const onClickSearch = () => {
		if (searchInput !== "") {
			const filteredData = exportHistory.filter((item) => {
				return Object.values(item).join("").toLowerCase().includes(searchInput.toLowerCase())
			})
			setFilteredResults(filteredData)
		} else {
			setFilteredResults(exportHistory)
		}
	}
	const onClickRow = (i) => {
		setIsDocumentSet(i.document_set_no ? true : false)
		setBindData(i)
		setDownloadUrl(`${systemConfig.MasterData.getTitleUrl}download/?request_code=${i.request_code}`)
		generateFile(i.request_code)
	}
	const onHandleChange = (name) => (e) => {
		if (name === "document_set_date") {
			e = formatDate(e)
			setBindData({ ...bindData, [name]: e })
		} else {
			setBindData({ ...bindData, [name]: e.target.value })
		}
	}
	const onClickSaveDocumentSet = () => {
		if (bindData.document_set_no === null) {
			Swal.fire({
				title: "กรุณาใส่เลขที่หนังสือ",
				icon: "warning",
				confirmButtonColor: "#d6810c",
				confirmButtonText: "ตกลง",
			})
		} else if (bindData.document_set_date === null) {
			Swal.fire({
				title: "กรุณาใส่วันที่หนังสือ",
				icon: "warning",
				confirmButtonColor: "#d6810c",
				confirmButtonText: "ตกลง",
			})
		} else {
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
					onSubmited("success")
				})
				.catch(function (err) {
					console.log(err)
					onSubmited("error")
				})
		}
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
				// console.log(res)
			})
			.catch(function (err) {
				console.log(err)
			})
	}
	const getExportHistoryDetail = (e) => {
		const config = {
			method: "post",
			url: `${systemConfig.MasterData.getTitleUrl}getExportHistoryDetail`,
			headers: systemConfig.MasterData.headersList,
			data: {
				request_code: e,
				user_name: userDetail.user_name,
				ip_address: "",
			},
		}
		axios(config)
			.then(function (res) {
				// console.log(res.data)
				setDetailCount(res.data.length)
				setExportHistoryDetail(res.data)
			})
			.catch(function (err) {
				console.log(err)
			})
	}

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
						<input className='form-control-lg col-4 mx-2' onChange={(e) => onInputTextSearch(e.target.value)}></input>
						<button className='btn-lg btn-primary' type='button' onClick={onClickSearch}>ค้นหา</button>
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
							{exportHistory ? (
								//---ถ้าพิมพ์ในช่อง search เกิน 1 digit ให้ map table กับ data เฉพาะที่อยู่ใน filteredResults--//
								searchInput.length > 1 ? (
									filteredResults.map((i) => (
										<tr key={i.request_code}>
											<td className='text-primary'>
												<span
													style={{ cursor: "pointer" }}
													data-toggle='modal'
													data-target='#popupEdit'
													onClick={() => onClickRow(i)}>
													{i.request_code}
												</span>
											</td>
											<td>{i.document_set_no}</td>
											<td>{i.document_set_date}</td>
											<td>{i.export_date}</td>
											<td>
												<button
													className='btn btn-info shadow-sm'
													data-toggle='modal'
													data-target='#historyDetail'
													onClick={() => getExportHistoryDetail(i.request_code)}>
													<i className='fas fa-list'></i>
												</button>
											</td>
										</tr>
								  ))
								): (
									exportHistory.map((i) => (
										<tr key={i.request_code}>
											<td className='text-primary'>
												<span
													style={{ cursor: "pointer" }}
													data-toggle='modal'
													data-target='#popupEdit'
													onClick={() => onClickRow(i)}>
													{i.request_code}
												</span>
											</td>
											<td>{i.document_set_no}</td>
											<td>{i.document_set_date}</td>
											<td>{i.export_date}</td>
											<td>
												<button
													className='btn btn-info shadow-sm'
													data-toggle='modal'
													data-target='#historyDetail'
													onClick={() => getExportHistoryDetail(i.request_code)}>
													<i className='fas fa-list'></i>
												</button>
											</td>
										</tr>
								  ))
								)
							):''}
						</tbody>
					</table>
				</div>
			</div>

			{exportHistory.map((i) => (
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
									<input
										readOnly
										type='text'
										className='form-control form-control-lg col-6'
										value={bindData.export_date ? bindData.export_date.substr(0, 10) : showDate}
									/>
								</div>

								<div className='form-group row justify-content-center align-items-center'>
									<label className='col-form-label col-4 text-right' htmlFor='document_set_no1'>
										เลขที่หนังสือ
									</label>
									<input
										id='document_set_no1'
										name='document_set_no'
										type='text'
										className='form-control form-control-lg col-6'
										value={bindData.document_set_no ? bindData.document_set_no : "รง0625/ว.0"}
										onChange={onHandleChange("document_set_no")}
									/>
								</div>

								<div className='form-group row justify-content-center align-items-center flex-nowrap'>
									<label className='col-form-label col-5 text-right'>วันที่หนังสือ</label>
									<DatePicker
										className='form-control form-control-lg col-7'
										onChange={onHandleChange("document_set_date")}
										dateFormat='dd/MM/yyyy'
										locale='en-GB'
										// placeholderText={showDate}
										value={bindData.document_set_date}
										dropdownMode='select'
										peekNextMonth
									/>
								</div>

								{!isDocumentSet ? (
									<a href={downloadUrl} target='_blank' rel='noreferrer'>
										<button className='btn bg-gradient-white my-2'>
											สามารถดาวน์โหลดไฟล์ได้ที่นี่ {"  "}
											<i className='fas fa-download text-fuchsia' />
										</button>
									</a>
								) : (
									""
								)}
								{isDocumentSet ? (
									<a href={downloadUrl} target='_blank' rel='noreferrer'>
										<button className='btn bg-gradient-white'>
											ทำการส่งออกไฟล์เรียบร้อย สามารถดาวน์โหลดไฟล์ เพื่อส่งธนาคารได้ที่นี่ {"  "}
											<i className='fas fa-download text-fuchsia' />
										</button>
									</a>
								) : (
									""
								)}
							</div>

							<div className='modal-footer'>
								<div className='form-group'>
									<button type='button' className='btn btn-success mr-3 px-4' onClick={onClickSaveDocumentSet}>
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

			{exportHistoryDetail ? (
				<div
					className='modal fade'
					id='historyDetail'
					tabIndex={-1}
					role='dialog'
					aria-labelledby='historyDetailLabal'
					aria-hidden='true'>
					<div className='modal-dialog' style={{ maxWidth: "1350px" }} role='document'>
						<div className='modal-content'>
							<div className='text-secondary modal-header'>จำนวนทั้งหมด {detailCount} รายการ</div>
							<div className='modal-body'>
								<table className='table'>
									<thead className='table-primary'>
										<tr>
											<th>เลขที่บัญชีนายจ้าง</th>
											<th>ประเภทธุรกิจ</th>
											<th>ชื่อ - สกุล</th>
											<th>เลขป.ช.ช./เลขทะเบียนพาณิชย์</th>
											<th>ที่อยู่</th>
											<th>วันเกิด</th>
										</tr>
									</thead>
									<tbody>
										{exportHistoryDetail.map((i) => (
											<tr key={i.request_detail_id}>
												<td>{i.employer_account}</td>
												<td>{i.title_name}</td>
												<td>{i.fullname}</td>
												<td>{i.refference_id}</td>
												<td>{i.address}</td>
												<td>{i.birth_date}</td>
											</tr>
										))}
									</tbody>
								</table>
							</div>
						</div>
					</div>
				</div>
			) : (
				""
			)}
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
	let yyyy = e.getFullYear() + 543
	e = dd + "/" + mm + "/" + yyyy

	return e
}
