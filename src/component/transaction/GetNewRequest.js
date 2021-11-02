import React, { useEffect, useState } from "react"
import axios from "axios"
import Swal from "sweetalert2"
import systemConfig from "../../config.json"

export default function GetNewRequest() {
	const [isAdmin, setIsAdmin] = useState(null)
	const [isReadOnly, setIsReadOnly] = useState("")
	const [userDetail] = useState(() => {
		const userData = localStorage.getItem("userDetail")
		if (userData) {
			setIsAdmin(JSON.parse(userData).userlevel_id === "3" ? false : true)
			return JSON.parse(userData)
		} else {
			return null
		}
	})

	useEffect(() => {
		const getAllNewRequest = () => {
			let reqOptions = {
				url: `${systemConfig.MasterData.getTitleUrl}getNewRequest`,
				method: "POST",
				headers: systemConfig.MasterData.headersList,
				data: {
					request_detail_id: null,
					department_code: userDetail.userlevel_id === "3" ? userDetail.department_code : null,
					user_name: userDetail.username,
					ip_address: "",
				},
			}
	
			axios
				.request(reqOptions)
				.then((res) => {
					setAllNewRequest(res.data)
				})
				.catch((err) => {
					console.log(err)
				})
		}
		getAllNewRequest()
		setIsReadOnly(isAdmin ? "disabled" : "")
	}, [isAdmin, isReadOnly, userDetail])

	const [isReject, setIsReject] = useState(false)
	const [titleItem, setTitleItems] = useState([])
	const [allNewRequest, setAllNewRequest] = useState([])
	const [newRequestById, setNewRequestById] = useState([])
	const [submitEditData, setSubmitEditData] = useState({
		request_detail_id: null,
		document_no: null,
		document_date: null,
		employer_account: null,
		refference_id: null,
		title_code: null,
		first_name: null,
		last_name: null,
		company_name: null,
		birth_date: null,
		address: null,
		status_id: null,
		remark: null,
		user_name: userDetail.username,
	})

	const onGetFormEdit = async (id) => {
		await getNewRequestById(id)
		await getTitle()
	}

	const getNewRequestById = (id) => {
		let reqOptions = {
			url: `${systemConfig.MasterData.getTitleUrl}getNewRequest`,
			method: "POST",
			headers: systemConfig.MasterData.headersList,
			data: {
				request_detail_id: id,
				department_code: userDetail.userlevel_id === "3" ? userDetail.department_code : null,
				user_name: userDetail.username,
				ip_address: "",
			},
		}

		axios
			.request(reqOptions)
			.then((res) => {
				setNewRequestById(res.data[0])
				submitEditData.request_detail_id = id
				submitEditData.document_no = res.data[0].document_no
				submitEditData.document_date = res.data[0].document_date
				submitEditData.employer_account = res.data[0].employer_account
				submitEditData.refference_id = res.data[0].refference_id
				submitEditData.title_code = res.data[0].title_code
				submitEditData.first_name = res.data[0].first_name
				submitEditData.last_name = res.data[0].last_name
				submitEditData.company_name = res.data[0].company_name
				submitEditData.birth_date = res.data[0].birth_date
				submitEditData.address = res.data[0].address
				submitEditData.status_id = res.data[0].status_id
				submitEditData.remark = res.data[0].remark
				setIsReject(res.data[0].status_id === 4 ? true : false)
			})
			.catch((err) => {
				console.log(err)
			})
			
	}

	const getTitle = () => {
		const config = {
			method: "get",
			url: `${systemConfig.MasterData.getTitleUrl}getTitle/?type=1`,
			headers: systemConfig.MasterData.headersList,
		}

		axios(config)
			.then(function (response) {
				setTitleItems(response.data)
			})
			.catch(function (error) {
				console.log(error)
			})
	}

	const handleChange = (name) => (e) => {
		setNewRequestById({ ...newRequestById, [name]: e.target.value })
		setSubmitEditData({ ...submitEditData, [name]: e.target.value })
	}
	const onCheckboxChange = (e) => {
		setIsReject(e.target.checked)
	}
	const onSubmitEdit = () => {
		if (userDetail.userlevel_id === "3") {
			editByUser()
		} else {
			editByAdmin()
		}
	}

	const editByUser = () => {
		const config = {
			method: "post",
			url: `${systemConfig.MasterData.getTitleUrl}editNewRequest`,
			headers: systemConfig.MasterData.headersList,
			data: submitEditData,
		}
		axios(config)
			.then(function (response) {
				console.log(response.data)
				Swal.fire({
					title: "แก้ไขข้อมูลสำเร็จ",
					icon: "success",
					confirmButtonColor: "#119516",
					confirmButtonText: "ตกลง",
				}).then((result) => {
					if (result.isConfirmed) {
						refreshPage()
					}
				})
				
			})
			.catch(function (error) {
				console.log(error)
				Swal.fire({
					icon: 'error',
					title: 'ผลการบันทึก',
					text: "บันทึกไม่สำเร็จ \n" + error,
				})
			})
	}

	const editByAdmin = () => {
		const config = {
			method: "post",
			url: `${systemConfig.MasterData.getTitleUrl}changeRequestStatus`,
			headers: systemConfig.MasterData.headersList,
			data: {
				new_request_id: submitEditData.request_detail_id,
				status_id: 4,
				remark: submitEditData.remark,
				user_name: userDetail.username,
				ip_address: "",
			},
		}
		axios(config)
			.then(function (response) {
				console.log(response.data)
				Swal.fire({
					title: "แก้ไขข้อมูลสำเร็จ",
					icon: "success",
					confirmButtonColor: "#119516",
					confirmButtonText: "ตกลง",
				}).then((result) => {
					if (result.isConfirmed) {
						refreshPage()
					}
				})
			})
			.catch(function (error) {
				console.log(error)
				Swal.fire({
					icon: 'error',
					title: 'ผลการบันทึก',
					text: "บันทึกไม่สำเร็จ \n" + error,
				})
			})
	}

	return (
		<>
			<table className='table table-hover'>
				<thead className='bg-purple'>
					<tr>
						<th scope='col'></th>
						<th scope='col'>เลขหนังสือ</th>
						<th scope='col'>วันที่หนังสือ</th>
						<th scope='col'>เลขนายจ้าง</th>
						<th scope='col'>ประเภทธุรกิจ</th>
						<th scope='col'>ชื่อ - สกุล</th>
						<th scope='col'>เลขป.ช.ช / เลขทะเบียนพาณิชย์</th>
						<th scope='col'>วันเกิด</th>
						<th scope='col'>ที่อยู่</th>
						<th scope='col'>วันที่บันทึก</th>
						<th scope='col'>สังกัด</th>
					</tr>
				</thead>
				<tbody>
					{allNewRequest.map((i) => (
						<tr key={i.id}>
							<td>
								<button className='btn btn-warning shadow-sm' data-toggle='modal' data-target='#popupEdit' onClick={() => onGetFormEdit(i.id)}>
									<i className='fas fa-edit'></i>
								</button>
							</td>
							<td>{i.document_no}</td>
							<td>{i.document_date}</td>
							<td>{i.employer_account}</td>
							<td>{i.title_name}</td>
							<td>
								{i.first_name} {i.last_name}
								{i.company_name}
							</td>
							<td>{i.refference_id}</td>
							<td>{i.birth_date}</td>
							<td>{i.address}</td>
							<td>{i.create_date}</td>
							<td>{i.department_name}</td>
						</tr>
					))}
				</tbody>
			</table>

			{!!newRequestById ? (
				<div
					className='modal fade'
					id='popupEdit'
					data-backdrop='static'
					data-keyboard='false'
					tabIndex={-1}
					aria-labelledby='popupEditLabel'
					aria-hidden='true'>
					<div className='modal-dialog' style={{ maxWidth: "750px" }}>
						<div className='modal-content'>
							<div className='modal-header'>
								<h5 className='modal-title' id='popupEditLabel'>
									แก้ไขรายการใหม่
								</h5>
							</div>

							<form className='justify-content-center align-items-center bg-light p-4 disabled'>
								<fieldset disabled={isReadOnly}>
									<div className='row mb-4'>
										<div className='col-4'>
											<label className='form-label'>เลขที่หนังสือ</label>
											<input type='text' className='form-control' value={newRequestById.document_no} onChange={handleChange("document_no")} />
										</div>
										<div className='col-4'>
											<label className='form-label'>วันที่หนังสือ</label>
											<input type='text' className='form-control' value={newRequestById.document_date} onChange={handleChange("document_date")} />
										</div>
										<div className='col-4'>
											<label className='form-label'>เลขที่บัญชีนายจ้าง</label>
											<input
												type='text'
												className='form-control'
												value={newRequestById.employer_account}
												onChange={handleChange("employer_account")}
											/>
										</div>
									</div>
									<div className='row mb-4'>
										<div className='col-6'>
											<label className='form-label'>ประเภทบุคคล</label>
											<select className='form-control' disabled>
												<option>{newRequestById.personal_type_name}</option>
											</select>
										</div>

										<div className='col-6'>
											<label className='form-label'>คำนำหน้าชื่อ</label>
											<select className='form-control' onChange={handleChange("title_code")}>
												<option>{newRequestById.title_name}</option>
												{titleItem.map((item) => (
													<option key={item.title_code} value={item.title_code}>
														{item.title_name}
													</option>
												))}
											</select>
										</div>
									</div>
									<div className='row mb-4'>
										<div className='col-6'>
											<label className='form-label'>ชื่อ</label>
											<input type='text' className='form-control' value={newRequestById.first_name} onChange={handleChange("first_name")} />
										</div>
										<div className='col-6'>
											<label className='form-label'>นามสกุล</label>
											<input type='text' className='form-control' value={newRequestById.last_name} onChange={handleChange("last_name")} />
										</div>
									</div>

									<div className='row mb-4'>
										<div className='col-6'>
											<label className='form-label'>เลขที่บัตรประชาชน</label>
											<input type='text' className='form-control' value={newRequestById.refference_id} onChange={handleChange("refference_id")} />
										</div>
										<div className='col-6'>
											<label className='form-label'>วัน/เดือน/ปี เกิด</label>
											<input type='text' className='form-control' value={newRequestById.birth_date} onChange={handleChange("birth_date")} />
										</div>
									</div>
									<div className='row mb-4'>
										<label className='form-label'>ที่อยู่</label>
										<textarea type='text' className='form-control' value={newRequestById.address} onChange={handleChange("address")} />
									</div>
								</fieldset>
							</form>
							<div className='card p-3 mt-3'>
								<div className='icheck-primary d-inline'>
									<input type='checkbox' id='checkForReject' onChange={onCheckboxChange} checked={isReject} />
									<label htmlFor='checkForReject'>ข้อมูลไม่สมบูรณ์</label>
								</div>
								<textarea
									type='text'
									className='form-control'
									placeholder='หมายเหตุ'
									value={newRequestById.remark}
									onChange={handleChange("remark")}
								/>
							</div>

							<div className='modal-footer'>
								<button type='button' className='btn btn-secondary' data-dismiss='modal'>
									ยกเลิกแก้ไข
								</button>
								<button type='button' className='btn btn-success' onClick={onSubmitEdit}>
									ยืนยันแก้ไข
								</button>
							</div>
						</div>
					</div>
				</div>
			) : (
				<p className='btn-shine'>Loading...</p>
			)}
		</>
	)
}

function refreshPage() {
	window.location.reload(false)
}
