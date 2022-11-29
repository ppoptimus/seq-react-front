import React from 'react'
import { useEffect, useState } from "react"
import systemConfig from "../../config.json"
import axios from "axios"

export default function SeachData() {
	const [dataCriteria, setDataCriteria] = useState(() => {
		const data = {
			request_code: null,
			employer_account: null,
			refference_id: null,
			employer_name: null,
			personal_type: null,
			department_code: null,
		}
		return data
	})
	const [dataResult, setDataResult] = useState([])
	const [dataResultDetail, setDataResultDetail] = useState([])
	const [department, setDepartment] = useState([])
	const [dataStatus] = useState([1, 2, 4, 5])

	useEffect(() => {
		const config = {
			method: "get",
			url: `${systemConfig.MasterData.getTitleUrl}getMasterDepartment`,
			headers: systemConfig.MasterData.headersList,
		}
		let isMounted = true
		axios(config)
			.then(function (res) {
				if (isMounted) {
					setDepartment(res.data)
				}
			})
			.catch(function (error) {
				console.log(error)
			})
		return () => {
			isMounted = false
		}
	}, [])

	const handleInputChange = (name) => (e) => {
		console.log(name, "---", e.target.value)
		setDataCriteria({ ...dataCriteria, [name]: e.target.value })
	}

	const onCheckBoxChange = (name) => (e) => {
		if (e.target.checked === true) {
			dataStatus.push(parseInt(name))
		}
		if (e.target.checked === false) {
			removeArr(dataStatus, parseInt(name))
		}
	}

	const onSubmitSearch = () => {
		const config = {
			method: "post",
			url: `${systemConfig.MasterData.getTitleUrl}searchRequest`,
			headers: systemConfig.MasterData.headersList,
			data: {
				request_code: dataCriteria.request_code,
				employer_account: dataCriteria.employer_account,
				refference_id: dataCriteria.refference_id,
				employer_name: dataCriteria.employer_name,
				personal_type: dataCriteria.personal_type,
				department_code: dataCriteria.department_code,
				request_status: null,
			},
		}
		axios(config)
			.then(function (response) {
				setDataResult(filterArr(response.data, dataStatus))
			})
			.catch(function (error) {
				console.log(error)
			})
	}

	const onClickDetail = (request_code, employer_account, refference_id) => {
		const config = {
			method: "post",
			url: `${systemConfig.MasterData.getTitleUrl}searchRequestDetail`,
			headers: systemConfig.MasterData.headersList,
			data: {
				request_code: request_code,
				employer_account: employer_account,
				refference_id: refference_id,
			},
		}
		axios(config)
			.then(function (response) {
				setDataResultDetail(response.data)
				console.log(response.data)
			})
			.catch(function (error) {
				console.log(error)
			})
	}
	return (
		<>
			<div className='card shadow-lg'>
				<div className='card-header bg-teal justify-content-between'>
					<h3 className='card-title'>ค้นหารายการ</h3>
					<div className='card-tools'>
						<button type='button' className='btn btn-tool' data-card-widget='collapse'>
							<i className='fas fa-minus text-light' />
						</button>
					</div>
				</div>
				<div className='card-body' style={{ padding: "3rem 15rem 0rem 15rem" }}>
					<form className='align-items-center'>
						<div className='row col-12'>
							<div className='form-group col-3'>
								<input
									className='form-control form-control mr-2'
									type='text'
									maxLength={20}
									placeholder='เลขที่หนังสือ'
									onChange={handleInputChange("request_code")}></input>
							</div>
							<div className='form-group col-4'>
								<input
									className='form-control form-control mr-2'
									type='text'
									maxLength={20}
									placeholder='เลขทะเบียนนายจ้าง'
									onChange={handleInputChange("employer_account")}></input>
							</div>
							<div className='form-group col-4'>
								<input
									className='form-control form-control  mr-2'
									type='text'
									maxLength={20}
									placeholder='เลขที่ 13 หลัก'
									onChange={handleInputChange("refference_id")}></input>
							</div>
						</div>
						<div className='row col-12'>
							<div className='form-group col-6'>
								<input
									className='form-control form-control mr-2'
									type='text'
									maxLength={50}
									placeholder='ชื่อ-นามสกุล'
									onChange={handleInputChange("employer_name")}></input>
							</div>

							<div className='form-group col-5'>
								<select className='form-control form-control' onChange={handleInputChange("personal_type")}>
									<option value={"null"}>ประเภทบุคคล</option>
									<option value={1}>บุคคลธรรมดา</option>
									<option value={2}>นิติบุคคล</option>
								</select>
							</div>
						</div>

						<div className='row col-12'>
							<div className='form-group col-11'>
								<select className='form-control form-control' onChange={handleInputChange("department_code")}>
									<option value={"null"}>สาขา</option>
									{department.map((item) => (
										<option key={item.department_code} value={item.department_code}>
											{item.department_name}
										</option>
									))}
								</select>
							</div>
						</div>

						<div className='row col-12'>
							<div className='form-group col-11'>
								<div className='icheck-primary d-inline mr-4'>
									<input type='checkbox' id='new'  onChange={onCheckBoxChange("1")} />
									<label htmlFor='new'>รายการใหม่</label>
								</div>
								<div className='icheck-primary d-inline mr-4'>
									<input type='checkbox' id='reject'  onChange={onCheckBoxChange("5")} />
									<label htmlFor='reject'>ข้อมูลไม่สมบูรณ์</label>
								</div>
								<div className='icheck-primary d-inline mr-4'>
									<input type='checkbox' id='exported'  onChange={onCheckBoxChange("4")} />
									<label htmlFor='exported'>รอผล</label>
								</div>
								<div className='icheck-primary d-inline mr-2'>
									<input type='checkbox' id='imported'  onChange={onCheckBoxChange("2")} />
									<label htmlFor='imported'>ตรวจสอบแล้ว</label>
								</div>
							</div>
						</div>
					</form>
				</div>
				<div className='card-footer'>
					<div className='d-flex justify-content-start'>
						<button className='btn btn-primary px-4' onClick={onSubmitSearch}>
							ค้นหา
						</button>
					</div>
				</div>
			</div>
			<table className='table table-striped text-center mb-5'>
				<thead className='bg-teal'>
					<tr>
						<th scope='col'>เลขหนังสือ</th>
						<th scope='col'>วันที่หนังสือ</th>
						<th scope='col'>เลขนายจ้าง</th>
						<th scope='col'>ประเภทธุรกิจ</th>
						<th scope='col'>ชื่อ - สกุล</th>
						<th scope='col'>เลขป.ช.ช / เลขทะเบียนพาณิชย์</th>
						<th scope='col'>วันที่บันทึก</th>
						<th scope='col'>เจ้าของเรื่อง</th>
						<th scope='col'>สังกัด</th>
						<th scope='col'>ผลการตรวจสอบ</th>
					</tr>
				</thead>
				<tbody>
					{dataResult.length > 0 ? (
						dataResult.map((i) => (
							<tr key={guid()}>
								<td>{i.request_code}</td>
								<td>{i.document_set_date}</td>
								<td>{i.employer_account}</td>
								<td>{i.title_name}</td>
								<td>{i.fullname}</td>
								<td>{i.refference_id}</td>
								<td>{i.create_date}</td>
								<td>{i.create_by}</td>
								<td>{i.department_code}</td>
								<td>
									<button
										className='btn btn-teal shadow-sm'
										data-toggle='modal'
										data-target='#requestDetail'
										onClick={() => onClickDetail(i.request_code, i.employer_account, i.refference_id)}>
										<i className='fas fa-list text-cyan'></i>
									</button>
								</td>
							</tr>
						))
					) : (
						<tr>
							<td colSpan='10'>{"ไม่พบข้อมูล"}</td>
						</tr>
					)}
				</tbody>
			</table>
			<div className='modal fade' id='requestDetail' tabIndex={-1} role='dialog' aria-labelledby='historyDetailLabal' aria-hidden='true'>
				<div className='modal-dialog' role='document' style={{minWidth:'1380px'}}>
					<div className='modal-content'>
						<div className='text-secondary bg-teal modal-header h5'>ผลการตรวจสอบบัญชีเงินฝาก
						<button type="button" className="close" data-dismiss="modal" aria-label="Close">
  <span aria-hidden="true">×</span>
</button>

						</div>
						<div className='modal-body'>
							<div className='row col-12 border-bottom mt-1'>
								<div className='col-3'>
									<label>ชุดหนังสือ : </label>
									<label className="font-weight-bolder">{dataResultDetail.length > 0 ? dataResultDetail[0].request_code : ''}</label>
								</div>
								<div className='col-4'>
									<label>วันที่หนังสือ(ส่งออก) : </label>
									<label>{dataResultDetail.length > 0 ? dataResultDetail[0].document_date : ''}</label>
								</div>
							</div>
							<div className='row col-12 border-bottom mt-2'>
								<div className='col-3'>
									<label>เลขที่บัญชีนายจ้าง : </label>
									<label>{dataResultDetail.length > 0 ? dataResultDetail[0].employer_account : ''}</label>
								</div>
								<div className='col-5'>
									<label>ชื่อ : </label>
									<label>{dataResultDetail.length > 0 ? `${dataResultDetail[0].title_name}   ${dataResultDetail[0].fullname}` : ''}</label>
								</div>
								<div className='col-4'>
									<label>เลข ปชช/ เลขทะเบียนพาณิชย์ : </label>
									<label>{dataResultDetail.length > 0 ? dataResultDetail[0].refference_id : ''}</label>
								</div>
								
							</div>
							{dataResultDetail.length > 0 ?(
								<table className="table table-striped text-center mb-5 mt-5">
								<thead className='bg-teal'>
									<tr>
										<th>ชื่อธนาคาร</th>
										<th>รหัสธนาคาร</th>
										<th>รหัสสาขา</th>
										<th>ชื่อสาขา</th>
										<th>ประเภทบัญชี</th>
										<th>เลขที่บัญชี</th>
										<th>ชื่อบัญชี</th>
										
										<th>จำนวนเงินคงเหลือ</th>
										<th>วันเวลาที่ตรวจ</th>
									
										<th>หมายเหตุ</th>
									</tr>
								</thead>
								<tbody>
									{dataResultDetail.map((i)=>(

									<tr key={i.bank_code}>
										<td>{i.bank_name}</td>
										<td>{i.bank_code}</td>
										<td>{i.branch_name}</td>
										<td>{i.branch_code}</td>
										<td>{i.account_type_code}</td>
										<td>{i.account_no}</td>
										<td>{i.account_name}</td>
										
										<td>{i.balance}</td>
										<td>{i.investigate_date}</td>
										
										<td>{i.remark}</td>
									</tr>
									))}
								</tbody>
							</table>
							):''}
							
						</div>
					</div>
				</div>
			</div>
		</>
	)
}

const guid = () => {
	let s4 = () => {
		return Math.floor((1 + Math.random()) * 0x10000)
			.toString(16)
			.substring(1)
	}
	return s4() + s4() + "-" + s4() + "-" + s4() + "-" + s4() + "-" + s4() + s4() + s4()
}

const removeArr = (arr, val) => {
	for (var i = 0; i < arr.length; i++) {
		if (arr[i] === val) {
			arr.splice(i, 1)
		}
	}
	return arr
}

const filterArr = (arr, id_filter) => {
	var filtered = arr.filter(function (item) {
		return id_filter.indexOf(item.status_id) !== -1
	})
	return filtered
}
