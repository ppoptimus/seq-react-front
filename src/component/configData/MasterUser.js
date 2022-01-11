import { useEffect, useState } from "react"
import { Modal, Button, Form } from "react-bootstrap"
import axios from "axios"
import Swal from "sweetalert2"
import systemConfig from "../../config.json"
import UserDetail from "../../UserDetail"

export default function MasterUser() {
	const [userLdap, setUserLdap] = useState("")
	const [userDetail] = useState(UserDetail)
	const [isActive, setIsActive] = useState(true)
	const [data, setData] = useState([])
	const [dataById, setDataById] = useState([])
	const [userLevel, setUserLevel] = useState([])
	const [department, setDepartment] = useState([])
	const [searchInput, setSearchInput] = useState("")
	const [filteredResults, setFilteredResults] = useState([])
	const [headerText, setHeaderText] = useState("แก้ไขข้อมูลผู้ใช้งาน")

	const [show, setShow] = useState(false)
	const handleClose = () => setShow(false)
	const handleShow = (e) => {
		if (e === "new" && userLdap) {
			const config = {
				method: "post",
				url: `${systemConfig.MasterData.getTitleUrl}ldapSearch`,
				headers: systemConfig.MasterData.headersList,
				data: {
					user_name: userLdap,
					pwd: null,
				},
			}
			let isMounted = true
			axios(config)
				.then(function (res) {
					if (isMounted) {
						if(res.status == 200){
							setDataById(res.data)
						}else{
							Swal.fire({
								title: "ไม่สามารถค้นหาจาก LDAP ได้!!",
								text: res.data.description,
								icon: "warning",
								confirmButtonColor: "#da8d0c",
								confirmButtonText: "ตกลง",
							})
						}
						setDataById(res.data)
						setHeaderText("เพิ่มข้อมูลผู้ใช้งาน")
						setShow(true)
					}
				})
				.catch(function (error) {
					console.log(error)
				})
			return () => {
				console.log(dataById)
				isMounted = false
			}
		}
		setShow(true)
		getUserLevel()
		getDepartment()
	}

	useEffect(() => {
		const config = {
			method: "get",
			url: `${systemConfig.MasterData.getTitleUrl}getUser`,
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

	const onSearchInUseState = (item) => {
		let newItem = [data.filter((x) => x.username.includes(item))]
		setSearchInput(item)
		setFilteredResults(newItem[0])
	}

	const onClickEdit = (id) => {
		let newItem = data.find((x) => x.user_id === id)
		setDataById(newItem)
		setIsActive(newItem.status_id)
		setShow(true)
		getUserLevel()
		getDepartment()
	}

	const getUserLevel = () => {
		const config = {
			method: "get",
			url: `${systemConfig.MasterData.getTitleUrl}getUserLevel`,
			headers: systemConfig.MasterData.headersList,
		}

		axios(config)
			.then(function (response) {
				setUserLevel(response.data)
			})
			.catch(function (error) {
				console.log(error)
			})
	}

	const getDepartment = () => {
		const config = {
			method: "get",
			url: `${systemConfig.MasterData.getTitleUrl}getMasterDepartment`,
			headers: systemConfig.MasterData.headersList,
		}

		axios(config)
			.then(function (response) {
				setDepartment(response.data)
			})
			.catch(function (error) {
				console.log(error)
			})
	}

	const handleChange = (name) => (e) => {
		if (name === "search_ldap") {
			setUserLdap(e.target.value)
		} else {
			setDataById({ ...dataById, [name]: e.target.value })
		}
	}

	const onStatusChange = (e) => {
		setIsActive(e.target.checked ? 1 : 0)
	}

	const onSubmitEdit = () => {
		let reqOptions = {
			url: `${systemConfig.MasterData.getTitleUrl}saveMasterUser`,
			method: "POST",
			headers: systemConfig.MasterData.headersList,
			data: {
				user_name: dataById.username,
				first_name: dataById.first_name,
				last_name: dataById.last_name,
				personal_id: dataById.personal_id,
				department_code: dataById.department_code,
				userlevel_id: dataById.userlevel_id,
				status_id: isActive,
				create_by: userDetail.username,
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
			<div className='row p-2'>
				<input
					className='form-control col-3 mr-2'
					placeholder='กรอก username เพื่อค้นหาจากข้อมูลส่วนกลาง'
					onChange={handleChange("search_ldap")}></input>
				<button className='btn btn-info mr-2' onClick={(e) => handleShow("new")}>
					<i className='fas fa-plus'></i> เพิ่มผู้ใช้งาน
				</button>

			</div>
			<div className='card'>
				<div className='card-header bg-teal'>
					<h3 className='card-title'>ข้อมูลผู้ใช้งานระบบ</h3>
				</div>
				<div className='flex-column text-center mt-3'>
					<div className='inner-addon right-addon col-3 p-1'>
						<i className='fas fa-search text-secondary'></i>
						<input
							type='text'
							className='form-control'
							onChange={(e) => onSearchInUseState(e.target.value)}
						/>
					</div>
				</div>

				<hr />
				<div className='card-body pt-0'>
					<table className='table table-striped'>
						<thead>
							<tr>
								<th>ชื่อผู้ใช้</th>
								<th>ชื่อ - นามสกุล</th>
								<th>เลขบัตรประชาชน</th>
								<th>รหัสสาขา</th>
								<th>ระดับผู้ใช้</th>
								<th>สถานะ</th>
								<th>แก้ไข</th>
							</tr>
						</thead>
						<tbody>
							{data
								? searchInput.length > 0
									? filteredResults.map((i) => (
											<tr key={i.user_id}>
												<td>{i.username}</td>
												<td>{i.full_name}</td>
												<td>{i.personal_id}</td>
												<td>{i.department_code}</td>
												<td>{i.user_level_name}</td>
												<td>{i.status_name}</td>
												<td>
													<button
														className='btn btn-warning shadow-sm'
														data-toggle='modal'
														data-target='#popupEdit'
														onClick={() => onClickEdit(i.user_id)}>
														<i className='fas fa-edit'></i>
													</button>
												</td>
											</tr>
									  ))
									: data.map((i) => (
											<tr key={i.user_id}>
												<td>{i.username}</td>
												<td>{i.full_name}</td>
												<td>{i.personal_id}</td>
												<td>{i.department_code}</td>
												<td>{i.user_level_name}</td>
												<td>{i.status_name}</td>
												<td>
													<button
														className='btn btn-warning shadow-sm'
														data-toggle='modal'
														data-target='#popupEdit'
														onClick={() => onClickEdit(i.user_id)}>
														<i className='fas fa-edit'></i>
													</button>
												</td>
											</tr>
									  ))
								: "Loading..."}
						</tbody>
					</table>
				</div>
			</div>

			<Modal show={show} onHide={handleClose} size='lg' aria-labelledby='contained-modal-title-vcenter' centered>
				<Modal.Header className='bg-teal' style={{ padding: "0.5rem", borderTop: "0px" }}>
					<Modal.Title>
						<span>{headerText}</span>
					</Modal.Title>
				</Modal.Header>
				<Modal.Body>
					<Form className='justify-content-center align-items-center bg-light p-2'>
						<Form.Group>
							<div className='row mb-4'>
								<div className='form-group-lg mr-1'>
									<Form.Label className='form-label'>ชื่อผู้ใช้</Form.Label>
									<Form.Control
										type='text'
										className='form-control'
										maxLength={50}
										value={dataById.username ? dataById.username : ""}
										onChange={handleChange("username")}
									/>
								</div>

								<div className='form-group-lg mr-1'>
									<Form.Label className='form-label'>ชื่อ</Form.Label>
									<Form.Control
										type='text'
										maxLength={50}
										className='form-control'
										value={dataById.first_name ? dataById.first_name : ""}
										onChange={handleChange("first_name")}
									/>
								</div>
								<div className='form-group-lg mr-1'>
									<Form.Label className='form-label'>นามสกุล</Form.Label>
									<Form.Control
										type='text'
										maxLength={50}
										className='form-control'
										value={dataById.last_name ? dataById.last_name : ""}
										onChange={handleChange("last_name")}
									/>
								</div>
							</div>
							<div className='row mb-4'>
								<div className='form-group-lg mr-1'>
									<Form.Label className='form-label'>เลขบัตรประชาชน</Form.Label>
									<Form.Control
										type='text'
										maxLength={20}
										className='form-control'
										value={dataById.personal_id ? dataById.personal_id : ""}
										onChange={handleChange("personal_id")}
									/>
								</div>
								<div className='form-group-lg mr-1'>
									<label className='form-label'>สาขา / จังหวัด</label>
									<select className='form-control' onChange={handleChange("department_code")}>
										<option>{dataById.department_name}</option>
										{department.map((item) => (
											<option key={item.department_code} value={item.department_code}>
												{item.department_name}
											</option>
										))}
									</select>
								</div>
								<div className='form-group-lg mr-1'>
									<label className='form-label'>ระดับผู้ใช้งาน</label>
									<select className='form-control' onChange={handleChange("userlevel_id")}>
										<option>{dataById.user_level_name}</option>
										{userLevel.map((item) => (
											<option key={item.user_level_id} value={item.user_level_id}>
												{item.user_level_name}
											</option>
										))}
									</select>
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
