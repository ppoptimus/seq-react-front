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

	const [newRequest, setNewRequest] = useState([])

	useEffect(() => {
		getNewRequest()
	}, [])

	const getNewRequest = () => {
		let reqOptions = {
			url: `${systemConfig.MasterData.getTitleUrl}getNewRequest`,
			method: "POST",
			headers: systemConfig.MasterData.headersList,
			data: {
				department_code: userDetail.userlevel_id === "3" ? userDetail.department_code : null,
				user_name: userDetail.username,
				ip_address: "",
			},
		}

		axios
			.request(reqOptions)
			.then((res) => {
				setNewRequest(res.data)
				console.log(res.data[0])
			})
			.catch((err) => {
				console.log(err)
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
					{newRequest.map((i) => (
						<tr key={i.id}>
							<td>
								<button className='btn-sm btn-warning' data-toggle='modal' data-target='#popupEdit' onClick={() => console.log(i.id)}>
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
				<div className='modal-dialog'>
					<div className='modal-content'>
						<div className='modal-header'>
							<h5 className='modal-title' id='popupEditLabel'>
								Modal title
							</h5>
							
						</div>
						<div className='modal-body'>...</div>
						<div className='modal-footer'>
							<button type='button' className='btn btn-secondary' data-dismiss='modal'>
								Close
							</button>
							<button type='button' className='btn btn-primary'>
								Understood
							</button>
						</div>
					</div>
				</div>
			</div>
		</>
	)
}
