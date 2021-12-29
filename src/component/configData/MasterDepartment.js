import { useEffect, useState } from "react"
import systemConfig from "../../config.json"
import axios from "axios"
import UserDetail from "../../UserDetail"
import Swal from "sweetalert2"

export default function MasterDepartment() {
	const [userDetail] = useState(UserDetail)
	const [isActive, setIsActive] = useState(true)
	const [data, setData] = useState([])
	const [dataById, setDataById] = useState([])

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
							window.location.reload(false)
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
			<button className='btn btn-info mb-2'>
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
													data-toggle='modal'
													data-target='#popupEdit'
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
			<div
				className='modal fade'
				id='popupEdit'
				data-backdrop='static'
				data-keyboard='false'
				tabIndex={-1}
				aria-labelledby='popupEditLabel'
				aria-hidden='true'>
				<div className='modal-dialog' style={{ maxWidth: "650px" }}>
					<div className='modal-content'>
						<div className='modal-header'>
							<h5 className='modal-title' id='popupEditLabel'>
								แก้ไขข้อมูลสาขา
							</h5>
						</div>

						<form className='justify-content-center align-items-center bg-light p-4'>
							<fieldset>
								<div className='row mb-4'>
									<div className='col-2'>
										<label className='form-label'>รหัสสาขา</label>
										<input
											type='text'
											className='form-control'
											value={dataById.department_code ? dataById.department_code : ""}
											onChange={handleChange("department_code")}
										/>
									</div>
									<div className='col-4'>
										<label className='form-label'>ชื่อสาขา</label>
										<input
											type='text'
											className='form-control'
											value={dataById.department_name ? dataById.department_name : ""}
											onChange={handleChange("department_name")}
										/>
									</div>
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
			</div>
		</>
	)
}
