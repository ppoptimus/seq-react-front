import { useEffect, useState } from "react"
import systemConfig from "../../config.json"
import axios from "axios"
import UserDetail from "../../UserDetail"
import Swal from "sweetalert2"
import { Modal, Button, Form } from "react-bootstrap"

export default function MasterBank() {
	const [userDetail] = useState(UserDetail)
	const [isActive, setIsActive] = useState(true)
	const [data, setData] = useState([])
	const [dataById, setDataById] = useState([])

	const [show, setShow] = useState(false)
	const handleClose = () => setShow(false)
	const handleShow = (e) => {
		if (e === "new") {
			setDataById([])
		}
		setShow(true)
	}

	useEffect(() => {
		const config = {
			method: "get",
			url: `${systemConfig.MasterData.getTitleUrl}getAllBank`,
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
	}, [data])

	const onClickEdit = (id) => {
		let newItem = data.find((x) => x.bank_id === id)
		setDataById(newItem)
		setIsActive(newItem.status)
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
			url: `${systemConfig.MasterData.getTitleUrl}editMasterBank`,
			method: "POST",
			headers: systemConfig.MasterData.headersList,
			data: {
				bank_id: dataById.bank_id,
				bank_code: dataById.bank_code,
				bank_name: dataById.bank_name,
				address: dataById.address,
				email: dataById.email,
				status: isActive,
				update_by: userDetail.username,
			},
		}

		axios.request(reqOptions)
			.then((res) => {
				console.log(res.status)
				if (res.status === 204) {
					Swal.fire({
						title: "บันทึกสำเร็จ",
						icon: "success",
						confirmButtonColor: "#119516",
						confirmButtonText: "ตกลง",
					}).then((result) => {
						if (result.isConfirmed) {
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
				<i className='fas fa-plus'></i> เพิ่มธนาคาร
			</button>
			<div className='card'>
				<div className='card-header bg-teal'>
					<h3 className='card-title'>ข้อมูลธนาคาร</h3>
				</div>
				<div className='card-body'>
					<table className='table table-striped'>
						<thead>
							<tr>
								<th>รหัส</th>
								<th>ชื่อธนาคาร</th>
								<th>ที่อยู่</th>
								<th>อีเมล</th>
								<th>แก้ไข</th>
							</tr>
						</thead>
						<tbody>
							{data
								? data.map((i) => (
										<tr key={i.bank_code}>
											<td>{i.bank_code}</td>
											<td>{i.bank_name}</td>
											<td>{i.address}</td>
											<td>{i.email}</td>
											<td>
												<button
													className='btn btn-warning shadow-sm'
													data-toggle='modal'
													data-target='#popupEdit'
													onClick={() => onClickEdit(i.bank_id)}>
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

			{/* <div
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
								แก้ไขข้อมูลธนาคาร
							</h5>
						</div>

						<form className='justify-content-center align-items-center bg-light p-4'>
							<fieldset>
								<div className='row mb-4'>
									<div className='col-2'>
										<label className='form-label'>รหัสธนาคาร</label>
										<input
											disabled
											type='text'
											className='form-control'
											value={dataById.bank_code ? dataById.bank_code : ""}
											onChange={handleChange}
										/>
									</div>
									<div className='col-4'>
										<label className='form-label'>ชื่อธนาคาร</label>
										<input
											disabled
											type='text'
											className='form-control'
											value={dataById.bank_name ? dataById.bank_name : ""}
											onChange={handleChange}
										/>
									</div>
									<div className='col-6'>
										<label className='form-label'>อีเมล</label>
										<input
											type='text'
											className='form-control'
											value={dataById.email ? dataById.email : ""}
											onChange={handleChange("email")}
										/>
									</div>
								</div>

								<div className='row mb-4'>
									<label className='form-label'>ที่อยู่</label>
									<textarea
										type='text'
										className='form-control'
										value={dataById.address ? dataById.address : ""}
										onChange={handleChange("address")}
									/>
								</div>

								<div className='custom-control custom-checkbox'>
									<input
										type='checkbox'
										className='custom-control-input'
										id='gridCheck'
										defaultChecked={isActive}
										onChange={onStatusChange}
									/>
									<label className='custom-control-label' htmlFor='gridCheck'>
										เปิด/ปิด การใช้งาน
									</label>
								</div>
							</fieldset>
						</form>
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
			</div> */}

			<Modal show={show} onHide={handleClose}>
				<div className='modal-content' style={{ width: "100vh" }}>
					<Modal.Header className='bg-teal' style={{ padding: "0.5rem" }}>
						<Modal.Title>
							<span>แก้ไขข้อมูลธนาคาร</span>
						</Modal.Title>
					</Modal.Header>
					<Modal.Body>
						<Form className='justify-content-center align-items-center bg-light p-2'>
							<Form.Group>
								<div className='row mb-4'>
									<div className='col-3'>
										<Form.Label className='form-label'>รหัสธนาคาร</Form.Label>
										<Form.Control
											
											type='text'
											className='form-control'
											value={dataById.bank_code ? dataById.bank_code : ""}
											onChange={handleChange("bank_code")}
										/>
									</div>
									<div className='col-4'>
										<Form.Label className='form-label'>ชื่อธนาคาร</Form.Label>
										<Form.Control
											
											type='text'
											className='form-control'
											value={dataById.bank_name ? dataById.bank_name : ""}
											onChange={handleChange("bank_name")}
										/>
									</div>
									<div className='col-5'>
										<Form.Label className='form-label'>อีเมล</Form.Label>
										<Form.Control
											type='text'
											className='form-control'
											value={dataById.email ? dataById.email : ""}
											onChange={handleChange("email")}
										/>
									</div>
								</div>

								<div className='row mb-4'>
									<Form.Label className='form-label'>ที่อยู่</Form.Label>
									<textarea
										type='text'
										className='form-control'
										value={dataById.address ? dataById.address : ""}
										onChange={handleChange("address")}
									/>
								</div>

								<div className='custom-control custom-checkbox'>
									<Form.Control
										type='checkbox'
										className='custom-control-input'
										id='gridCheck'
										defaultChecked={isActive}
										onChange={onStatusChange}
									/>
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
				</div>
			</Modal>
		</>
	)
}
