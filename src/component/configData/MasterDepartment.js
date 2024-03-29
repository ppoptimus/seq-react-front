import React from 'react'
import { useEffect, useState } from "react"
import systemConfig from "../../config.json"
import axios from "axios"
import UserDetail from "../../UserDetail"
import Swal from "sweetalert2"
import { Modal, Button, Form } from "react-bootstrap"

export default function MasterDepartment() {
	const [userDetail] = useState(UserDetail)
	const [isActive, setIsActive] = useState(true)
	const [data, setData] = useState([])
	const [dataById, setDataById] = useState([])

	const [show, setShow] = useState(false)
	const handleClose = () => setShow(false)
	const handleShow = (e) => {
		if(e === 'new'){
			setDataById([])
		}
		setShow(true)
	}

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
					setData(res.data)
				}
			})
			.catch(function (error) {
				console.log(error)
			})
		return () => {
			isMounted = false
		}
	}, [])

	const onClickEdit = (id) => {
		let newItem = data.find((x) => x.department_code === id)
		setDataById(newItem)
		setIsActive(newItem.status)
		console.log(newItem)
		setShow(true)
	}

	const handleChange = (name) => (e) => {
		setDataById({ ...dataById, [name]: e.target.value })
	}

	const onStatusChange = (e) => {
		setIsActive(e.target.checked ? 1 : 0)
	}

	const onSubmitEdit = () => {
		let reqOptions = {
			url: `${systemConfig.MasterData.getTitleUrl}saveMasterDepartment`,
			method: "POST",
			headers: systemConfig.MasterData.headersList,
			data: {
				department_code: dataById.department_code,
				department_name: dataById.department_name,
				status: isActive,
				update_by: userDetail.username,
			},
		}

		axios.request(reqOptions)
			.then((res) => {
				console.log(res.status)
				if (res.status === 200) {
					Swal.fire({
						title: "บันทึกสำเร็จ",
						icon: "success",
						confirmButtonColor: "#119516",
						confirmButtonText: "ตกลง",
					}).then((result) => {
						if (result.isConfirmed) {
							setData(data)
							setShow(false)
						}
					})
				}
			})
			.catch((err) => {
				console.log(err)
				Swal.fire({
					icon: "error",
					title: "ผลการบันทึก",
					text: "บันทึกไม่สำเร็จ \n" + err,
				})
			})
	}
	return (
		<>
			<button className='btn btn-info mb-2' onClick={(e) => handleShow('new')}>
				<i className='fas fa-plus'></i> เพิ่มสาขา
			</button>
			<div className='card'>
				<div className='card-header bg-teal justify-content-between'>
					<h3 className='card-title'>ข้อมูลสาขา</h3>
				</div>
				<div className='card-body'>
					<table className='table table-striped'>
						<thead>
							<tr>
								<th>รหัสสาขา</th>
								<th>ชื่อสาขา</th>
								<th>สถานะ</th>
								<th>แก้ไข</th>
							</tr>
						</thead>
						<tbody>
							{data
								? data.map((i) => (
										<tr key={i.department_code}>
											<td>{i.department_code}</td>
											<td>{i.department_name}</td>
											<td>{i.status === 1 ? "ใช้งาน" : "เลิกใช้งาน"}</td>
											<td>
												<button
													className='btn btn-warning shadow-sm'
													// data-toggle='modal'
													// data-target='#popupEdit'
													onClick={() => onClickEdit(i.department_code)}>
													<i className='fas fa-edit'></i>
												</button>
											</td>
										</tr>
								  ))
								: ""}
						</tbody>
					</table>
				</div>
			</div>

			<Modal show={show} onHide={handleClose}>
				<Modal.Header className="bg-teal" style={{padding:'0.5rem'}}>
					<Modal.Title>
						<span>แก้ไขข้อมูลสาขา</span>
					</Modal.Title>
				</Modal.Header>
				<Modal.Body>
					<Form className='justify-content-center align-items-center bg-light p-2'>
						<Form.Group>
							<div className='row mb-4'>
								<div className='col-3'>
									<Form.Label className='form-label'>รหัสสาขา</Form.Label>
									<Form.Control
										type='text'
										className='form-control'
										value={dataById.department_code ? dataById.department_code : ""}
										onChange={handleChange("department_code")}
									/>
								</div>
								<div className='col-8'>
									<Form.Label className='form-label'>ชื่อสาขา</Form.Label>
									<Form.Control
										type='text'
										className='form-control'
										value={dataById.department_name ? dataById.department_name : ""}
										onChange={handleChange("department_name")}
									/>
								</div>
							</div>

							<div className='custom-control custom-checkbox'>
								<Form.Control
									type='checkbox'
									className='custom-control-input'
									id='gridCheck'
									defaultChecked={isActive}
									onChange={onStatusChange}></Form.Control>
								<Form.Label className='custom-control-label' htmlFor='gridCheck'>
									เปิด/ปิด การใช้งาน
								</Form.Label>
							</div>
						</Form.Group>
					</Form>
				</Modal.Body>
				<Modal.Footer>
					<Button variant='secondary' onClick={handleClose}>
						ยกเลิก
					</Button>
					<Button className='btn btn-success' onClick={onSubmitEdit}>
						ยืนยัน
					</Button>
				</Modal.Footer>
			</Modal>
		</>
	)
}
