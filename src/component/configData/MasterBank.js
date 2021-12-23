import { useEffect, useState } from "react"
import systemConfig from "../../config.json"
import axios from "axios"
import UserDetail from "../../UserDetail"

export default function MasterBank() {
	const [userDetail] = useState(UserDetail)
	const [data, setData] = useState([])
	const [dataById, setDataById] = useState([])

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
					console.log(res.data)
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
		let newItem = data.find((x) => x.bank_id === id)
		setDataById(newItem)
	}

	const handleChange = (name) => (e) => {
		setDataById({ ...dataById, [name]: e.target.value })
	}

  const onSubmitEdit = () => {
    console.log(dataById)
  }

	return (
		<>
			<div className='card'>
				<div className='card-header bg-teal'>
					<h3 className='card-title'>ข้อมูลธนาคาร</h3>
				</div>
				<div className='card-body'>
					<table className='table'>
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

            <form className='justify-content-center align-items-center bg-light p-4'>
								<fieldset>
									
									<div className='row mb-4'>
										<div className='col-6'>
											<label className='form-label'>ชื่อ</label>
											<input type='text' className='form-control' value={(dataById.bank_code)?dataById.bank_code:''} onChange={handleChange} />
										</div>
										<div className='col-6'>
											<label className='form-label'>นามสกุล</label>
											<input type='text' className='form-control' value={(dataById.email)?dataById.email:''} onChange={handleChange("email")} />
										</div>
									</div>

									
									<div className='row mb-4'>
										<label className='form-label'>ที่อยู่</label>
										<textarea type='text' className='form-control' value={(dataById.address)?dataById.address:''} onChange={handleChange("address")} />
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
