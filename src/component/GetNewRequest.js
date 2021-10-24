import React, { useEffect, useState } from "react"
import axios from "axios"
import systemConfig from "../config.json"

export default function GetNewRequest() {
	const [userDetail, setUserDetail] = useState(() => {
		const userData = localStorage.getItem("userDetail")
		if (userData) {
			return JSON.parse(userData)
		} else {
			return null
		}
	})

	const [allNewRequest, setAllNewRequest] = useState([])
	const [newRequestById, setNewRequestById] = useState([])
	const [titleItem, setTitleItems] = useState([])

	useEffect(() => {
		getAllNewRequest(null)
	}, [])

const onGetFormEdit = async (id) => {
	await getNewRequestById(id)
	await getTitle()
	
}

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
								<button className='btn-sm btn-warning' data-toggle='modal' data-target='#popupEdit' onClick={() => onGetFormEdit(i.id)}>
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
			<div
				className='modal fade'
				id='popupEdit'
				data-backdrop='static'
				data-keyboard='false'
				tabIndex={-1}
				aria-labelledby='popupEditLabel'
				aria-hidden='true'>
				<div className='modal-dialog' style={{maxWidth:'750px'}}>
					<div className='modal-content'>
						<div className='modal-header'>
							<h5 className='modal-title' id='popupEditLabel'>
								แก้ไขรายการใหม่
							</h5>
						</div>

						<form className='container justify-content-center align-items-center bg-light p-4'>
							<div className='row mb-4'>
								<div className='col-4'>
									<label className='form-label'>เลขที่หนังสือ</label>
									<input type='text' className='form-control' value={newRequestById.document_no} />
								</div>
								<div className='col-4'>
									<label className='form-label'>วันที่หนังสือ</label>
									<input type='text' className='form-control' value={newRequestById.document_date}/>
								</div>
								<div className='col-4'>
									<label className='form-label'>เลขที่บัญชีนายจ้าง</label>
									<input type='text' className='form-control' value={newRequestById.employer_account}/>
								</div>
							</div>
							<div className='row mb-4'>

								<div className='col-6'>
									<label className='form-label'>ประเภทบุคคล</label>
									<select className='form-control' value={newRequestById.personal_type}>
										<option value={1}>บุคคลธรรมดา</option>
										<option value={2}>นิติบุคคล</option>
									</select>
								</div>
						
								<div className='col-6'>
									<label className='form-label'>คำนำหน้าชื่อ</label>
									<select className='form-control'>
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
								<input type='text' className='form-control' value={newRequestById.first_name} />
							</div>
							<div className='col-6'>
								<label className='form-label'>นามสกุล</label>
								<input type='text' className='form-control' value={newRequestById.last_name} />
							</div>
							</div>

							<div className='row mb-4'>
								<div className='col-6'>
									<label className='form-label'>เลขที่บัตรประชาชน</label>
									<input type='text' className='form-control' value={newRequestById.refference_id} />
								</div>
								<div className='col-6'>
									<label className='form-label'>วัน/เดือน/ปี เกิด</label>
									<input type='text' className='form-control' />
								</div>
							</div>
							<div className='row mb-4'>
							<label className='form-label'>ที่อยู่</label>
									<textarea type='text' className='form-control' value={newRequestById.personal_type} />
							</div>

							<div className='card p-3 mt-3'>
							<div className='icheck-primary d-inline'>
								<input type='checkbox' id='checkboxPrimary2' />
								<label htmlFor='checkboxPrimary2'>ข้อมูลไม่สมบูรณ์</label>
							</div>
							<textarea className='form-control' rows={2} placeholder='หมายเหตุ' value={newRequestById.personal_type}></textarea>
						</div>
						</form>

						<div className='modal-footer'>
							<button type='button' className='btn btn-secondary' data-dismiss='modal'>
								ยกเลิกแก้ไข
							</button>
							<button type='button' className='btn btn-success'>
								ยืนยันแก้ไข
							</button>
						</div>
					</div>
				</div>
			</div>
		</>
	)
}
